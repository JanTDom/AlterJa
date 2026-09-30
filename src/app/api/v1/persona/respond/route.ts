import { NextRequest, NextResponse } from "next/server";
import { verifyApiKeyAndScope } from "@/lib/auth/apiKeys";
import { searchLiveMemoriesHybrid, getLiveProfile } from "@/lib/supabase/db";
import { generateStructuredData, generateTextEmbedding, ModelUnavailableError, AI_MODELS } from "@/lib/ai/client";
import { PERSONA_RECONSTRUCTION_PROMPT_V1, ASSISTANT_PROMPT_V1, CRITIC_PROMPT_V1 } from "@/prompts";
import { GroundingCitation, MemoryLayer } from "@/domains/types";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const authHeader = req.headers.get("authorization");
    const { client, error, status } = await verifyApiKeyAndScope(authHeader, "reconstruction");

    if (!client) {
      return NextResponse.json({ error: error || "Brak autoryzacji" }, { status: status || 401 });
    }

    const body = await req.json();
    const { message, mode = "reconstruction", allowed_layers } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Brak wymaganego pola 'message'." },
        { status: 400 }
      );
    }

    const profile = await getLiveProfile(client.userId);

    let queryEmbedding: number[] | undefined;
    try {
      queryEmbedding = await generateTextEmbedding(message);
    } catch {
      // Ignorujemy brak wektora
    }

    const requestedLayers = Array.isArray(allowed_layers) && allowed_layers.length > 0
      ? (allowed_layers as MemoryLayer[]).filter((l) => client.allowedLayers.includes(l))
      : (client.allowedLayers as MemoryLayer[]);

    const matchedMemories = await searchLiveMemoriesHybrid({
      userId: client.userId,
      queryText: message,
      queryEmbedding,
      layers: requestedLayers,
      matchThreshold: 0.45,
      limit: 4,
    });

    const citations: GroundingCitation[] = matchedMemories.map((m) => {
      return {
        memory_id: m.id,
        title: m.title,
        layer: m.layer as MemoryLayer,
        epistemic_status: m.epistemic_status,
        source_name: m.source_title || "Źródło zweryfikowane",
        verbatim_quote: m.exact_quote || m.content.slice(0, 160),
      };
    });

    const memoryContext = matchedMemories.length > 0
      ? matchedMemories.map((m) => `[Warstwa: ${m.layer} | Tytuł: ${m.title}]\nTreść: ${m.content}`).join("\n\n")
      : "BRAK PASUJĄCYCH WSPOMNIEŃ POWYŻEJ PROGU PODOBIEŃSTWA. Jawnie stwierdź brak danych i zaproponuj pytanie uzupełniające.";

    let systemInstruction = "";
    if (mode === "reconstruction") {
      systemInstruction = `${PERSONA_RECONSTRUCTION_PROMPT_V1}\nProfil: ${profile?.display_name || "Twórca"}\n\nKONTEKST PAMIĘCI:\n${memoryContext}`;
    } else if (mode === "critic") {
      systemInstruction = `${CRITIC_PROMPT_V1}\nProfil: ${profile?.display_name || "Twórca"}\n\nKONTEKST PAMIĘCI:\n${memoryContext}`;
    } else {
      systemInstruction = `${ASSISTANT_PROMPT_V1}\nProfil: ${profile?.display_name || "Twórca"}\n\nKONTEKST PAMIĘCI:\n${memoryContext}`;
    }

    const { object } = await generateStructuredData({
      prompt: `Wiadomość wejściowa:\n"""\n${message}\n"""`,
      systemInstruction,
      schema: z.object({
        response: z.string(),
      }),
      modelName: AI_MODELS.REASONING,
    });

    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      response: object.response.trim(),
      mode,
      citations,
      latency_ms: latencyMs,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    if (err instanceof ModelUnavailableError) {
      return NextResponse.json(
        { error: err.message, code: "MODEL_UNAVAILABLE" },
        { status: 503 }
      );
    }
    const message = err instanceof Error ? err.message : "Wystąpił błąd serwera";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
