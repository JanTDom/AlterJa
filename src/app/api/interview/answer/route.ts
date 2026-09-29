// ==============================================================================
// AlterJa (alterja.pl) — API Odpowiedzi Wywiadu Adaptacyjnego
// API: POST /api/interview/answer
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { persistInterviewAnswer } from "@/lib/supabase/db";
import { DEMO_USER_ID } from "@/lib/db/store";
import { MemoryLayer } from "@/domains/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, questionText, answerText, category = "values", userId = DEMO_USER_ID } = body;

    if (!topic || !questionText || !answerText) {
      return NextResponse.json(
        { error: "Pola 'topic', 'questionText' i 'answerText' są wymagane." },
        { status: 400 }
      );
    }

    await persistInterviewAnswer({
      userId,
      topic,
      questionText,
      answerText,
      category: category as MemoryLayer,
    });

    return NextResponse.json({
      success: true,
      message: "Odpowiedź została utrwalona w bazie wiedzy.",
    });
  } catch (error) {
    console.error("[Interview Answer POST Error]:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas zapisywania odpowiedzi wywiadu." },
      { status: 500 }
    );
  }
}
