// ==============================================================================
// AlterJa (alterja.pl) — API Delegata Wykonawczego („Odpisz za mnie”)
// Zero atrap i zero zmyślonych odpowiedzi.
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import { getLiveMemories, getLiveProfile } from "@/lib/supabase/db";
import { generateStructuredData, ModelUnavailableError, AI_MODELS } from "@/lib/ai/client";
import { createServerSideClient } from "@/lib/supabase/server";
import { GroundingCitation } from "@/domains/types";
import { z } from "zod";

export const dynamic = "force-dynamic";

const delegateReplySchema = z.object({
  replyText: z.string().min(1),
  ruleApplied: z.string(),
  rationale: z.string(),
  alternativeTones: z.object({
    sharper: z.string(),
    softer: z.string(),
  }),
});

const delegateAuditSchema = z.object({
  verdict: z.enum(["ODRZUĆ", "POSTAW TWARDE WARUNKI", "ZAAKCEPTUJ"]),
  matchScore: z.number().min(0).max(100),
  summary: z.string(),
  redFlags: z.array(z.string()),
  counterProposal: z.string(),
  rationale: z.string(),
});

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const user = await requireUser();
    const body = await req.json();
    const {
      taskType = "reply", // "reply" | "audit"
      incomingText,
      intent = "protect_rates",
      channel = "email",
      tone = "assertive",
      senderInfo,
    } = body;

    if (!incomingText || typeof incomingText !== "string" || incomingText.trim().length === 0) {
      return NextResponse.json(
        { error: "Pole 'incomingText' z treścią przychodzącej wiadomości jest wymagane." },
        { status: 400 }
      );
    }

    const supabase = await createServerSideClient();
    const profile = await getLiveProfile(user.id);
    const memories = await getLiveMemories(user.id);

    // 1. Sprawdzenie deterministycznych reguł użytkownika z delegate_rules
    const { data: dbRules } = await supabase
      .from("delegate_rules")
      .select("*")
      .eq("user_id", user.id);

    let matchedDbRule = null;
    if (dbRules && dbRules.length > 0) {
      matchedDbRule = dbRules.find(
        (r) =>
          incomingText.toLowerCase().includes(r.condition_pattern.toLowerCase()) ||
          r.intent === intent
      );
    }

    // 2. Dobór kontekstu pamięci
    const relevantMemories = memories.filter(
      (m) => m.layer === "decisions" || m.layer === "values" || m.layer === "style"
    ).slice(0, 4);

    const citations: GroundingCitation[] = relevantMemories.map((m) => {
      const firstEvidence = m.evidence?.[0];
      return {
        memory_id: m.id,
        title: m.title,
        layer: m.layer,
        epistemic_status: m.epistemic_status,
        source_name: "Zasada autobiograficzna",
        verbatim_quote: firstEvidence?.exact_quote || m.content.slice(0, 160),
      };
    });

    const memoryContext = relevantMemories.length > 0
      ? relevantMemories.map((m) => `[Warstwa: ${m.layer} | Tytuł: ${m.title}]\nTreść: ${m.content}`).join("\n\n")
      : "Zasady domyślne: szacunek dla własnego czasu, ochrona stawek, kulturalna asertywność, zero pracy za półdarmo.";

    let resultData: unknown;

    if (taskType === "audit") {
      const systemInstruction = `Jesteś doradcą decyzyjnym AlterJa dla użytkownika: ${profile?.display_name || "Właściciel"}.
Twoim zadaniem jest rzetelne prześwietlenie propozycji pod kątem zasad, stawek i higieny czasu.
Zasady użytkownika:
${memoryContext}
${matchedDbRule ? `Twarda reguła systemu: ${matchedDbRule.allowed_action} dla warunku: ${matchedDbRule.condition_pattern}` : ""}
Zero emoji. Język polski, sentence casing.`;

      const prompt = `Przeanalizuj poniższą propozycję:\n"""\n${incomingText}\n"""\nNadawca: ${senderInfo || "Nieokreślony"}`;

      const { object } = await generateStructuredData({
        prompt,
        systemInstruction,
        schema: delegateAuditSchema,
        modelName: AI_MODELS.REASONING,
      });

      resultData = object;
    } else {
      const systemInstruction = `Jesteś AlterJa (alterja.pl) — cyfrowym delegatem użytkownika: ${profile?.display_name || "Użytkownik"}.
Odpisujesz w pierwszej osobie liczby pojedynczej w jego imieniu.
Kanał: ${channel}.
Ton: ${tone}.
Intencja: ${intent}.
${matchedDbRule ? `Obowiązująca twarda reguła użytkownika: ${matchedDbRule.allowed_action}` : ""}

Zasady:
1. Odpowiadaj zwięźle, kulturalnie i asertywnie.
2. Jeśli ktoś zbija cenę, żąda darmowych poprawek lub marudzi o rabat — odrzuć to bez tłumaczenia się.
3. Zero dekoracyjnych emoji. Prawidłowa polszczyzna (sentence casing, cudzysłowy „”).

Pamięć i zasady:
${memoryContext}`;

      const prompt = `Treść wiadomości, na którą przygotowujesz szkic odpowiedzi:\n"""\n${incomingText}\n"""\nNadawca: ${senderInfo || "Nieokreślony"}`;

      const { object } = await generateStructuredData({
        prompt,
        systemInstruction,
        schema: delegateReplySchema,
        modelName: AI_MODELS.REASONING,
      });

      resultData = object;
    }

    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      data: resultData,
      citations,
      latencyMs,
      ruleApplied: matchedDbRule?.allowed_action || "Domyślna ochrona interesów",
      requiresApproval: matchedDbRule ? !matchedDbRule.auto_send : true,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    if (err instanceof ModelUnavailableError) {
      return NextResponse.json(
        { error: err.message, code: "MODEL_UNAVAILABLE" },
        { status: 503 }
      );
    }
    const msg = err instanceof Error ? err.message : "Błąd przetwarzania zlecenia delegata";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
