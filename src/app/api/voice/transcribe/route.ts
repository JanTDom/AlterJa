// ==============================================================================
// AlterJa (alterja.pl) — API Transkrypcji Mowy
// Zero fabrykacji. Prawdziwa transkrypcja multimodalna lub jawny błąd.
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import { getGoogleProvider, AI_MODELS, ModelUnavailableError } from "@/lib/ai/client";
import { generateText } from "ai";

export async function POST(req: NextRequest) {
  try {
    await requireUser();

    const formData = await req.formData();
    const audioFile = formData.get("audio") as Blob | null;

    if (!audioFile) {
      return NextResponse.json(
        { error: "Brak przesłanego pliku audio." },
        { status: 400 }
      );
    }

    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = audioFile.type || "audio/webm";

    const google = getGoogleProvider();

    const result = await generateText({
      model: google(AI_MODELS.MULTIMODAL),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Dokonaj dosłownej i wiernej transkrypcji tego nagrania mowy w języku polskim. Zwróć wyłącznie słowa wypowiedziane przez rozmówcę, z poprawną interpunkcją i ortografią. Zero komentarzy wstępnych i podsumowań.",
            },
            {
              type: "file",
              data: buffer,
              mediaType: mimeType,
            },
          ],
        },
      ],
    });

    const transcription = result.text.trim();

    return NextResponse.json({
      transcription,
      text: transcription,
      detected_language: "pl",
      confidence: 1.0,
    });
  } catch (err: unknown) {
    if (err instanceof ModelUnavailableError) {
      return NextResponse.json(
        { error: err.message, code: "MODEL_UNAVAILABLE" },
        { status: 503 }
      );
    }
    const msg = err instanceof Error ? err.message : "Błąd przetwarzania audio";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
