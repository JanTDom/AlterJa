import { NextRequest, NextResponse } from "next/server";
import { verifyApiKeyAndScope } from "@/lib/auth/apiKeys";
import { getLiveProfile, getLiveMemories } from "@/lib/supabase/db";
import { generateStructuredData, ModelUnavailableError, AI_MODELS } from "@/lib/ai/client";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const { client, error, status } = await verifyApiKeyAndScope(authHeader, "style_only");

    if (!client) {
      return NextResponse.json({ error: error || "Brak autoryzacji" }, { status: status || 401 });
    }

    const body = await req.json();
    const { draft_text, instruction } = body;

    if (!draft_text || typeof draft_text !== "string") {
      return NextResponse.json(
        { error: "Brak wymaganego pola 'draft_text'." },
        { status: 400 }
      );
    }

    const profile = await getLiveProfile(client.userId);
    const styleMemories = await getLiveMemories(client.userId, "style");

    const systemPrompt = `Jesteś silnikiem transformacji stylu platformy AlterJa dla użytkownika: ${profile?.display_name || "Twórca"}.
Zadanie: Przekształć surowy szkic tekstu zgodnie z ustalonym stylem tożsamości.
Zasady stylu z pamięci:
${styleMemories.map((m) => `- ${m.title}: ${m.content}`).join("\n") || "Zwięzły, konkretny, oparty na faktach i powściągliwości."}
Język: polski, zero dekoracyjnych emoji, sentence casing w nagłówkach.`;

    const userPrompt = `Szkic tekstu do transformacji:
"${draft_text}"
${instruction ? `Dodatkowa wytyczna: ${instruction}` : ""}`;

    const { object } = await generateStructuredData({
      prompt: userPrompt,
      systemInstruction: systemPrompt,
      schema: z.object({
        transformed_text: z.string(),
        applied_rules: z.array(z.string()),
      }),
      modelName: AI_MODELS.REASONING,
    });

    return NextResponse.json({
      transformed_text: object.transformed_text,
      applied_rules: object.applied_rules,
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
