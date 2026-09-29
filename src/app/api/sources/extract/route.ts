// ==============================================================================
// AlterJa (alterja.pl) — Rurociąg ekstrakcji wiedzy dokumentów przez Gemini AI
// API: POST /api/sources/extract
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateStructured } from "@/lib/gemini/client";
import { persistSourceItem, persistMemoryWithEvidence } from "@/lib/supabase/db";
import { MemoryLayer, EpistemicStatus, ConfidenceLevel } from "@/domains/types";

// Schemat walidacji zapytania
const ExtractRequestSchema = z.object({
  title: z.string().min(1, "Tytuł źródła jest wymagany."),
  content: z.string().min(10, "Treść dokumentu musi zawierać co najmniej 10 znaków."),
  isThirdParty: z.boolean().optional().default(false),
  isSyntheticAi: z.boolean().optional().default(false),
  sourceAuthor: z.string().optional().nullable(),
  persist: z.boolean().optional().default(true),
});

// Zdefiniowany schemat ekstrakcji wiedzy przez LLM
const ExtractedFactSchema = z.object({
  layer: z.enum([
    "biography",
    "knowledge",
    "style",
    "preferences",
    "values",
    "decisions",
    "context",
  ]),
  title: z.string().describe("Zwięzły tytuł faktu w języku polskim"),
  content: z.string().describe("Precyzyjne, atomowe sformułowanie faktu o osobie"),
  epistemic_status: z.enum([
    "source_record",
    "user_declaration",
    "observed_behavior",
    "hypothesis",
    "disputed",
    "superseded",
    "synthetic_ai",
  ]),
  confidence: z.enum(["confirmed", "provisional", "disputed"]),
  exact_quote: z.string().describe("Dosłowny, nienaruszony cytat z dokumentu źródłowego stanowiący dowód"),
});

const DocumentExtractionSchema = z.object({
  summary: z.string().describe("Merytoryczne dwuzdaniowe podsumowanie dokumentu"),
  style_profile: z.object({
    tone: z.string().describe("Dominujący ton wypowiedzi (np. analityczny, powściągliwy)"),
    syntax_cadence: z.string().describe("Rytm i konstrukcja składniowa"),
    characteristic_vocabulary: z.array(z.string()).describe("Wyróżniające się pojęcia lub frazy"),
  }),
  facts: z.array(ExtractedFactSchema).describe("Lista atomowych faktów przyporządkowanych do 7 warstw modelu"),
});

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const validation = ExtractRequestSchema.safeParse(rawBody);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Nieprawidłowe dane wejściowe", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { title, content, isThirdParty, isSyntheticAi, sourceAuthor, persist } = validation.data;

    // Prompt analityczny dla modelu Gemini
    const systemInstruction = `Jesteś rygorystycznym silnikiem analizy biograficznej i modelowania osoby w AlterJa (alterja.pl).
Twoim celem jest dekonstrukcja dostarczonego tekstu źródłowego na atomowe, niezależne fakty wiedzy.
Każdy fakt MUSI:
1. Należeć do jednej z 7 warstw: biography, knowledge, style, preferences, values, decisions, context.
2. Posiadać dosłowny cytat ('exact_quote') wycięty z tekstu źródłowego, będący dowodem na ten fakt.
3. Mieć właściwy status epistemiczny:
   - 'user_declaration' gdy autor pisze o sobie wprost,
   - 'observed_behavior' gdy tekst opisuje działania lub reakcje,
   - 'source_record' dla obiektywnych dat, faktów urzędowych czy publikacji,
   - 'hypothesis' jeśli wniosek wymaga potwierdzenia.
4. Język polski, precyzyjny, sentence casing w tytułach, zero emoji, zero konfabulacji. Jeśli w tekście czegoś nie ma — nie dopowiadaj.`;

    const prompt = `Przeanalizuj poniższy dokument źródłowy:
TYTUŁ: ${title}
AUTOR: ${sourceAuthor || (isThirdParty ? "Osoba trzecia" : "Autor profilu")}
TREŚĆ:
${content}

Wyodrębnij od 3 do 8 najważniejszych faktów atomowych z cytatami oraz określ profil stylu.`;

    const extracted = await generateStructured({
      prompt,
      systemInstruction,
      schema: DocumentExtractionSchema,
      temperature: 0.15,
    });

    let savedSource = null;
    const savedMemories = [];

    if (persist) {
      // 1. Zapis źródła w bazie
      savedSource = await persistSourceItem({
        title,
        rawContent: content,
        mimeType: "text/plain",
        sourceAuthor,
        isThirdParty,
        isSyntheticAi,
      });

      // 2. Zapis każdego wyodrębnionego faktu z cytatem
      for (const fact of extracted.facts) {
        const mem = await persistMemoryWithEvidence({
          sourceItemId: savedSource.id,
          sourceTitle: title,
          layer: fact.layer as MemoryLayer,
          title: fact.title,
          content: fact.content,
          epistemicStatus: fact.epistemic_status as EpistemicStatus,
          confidence: fact.confidence as ConfidenceLevel,
          exactQuote: fact.exact_quote,
        });
        savedMemories.push(mem);
      }
    }

    return NextResponse.json({
      success: true,
      persisted: persist,
      source: savedSource,
      summary: extracted.summary,
      style_profile: extracted.style_profile,
      facts_count: extracted.facts.length,
      facts: extracted.facts,
      memories: savedMemories,
    });
  } catch (error) {
    console.error("[Sources Extract API Error]:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas analizy dokumentu przez model AI." },
      { status: 500 }
    );
  }
}
