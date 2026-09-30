// ==============================================================================
// AlterJa (alterja.pl) — Bezpieczny silnik czatu AI
// Zero fabrykacji. Historia rozmowy. Egzekwowanie RLS.
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import { searchLiveMemoriesHybrid, getLiveProfile } from "@/lib/supabase/db";
import { generateTextEmbedding, streamAiDialogue, ModelUnavailableError, AI_MODELS } from "@/lib/ai/client";
import { PERSONA_RECONSTRUCTION_PROMPT_V1, ASSISTANT_PROMPT_V1, CRITIC_PROMPT_V1 } from "@/prompts";
import { createServerSideClient } from "@/lib/supabase/server";
import { GroundingCitation } from "@/domains/types";

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json();
    const { message, mode = "reconstruction", conversationId } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Wymagana jest treść wiadomości ('message')." },
        { status: 400 }
      );
    }

    const supabase = await createServerSideClient();
    const profile = await getLiveProfile(user.id);

    // 1. Obliczenie wektora embeddingu dla zapytania
    let queryEmbedding: number[] | undefined;
    try {
      queryEmbedding = await generateTextEmbedding(message);
    } catch {
      // Jeśli model embeddingu jest niedostępny, wyszukiwanie hybrydowe przełączy się na tekstowe
    }

    // 2. Wyszukanie adekwatnych wspomnień (RLS chroni dane)
    const matchedMemories = await searchLiveMemoriesHybrid({
      userId: user.id,
      queryText: message,
      queryEmbedding,
      matchThreshold: 0.45,
      limit: 5,
    });

    const citations: GroundingCitation[] = matchedMemories.map((m) => {
      return {
        memory_id: m.id,
        title: m.title,
        layer: m.layer,
        epistemic_status: m.epistemic_status,
        source_name: m.source_title || "Zweryfikowana pamięć",
        verbatim_quote: m.exact_quote || m.content.slice(0, 140),
      };
    });

    const memoryContext = matchedMemories.length > 0
      ? matchedMemories
          .map(
            (m) =>
              `[Warstwa: ${m.layer} | Tytuł: ${m.title} | Status: ${m.epistemic_status}]\nTreść: ${m.content}\nDowód: ${m.exact_quote || "Brak dosłownego cytatu"}`
          )
          .join("\n\n")
      : "BRAK PASUJĄCYCH WSPOMNIEŃ POWYŻEJ PROGU PODOBIEŃSTWA. Nie zgaduj. Poinformuj o braku danych i zaproponuj konkretne pytanie uzupełniające tę lukę.";

    // 3. Budowa promptu systemowego w zależności od trybu
    let systemInstruction = "";
    if (mode === "reconstruction") {
      systemInstruction = `${PERSONA_RECONSTRUCTION_PROMPT_V1}\nUżytkownik: ${profile?.display_name || "Właściciel profilu"}\n\nKONTEKST PAMIĘCI:\n${memoryContext}`;
    } else if (mode === "critic") {
      systemInstruction = `${CRITIC_PROMPT_V1}\nUżytkownik: ${profile?.display_name || "Użytkownik"}\n\nKONTEKST PAMIĘCI:\n${memoryContext}`;
    } else {
      systemInstruction = `${ASSISTANT_PROMPT_V1}\nUżytkownik: ${profile?.display_name || "Użytkownik"}\n\nKONTEKST PAMIĘCI:\n${memoryContext}`;
    }

    // 4. Pobranie historii wiadomości dla konwersacji (ostatnie 6 tur)
    let historyMessages: { role: "user" | "assistant"; content: string }[] = [];
    if (conversationId) {
      const { data: dbMessages } = await supabase
        .from("messages")
        .select("role, content")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: false })
        .limit(6);

      if (dbMessages && dbMessages.length > 0) {
        historyMessages = (dbMessages.reverse() as { role: "user" | "assistant"; content: string }[]).filter(
          (m) => m.role === "user" || m.role === "assistant"
        );
      }
    }

    // 5. Inicjalizacja strumienia AI SDK
    const dialogueMessages = [
      ...historyMessages.map((h) => ({
        role: h.role,
        content: h.content,
      })),
      {
        role: "user" as const,
        content: message,
      },
    ];

    const stream = streamAiDialogue({
      systemInstruction,
      messages: dialogueMessages,
      temperature: mode === "reconstruction" ? 0.2 : 0.4,
      modelName: mode === "reconstruction" ? AI_MODELS.REASONING : AI_MODELS.FAST,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        let fullReplyText = "";

        try {
          for await (const chunk of stream.textStream) {
            fullReplyText += chunk;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ chunk })}\n\n`)
            );
          }

          const uncertainty = matchedMemories.length === 0 ? "high" : "low";

          // Zapis do tabeli wiadomości
          if (conversationId) {
            await supabase.from("messages").insert([
              {
                conversation_id: conversationId,
                user_id: user.id,
                role: "user",
                content: message,
                mode,
              },
              {
                conversation_id: conversationId,
                user_id: user.id,
                role: "assistant",
                content: fullReplyText,
                mode,
                grounding_citations: citations,
                uncertainty_level: uncertainty,
              },
            ]);
          }

          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                done: true,
                citations,
                uncertainty,
              })}\n\n`
            )
          );
          controller.close();
        } catch (streamError) {
          const errMessage = streamError instanceof Error ? streamError.message : "Błąd strumieniowania modelu AI";
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: errMessage })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (err: unknown) {
    if (err instanceof ModelUnavailableError) {
      return NextResponse.json(
        { error: err.message, code: "MODEL_UNAVAILABLE" },
        { status: 503 }
      );
    }
    const message = err instanceof Error ? err.message : "Wewnętrzny błąd serwera";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
