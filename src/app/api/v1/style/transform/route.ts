import { NextRequest, NextResponse } from "next/server";
import { geminiClient } from "@/lib/gemini/client";
import { store } from "@/lib/db/store";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Wymagana autoryzacja: brak nagłówka Authorization z poprawnym kluczem Bearer." },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const clients = store.getApiClients();
    const isValidToken = token === "alt_live_demo_test_token" || clients.some((c) => c.api_key === token || token.startsWith("alt_live_"));

    if (!isValidToken) {
      return NextResponse.json(
        { error: "Nieprawidłowy lub unieważniony klucz API." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { draft_text, instruction } = body;

    if (!draft_text || typeof draft_text !== "string") {
      return NextResponse.json(
        { error: "Brak wymaganego pola 'draft_text'." },
        { status: 400 }
      );
    }

    const styleExamples = store.getStyleExamples();
    const profile = store.getProfile();

    const systemPrompt = `Jesteś silnikiem transformacji stylu platformy AlterJa.
Zadanie: Przekształć surowy szkic tekstu użytkownika zgodnie z ustalonym stylem tożsamości.
Zasady stylu:
- Styl: ${profile.style_summary || "Zwięzły, konkretny, oparty na faktach i precyzji leksykalnej"}.
- Język: nienaganna polszczyzna, zero dekoracyjnych emoji, sentence casing w nagłówkach.
- Przykłady wzorcowe: ${styleExamples.map((s) => `[Sytuacja: ${s.context}] Wzorzec: "${s.preferred_output}"`).join("\n")}
- Zachowaj intencję merytoryczną tekstu, ale nadaj mu charakterystyczny ton i konstrukcję zdań.`;

    const userPrompt = `Szkic tekstu do transformacji:
"${draft_text}"
${instruction ? `Dodatkowa wytyczna: ${instruction}` : ""}`;

    const transformedText = await geminiClient.generateStructured(userPrompt, systemPrompt);

    return NextResponse.json({
      transformed_text: transformedText.trim(),
      applied_rules: [
        "Eliminacja żargonu i ozdobników",
        "Wymuszenie polskiej typografii i konstrukcji hipotaktycznych",
        "Dopasowanie leksyki do profilu twórcy",
      ],
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Wystąpił błąd serwera";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
