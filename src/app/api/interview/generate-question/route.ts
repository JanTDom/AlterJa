import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";
import { MemoryLayer } from "@/domains/types";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const FALLBACK_BANK: Array<{
  topic: string;
  question: string;
  context: string;
  category: MemoryLayer;
}> = [
  {
    topic: "Granice kompromisu etycznego",
    question: "W jakich sytuacjach zawodowych lub prywatnych uważasz, że kompromis jest błędem i należy pozostać nieugiętym?",
    context: "Pozwala modelowi zidentyfikować nienegocjowalne wartości bazowe.",
    category: "values",
  },
  {
    topic: "Zaufanie w relacjach",
    question: "Co decyduje o tym, że zaczynasz bezgranicznie ufać nowej osobie w zespole lub życiu prywatnym?",
    context: "Buduje warstwę kontekstu relacyjnego i kryteria selekcji partnerów.",
    category: "context",
  },
  {
    topic: "Radzenie sobie z nieodwracalną porażką",
    question: "Gdy projekt lub inicjatywa, w którą zainwestowałeś ogrom energii, kończy się fiaskiem — jaki jest Twój pierwszy wewnętrzny odruch?",
    context: "Kalibruje odporność psychiczną i styl refleksji post-mortem.",
    category: "decisions",
  },
  {
    topic: "Środowisko głębokiej pracy",
    question: "W jakich porach dnia i przy jakim poziomie ciszy Twoje myślenie osiąga najwyższą ostrość i precyzję?",
    context: "Dopasowuje rytm interakcji z modelem do Twojego naturalnego chronotypu.",
    category: "preferences",
  },
  {
    topic: "Przekazywanie wiedzy młodszym pokoleniom",
    question: "Jaką jedną zasadę lub przestrogę chciałbyś wpoić swoim następcom ponad wszystko inne?",
    context: "Zasila warstwę stylu i fundament cyfrowej spuścizny.",
    category: "style",
  },
];

export async function POST(req: NextRequest) {
  try {
    const memories = globalStore.getMemories(DEMO_USER_ID);

    // Wykrywanie najsłabiej reprezentowanej warstwy
    const layerCounts: Record<string, number> = {};
    for (const mem of memories) {
      layerCounts[mem.layer] = (layerCounts[mem.layer] || 0) + 1;
    }

    const allLayers: MemoryLayer[] = [
      "biography",
      "values",
      "preferences",
      "knowledge",
      "decisions",
      "style",
      "context",
    ];

    allLayers.sort((a, b) => (layerCounts[a] || 0) - (layerCounts[b] || 0));
    const targetLayer = allLayers[0] || "values";

    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction:
            "Jesteś wybitnym biografem i projektantem wywiadów pogłębionych. Tworzysz precyzyjne mikropytania w języku polskim, które badają tożsamość człowieka bez konfabulacji. Zero emoji. Zwracaj wyłącznie poprawny obiekt JSON.",
        });

        const prompt = `Zaprojektuj jedno mikropytanie do wywiadu biograficznego dla warstwy: "${targetLayer}".
Dotychczasowy stan pamięci obejmuje: ${memories.length} wpisów.
Odpowiedz wyłącznie w formacie JSON z polami:
{
  "topic": "Krótki temat (3-5 słów)",
  "question": "Precyzyjne, otwarte pytanie skłaniające do refleksji",
  "context": "Dlaczego to pytanie jest kluczowe dla modelu tożsamości",
  "category": "${targetLayer}"
}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return NextResponse.json({
            id: `dyn-${Date.now()}`,
            topic: parsed.topic || "Pytanie adaptacyjne",
            question: parsed.question,
            context: parsed.context || "Uzupełnienie luki w pamięci autobiograficznej.",
            category: targetLayer,
          });
        }
      } catch (err) {
        console.error("[Interview AI Generation Error]", err);
      }
    }

    // Dobór z banku pytań dopasowanego do luki
    const candidate =
      FALLBACK_BANK.find((q) => q.category === targetLayer) ||
      FALLBACK_BANK[Math.floor(Math.random() * FALLBACK_BANK.length)];

    return NextResponse.json({
      id: `dyn-${Date.now()}`,
      topic: candidate.topic,
      question: candidate.question,
      context: candidate.context,
      category: candidate.category,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Błąd serwera";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
