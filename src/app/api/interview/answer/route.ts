// ==============================================================================
// AlterJa (alterja.pl) — API Odpowiedzi Wywiadu Adaptacyjnego
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import { persistMemoryItem } from "@/lib/supabase/db";
import { createServerSideClient } from "@/lib/supabase/server";
import { generateTextEmbedding } from "@/lib/ai/client";
import { MemoryLayer } from "@/domains/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json();
    const { topic, questionText, answerText, category = "values", sessionId } = body;

    if (!topic || !questionText || !answerText) {
      return NextResponse.json(
        { error: "Pola 'topic', 'questionText' i 'answerText' są wymagane." },
        { status: 400 }
      );
    }

    const supabase = await createServerSideClient();

    // 1. Zapis do tabeli interview_answers (jeśli istnieje aktywna sesja lub tworzymy wpis)
    let currentSessionId = sessionId;
    if (!currentSessionId) {
      const { data: session } = await supabase
        .from("interview_sessions")
        .insert({
          user_id: user.id,
          topic,
          status: "active",
        })
        .select()
        .single();

      if (session) {
        currentSessionId = session.id;
      }
    }

    if (currentSessionId) {
      await supabase.from("interview_answers").insert({
        session_id: currentSessionId,
        user_id: user.id,
        question_text: questionText,
        answer_text: answerText,
      });
    }

    // 2. Automatyczny awans odpowiedzi do pamięci autobiograficznej
    let embedding: number[] | undefined;
    try {
      embedding = await generateTextEmbedding(`${topic}: ${questionText}\nOdpowiedź: ${answerText}`);
    } catch {
      // Jeśli model embeddingu nie odpowiada, zapisujemy bez wektora
    }

    const memory = await persistMemoryItem({
      userId: user.id,
      layer: category as MemoryLayer,
      title: topic,
      content: `Pytanie wywiadu: „${questionText}”\nOdpowiedź użytkownika: ${answerText}`,
      epistemicStatus: "user_declaration",
      confidence: "confirmed",
      embedding,
    });

    return NextResponse.json({
      success: true,
      message: "Odpowiedź została utrwalona w bazie wiedzy jako deklaracja użytkownika.",
      memoryId: memory.id,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Wewnętrzny błąd zapisu";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
