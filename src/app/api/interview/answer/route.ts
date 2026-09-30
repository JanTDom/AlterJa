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

    // 2. Kognitywna synteza reguły działania i sposobu myślenia
    let cognitiveRule = "";
    try {
      const { generateText } = await import("ai");
      const { getGoogleProvider, AI_MODELS } = await import("@/lib/ai/client");
      const google = getGoogleProvider();
      const insightRes = await generateText({
        model: google(AI_MODELS.FAST),
        system:
          "Jesteś analitykiem kognitywnym systemu AlterJa. Na podstawie pytania i odpowiedzi użytkownika wyekstrahuj w 1 zwięzłym zdaniu jego nienaruszalną regułę decyzyjną, system wartości lub wzorzec reakcji. Pisz w 3. osobie (np. »W sytuacjach presji czasu wybiera rzetelność ponad pośpiech...«). Zero emoji, precyzyjny język polski.",
        prompt: `Zagadnienie: ${topic}\nPytanie wywiadu: „${questionText}”\nOdpowiedź użytkownika: „${answerText}”`,
      });
      cognitiveRule = insightRes.text.trim();
    } catch {
      // Jeśli model AI jest niedostępny, kontynuujemy bez syntezy
    }

    const memoryContent = cognitiveRule
      ? `Zasada myślenia i działania: ${cognitiveRule}\n\nKontekst pytania: „${questionText}”\nDosłowna wypowiedź: „${answerText}”`
      : `Pytanie wywiadu: „${questionText}”\nOdpowiedź użytkownika: ${answerText}`;

    // 3. Wektoryzacja i zapis w pamięci autobiograficznej
    let embedding: number[] | undefined;
    try {
      embedding = await generateTextEmbedding(`${topic}: ${cognitiveRule || questionText}\n${answerText}`);
    } catch {
      // Jeśli model embeddingu nie odpowiada, zapisujemy bez wektora
    }

    const memory = await persistMemoryItem({
      userId: user.id,
      layer: category as MemoryLayer,
      title: topic,
      content: memoryContent,
      epistemicStatus: "user_declaration",
      confidence: "confirmed",
      embedding,
    });

    return NextResponse.json({
      success: true,
      message: "Odpowiedź została przeanalizowana i utrwalona w bazie wiedzy jako deklaracja użytkownika.",
      cognitiveRule: cognitiveRule || null,
      memoryId: memory.id,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Wewnętrzny błąd zapisu";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
