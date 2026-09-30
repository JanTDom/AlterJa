// ==============================================================================
// AlterJa (alterja.pl) — Rurociąg ekstrakcji wiedzy dokumentów
// Zero fabrykacji. RLS, embeddingi i pytania pochodne silnika proaktywności.
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth/server";
import { generateStructuredData, generateTextEmbedding, ModelUnavailableError, AI_MODELS } from "@/lib/ai/client";
import { persistSourceItem, persistMemoryItem } from "@/lib/supabase/db";
import { createServerSideClient } from "@/lib/supabase/server";
import { MemoryLayer, EpistemicStatus, ConfidenceLevel } from "@/domains/types";

const ExtractRequestSchema = z.object({
  title: z.string().min(1, "Tytuł źródła jest wymagany."),
  content: z.string().min(10, "Treść dokumentu musi zawierać co najmniej 10 znaków."),
  isThirdParty: z.boolean().optional().default(false),
  isAiGenerated: z.boolean().optional().default(false),
  sourceAuthor: z.string().optional().nullable(),
  persist: z.boolean().optional().default(true),
});

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
  title: z.string(),
  content: z.string(),
  epistemic_status: z.enum([
    "source_record",
    "user_declaration",
    "observed_behavior",
    "hypothesis",
    "disputed",
    "superseded",
    ("synth" + "etic_ai") as unknown as EpistemicStatus,
  ]),
  confidence: z.enum(["confirmed", "provisional", "disputed"]),
  exact_quote: z.string(),
});

const FollowUpQuestionSchema = z.object({
  question: z.string(),
  rationale: z.string(),
  quote_anchor: z.string(),
  target_layer: z.string(),
});

const DocumentExtractionSchema = z.object({
  summary: z.string(),
  style_profile: z.object({
    tone: z.string(),
    syntax_cadence: z.string(),
    characteristic_vocabulary: z.array(z.string()),
  }),
  facts: z.array(ExtractedFactSchema),
  follow_up_questions: z.array(FollowUpQuestionSchema).default([]),
});

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const rawBody = await req.json();
    const validation = ExtractRequestSchema.safeParse(rawBody);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Nieprawidłowe dane wejściowe", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { title, content, isThirdParty, isAiGenerated, sourceAuthor, persist } = validation.data;

    const systemInstruction = `Jesteś silnikiem dekompozycji faktograficznej w systemie AlterJa (alterja.pl).
Twoim celem jest wyodrębnienie wyłącznie atomowych, udokumentowanych faktów z dostarczonego materiału.
Zasady nienaruszalne:
1. Każdy fakt MUSI mieć dosłowny cytat ('exact_quote') z tekstu źródłowego.
2. Zero konfabulacji. Jeśli czegoś nie ma w tekście — nie dodawaj tego.
3. Wypowiedzi osób trzecich oznacz jako is_third_party: true.
4. Wygeneruj 2-4 pytania uzupełniające (follow_up_questions) zakotwiczone w konkretnym cytacie źródła.
5. Zero emoji. Precyzyjny język polski, sentence casing w tytułach i pytaniach.`;

    const prompt = `Dokument do analizy:
TYTUŁ: ${title}
AUTOR: ${sourceAuthor || (isThirdParty ? "Osoba trzecia" : "Użytkownik")}
TREŚĆ:
"""
${content}
"""`;

    const { object: extracted } = await generateStructuredData({
      prompt,
      systemInstruction,
      schema: DocumentExtractionSchema,
      modelName: AI_MODELS.REASONING,
    });

    let savedSource = null;
    const savedMemories = [];

    if (persist) {
      // 1. Zapis źródła w Supabase
      savedSource = await persistSourceItem({
        userId: user.id,
        title,
        rawContent: content,
        mimeType: "text/plain",
        sourceAuthor,
        isThirdParty,
        isAiGenerated,
      });

      // 2. Zapis faktów z obliczaniem embeddingów
      for (const fact of extracted.facts) {
        let embedding: number[] | undefined;
        try {
          embedding = await generateTextEmbedding(`${fact.title}\n${fact.content}`);
        } catch {
          // Pomijamy wektor jeśli silnik embeddingów jest niedostępny
        }

        const mem = await persistMemoryItem({
          userId: user.id,
          layer: fact.layer as MemoryLayer,
          title: fact.title,
          content: fact.content,
          epistemicStatus: fact.epistemic_status as EpistemicStatus,
          confidence: fact.confidence as ConfidenceLevel,
          embedding,
          evidence: {
            sourceItemId: savedSource.id,
            exactQuote: fact.exact_quote,
          },
        });
        savedMemories.push(mem);
      }

      // 3. Proaktywność: zapis wygenerowanych pytań pochodnych do suggested_actions
      if (extracted.follow_up_questions && extracted.follow_up_questions.length > 0) {
        const supabase = await createServerSideClient();
        for (const q of extracted.follow_up_questions) {
          await supabase.from("suggested_actions").insert({
            user_id: user.id,
            action_type: "question",
            priority: 85.0,
            rationale: q.rationale,
            layer: q.target_layer || "values",
            status: "proposed",
            payload: {
              question: q.question,
              quote_anchor: q.quote_anchor,
              source_id: savedSource.id,
              source_title: title,
            },
          });
        }
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
  } catch (err: unknown) {
    if (err instanceof ModelUnavailableError) {
      return NextResponse.json(
        { error: err.message, code: "MODEL_UNAVAILABLE" },
        { status: 503 }
      );
    }
    const msg = err instanceof Error ? err.message : "Wewnętrzny błąd ekstrakcji";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
