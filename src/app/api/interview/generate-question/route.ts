// ==============================================================================
// AlterJa (alterja.pl) — API Generowania Pytań Wywiadu
// Zero atrap i zero zmyślonych pytań z predefiniowanych banków.
// ==============================================================================

import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import { getLiveMemories } from "@/lib/supabase/db";
import { generateStructuredData, ModelUnavailableError, AI_MODELS } from "@/lib/ai/client";
import { MemoryLayer } from "@/domains/types";
import { z } from "zod";

export const dynamic = "force-dynamic";

const questionSchema = z.object({
  topic: z.string().min(1),
  question: z.string().min(1),
  context: z.string().min(1),
});

export async function POST() {
  try {
    const user = await requireUser();
    const memories = await getLiveMemories(user.id);

    // 1. Analiza brakujących warstw w pamięci użytkownika
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

    // 2. Generowanie dedykowanego pytania przez model AI
    const systemInstruction = `Jesteś badaczem autobiograficznym AlterJa.
Tworzysz precyzyjne mikropytania w języku polskim, które badają tożsamość i zasady człowieka.
Zero dekoracyjnych emoji. Prawidłowa polszczyzna, sentence casing w pytaniu i temacie.`;

    const prompt = `Zaprojektuj jedno precyzyjne mikropytanie do wywiadu biograficznego dla warstwy: "${targetLayer}".
Dotychczasowy stan pamięci tego użytkownika obejmuje ${memories.length} wpisów (w tym ${layerCounts[targetLayer] || 0} w warstwie "${targetLayer}").
Pytanie musi odnosić się do konkretnych sytuacji decyzyjnych lub wartości życiowych.`;

    const { object } = await generateStructuredData({
      prompt,
      systemInstruction,
      schema: questionSchema,
      modelName: AI_MODELS.FAST,
    });

    return NextResponse.json({
      id: `q-${Date.now()}`,
      topic: object.topic,
      question: object.question,
      context: object.context,
      category: targetLayer,
    });
  } catch (err: unknown) {
    if (err instanceof ModelUnavailableError) {
      return NextResponse.json(
        { error: err.message, code: "MODEL_UNAVAILABLE" },
        { status: 503 }
      );
    }
    const msg = err instanceof Error ? err.message : "Błąd serwera";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
