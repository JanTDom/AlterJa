import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";
import { GroundingCitation } from "@/domains/types";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, mode = "reconstruction", conversationId } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Wymagana jest treść wiadomości ('message')." },
        { status: 400 }
      );
    }

    const profile = globalStore.getProfile(DEMO_USER_ID);
    const memories = globalStore.getMemories(DEMO_USER_ID);

    // Wyszukanie najbardziej powiązanych wspomnień
    const queryLower = message.toLowerCase();
    const matchedMemories = memories.filter(
      (m) =>
        m.title.toLowerCase().includes(queryLower) ||
        m.content.toLowerCase().includes(queryLower)
    );
    const activeMemories = matchedMemories.length > 0 ? matchedMemories.slice(0, 3) : memories.slice(0, 3);

    const citations: GroundingCitation[] = activeMemories.map((m) => {
      const evidence = globalStore.getEvidenceForMemory(m.id);
      return {
        memory_id: m.id,
        title: m.title,
        layer: m.layer,
        epistemic_status: m.epistemic_status,
        source_name: evidence[0]?.source_title || "Pamięć zweryfikowana",
        verbatim_quote: evidence[0]?.exact_quote || m.content.slice(0, 140),
      };
    });

    const memoryContext = activeMemories
      .map(
        (m) =>
          `[Warstwa: ${m.layer} | Status: ${m.epistemic_status} | Pewność: ${m.confidence}]\n${m.title}: ${m.content}`
      )
      .join("\n\n");

    let roleInstruction = "";
    if (mode === "reconstruction") {
      roleInstruction = `TRYB REKONSTRUKCJI:
Odpowiadasz ściśle tak, jak zareagowałby ${profile?.display_name || "właściciel profilu"}.
- Odtwarzaj jego perspektywę, zasady, preferencje i styl logicznego wywodu.
- Jeśli czegoś nie wiesz z pamięci lub nie ma na to dowodu, napisz wprost: "Na podstawie dotychczasowych zapisków w pamięci nie mam wyrobionego zdania w tej sprawie" — NIGDY NIE KONFABULUJ.
- Zero dekoracyjnych emoji. Pisz staranną, precyzyjną polszczyzną.`;
    } else if (mode === "critic") {
      roleInstruction = `TRYB KRYTYCZNEGO PARTNERA:
Konfrontujesz tezy rozmówcy przez pryzmat standardów i wartości ${profile?.display_name || "użytkownika"}.
- Wskazuj luki logiczne, niespójności z zasadami i ukryte ryzyka.
- Bądź merytoryczny i rygorystyczny.`;
    } else {
      roleInstruction = `TRYB ASYSTENTA:
Jesteś obiektywnym asystentem AlterJa. Pomagasz rozwiązać zagadnienie merytorycznie, korzystając z kontekstu wiedzy użytkownika.`;
    }

    const systemPrompt = `Jesteś AlterJa (alterja.pl) — cyfrowym modelem człowieka.
Profil: ${profile?.display_name || "Użytkownik"}

${roleInstruction}

Baza pamięci autobiograficznej (jedyne źródło prawdy o osobie):
${memoryContext}`;

    // Uruchomienie strumienia odpowiedzi SSE
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        if (genAI) {
          try {
            const model = genAI.getGenerativeModel({
              model: "gemini-1.5-flash",
              systemInstruction: systemPrompt,
              generationConfig: {
                temperature: mode === "reconstruction" ? 0.3 : 0.5,
              },
            });

            const resultStream = await model.generateContentStream(message);

            for await (const chunk of resultStream.stream) {
              const text = chunk.text();
              if (text) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ chunk: text })}\n\n`)
                );
              }
            }

            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  done: true,
                  citations,
                  uncertainty: citations.length === 0 ? "high" : "low",
                })}\n\n`
              )
            );
            controller.close();
            return;
          } catch (geminiError) {
            console.error("[Gemini Stream Error]", geminiError);
            // Przejście do awaryjnego, deterministycznego strumieniowania syntetycznego
          }
        }

        // Awaryjne deterministyczne strumieniowanie, gdy brak klucza lub limit Gemini
        let syntheticText = "";
        if (mode === "reconstruction") {
          syntheticText = `Na podstawie zapisów w pamięci autobiograficznej: w odniesieniu do zagadnienia „${message.slice(0, 50)}...” zazwyczaj kieruję się zasadą spokojnej weryfikacji faktów, transparentności intencji i poszanowania zobowiązań. Jeśli nie ma w bibliotece szczegółowego zapisu dotyczącego tej kwestii, otwarcie to zaznaczam bez próby zgadywania.`;
        } else if (mode === "critic") {
          syntheticText = `Analizując Twoje pytanie z perspektywy krytycznej: czy w rozumowaniu dotyczącym „${message.slice(0, 50)}...” nie przyjmujesz zbyt optymistycznych założeń co do terminów lub zasobów? Warto zestawić tę tezę z alternatywnymi scenariuszami.`;
        } else {
          syntheticText = `Jako asystent AlterJa proponuję następujące uporządkowanie: możemy zweryfikować to zagadnienie w bibliotece pamięci lub sformułować mikropytanie do wywiadu, aby precyzyjnie ustalić Twoje preferencje.`;
        }

        for (let i = 0; i < syntheticText.length; i += 6) {
          const slice = syntheticText.slice(i, i + 6);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ chunk: slice })}\n\n`));
          await new Promise((resolve) => setTimeout(resolve, 18));
        }

        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              done: true,
              citations,
              uncertainty: "moderate",
            })}\n\n`
          )
        );
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Błąd serwera";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
