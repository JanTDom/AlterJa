// ==============================================================================
// AlterJa (alterja.pl) — Mostek integracyjny PostgreSQL / Supabase
// ==============================================================================

import { getSupabaseAdmin } from "./admin";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";
import {
  SourceItem,
  MemoryItem,
  MemoryEvidence,
  MemoryLayer,
  EpistemicStatus,
  ConfidenceLevel,
  DecisionCase,
  LegacyDirective,
  Conversation,
  Message,
  ConversationMode,
} from "@/domains/types";

// Bezpieczny generator UUID dla rekordów Supabase
export function ensureUuid(id?: string): string {
  if (id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return id;
  }
  return crypto.randomUUID();
}

/**
 * Zapis dokumentu źródłowego w Supabase i lokalnym magazynie
 */
export async function persistSourceItem(params: {
  userId?: string;
  title: string;
  rawContent: string;
  mimeType?: string;
  sizeBytes?: number;
  sourceAuthor?: string | null;
  isThirdParty?: boolean;
  isSyntheticAi?: boolean;
  eventTimestamp?: string | null;
}): Promise<SourceItem> {
  const userId = ensureUuid(params.userId || DEMO_USER_ID);
  const sourceId = crypto.randomUUID();
  const now = new Date().toISOString();

  const sourceItem: SourceItem = {
    id: sourceId,
    user_id: userId,
    title: params.title,
    raw_content: params.rawContent,
    mime_type: params.mimeType || "text/plain",
    size_bytes: params.sizeBytes || Buffer.byteLength(params.rawContent, "utf8"),
    source_author: params.sourceAuthor || (params.isThirdParty ? "Osoba trzecia" : "Jan Nowak"),
    is_third_party: !!params.isThirdParty,
    is_synthetic_ai: !!params.isSyntheticAi,
    event_timestamp: params.eventTimestamp || now,
    created_at: now,
  };

  // Zapis w pamięci podręcznej procesu
  globalStore.addSource(userId, {
    title: sourceItem.title,
    raw_content: sourceItem.raw_content,
    mime_type: sourceItem.mime_type,
    size_bytes: sourceItem.size_bytes,
    source_author: sourceItem.source_author,
    is_third_party: sourceItem.is_third_party,
    is_synthetic_ai: sourceItem.is_synthetic_ai,
    event_timestamp: sourceItem.event_timestamp,
  });

  // Zapis w chmurowej bazie Supabase
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { error } = await supabase.from("source_items").insert({
        id: sourceId,
        user_id: userId,
        title: sourceItem.title,
        raw_content: sourceItem.raw_content,
        mime_type: sourceItem.mime_type,
        size_bytes: sourceItem.size_bytes,
        source_author: sourceItem.source_author,
        is_third_party: sourceItem.is_third_party,
        is_synthetic_ai: sourceItem.is_synthetic_ai,
        event_timestamp: sourceItem.event_timestamp,
        created_at: now,
      });

      if (error) {
        console.warn("[Supabase] Uwaga przy zapisie source_items:", error.message);
      }
    } catch (err) {
      console.warn("[Supabase] Wyjątek podczas zapisu source_items:", err);
    }
  }

  return sourceItem;
}

/**
 * Usunięcie źródła z Supabase i lokalnego magazynu
 */
export async function deleteLiveSource(userId: string = DEMO_USER_ID, sourceId: string): Promise<boolean> {
  const safeUserId = ensureUuid(userId);
  globalStore.deleteSource(userId, sourceId);

  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase
        .from("source_items")
        .delete()
        .eq("id", sourceId)
        .eq("user_id", safeUserId);
    } catch (err) {
      console.warn("[Supabase] Błąd usuwania source_items:", err);
    }
  }

  return true;
}

/**
 * Zapis atomowego faktu wiedzy wraz z cytatem dowodowym w Supabase i lokalnym magazynie
 */
export async function persistMemoryWithEvidence(params: {
  userId?: string;
  sourceItemId?: string;
  sourceTitle?: string;
  layer: MemoryLayer;
  title: string;
  content: string;
  epistemicStatus: EpistemicStatus;
  confidence: ConfidenceLevel;
  exactQuote?: string;
  charStart?: number;
  charEnd?: number;
}): Promise<MemoryItem> {
  const userId = ensureUuid(params.userId || DEMO_USER_ID);
  const memoryId = crypto.randomUUID();
  const evidenceId = crypto.randomUUID();
  const now = new Date().toISOString();

  const evidenceRecord: MemoryEvidence | undefined = params.exactQuote
    ? {
        id: evidenceId,
        user_id: userId,
        memory_item_id: memoryId,
        source_item_id: ensureUuid(params.sourceItemId),
        source_title: params.sourceTitle || "Dokument zweryfikowany",
        exact_quote: params.exactQuote,
        char_start: params.charStart ?? null,
        char_end: params.charEnd ?? null,
        evidence_weight: 1.0,
        created_at: now,
      }
    : undefined;

  const memoryRecord: MemoryItem = {
    id: memoryId,
    user_id: userId,
    layer: params.layer,
    title: params.title,
    content: params.content,
    epistemic_status: params.epistemicStatus,
    confidence: params.confidence,
    is_superseded: false,
    evidence: evidenceRecord ? [evidenceRecord] : [],
    created_at: now,
    updated_at: now,
  };

  // Zapis do lokalnego magazynu
  globalStore.addMemory(userId, {
    layer: memoryRecord.layer,
    title: memoryRecord.title,
    content: memoryRecord.content,
    epistemic_status: memoryRecord.epistemic_status,
    confidence: memoryRecord.confidence,
    is_superseded: false,
    evidence: memoryRecord.evidence,
  });

  // Zapis do Supabase
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { error: memError } = await supabase.from("memory_items").insert({
        id: memoryId,
        user_id: userId,
        layer: memoryRecord.layer,
        title: memoryRecord.title,
        content: memoryRecord.content,
        epistemic_status: memoryRecord.epistemic_status,
        confidence: memoryRecord.confidence,
        is_superseded: false,
        created_at: now,
        updated_at: now,
      });

      if (memError) {
        console.warn("[Supabase] Błąd zapisu memory_items:", memError.message);
      } else if (evidenceRecord && params.sourceItemId) {
        const { error: eviError } = await supabase.from("memory_evidence").insert({
          id: evidenceId,
          user_id: userId,
          memory_item_id: memoryId,
          source_item_id: ensureUuid(params.sourceItemId),
          exact_quote: params.exactQuote || "",
          char_start: params.charStart ?? null,
          char_end: params.charEnd ?? null,
          evidence_weight: 1.0,
          created_at: now,
        });

        if (eviError) {
          console.warn("[Supabase] Błąd zapisu memory_evidence:", eviError.message);
        }
      }
    } catch (err) {
      console.warn("[Supabase] Wyjątek podczas zapisu memory z dowodem:", err);
    }
  }

  return memoryRecord;
}

/**
 * Usunięcie wspomnienia z Supabase i lokalnego magazynu
 */
export async function deleteLiveMemory(userId: string = DEMO_USER_ID, memoryId: string): Promise<boolean> {
  const safeUserId = ensureUuid(userId);
  globalStore.deleteMemory(userId, memoryId);

  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase
        .from("memory_items")
        .delete()
        .eq("id", memoryId)
        .eq("user_id", safeUserId);
    } catch (err) {
      console.warn("[Supabase] Błąd usuwania memory_items:", err);
    }
  }

  return true;
}

/**
 * Odczyt źródeł z bazy danych Supabase (z fallbackiem do pamięci lokalnej)
 */
export async function getLiveSources(userId: string = DEMO_USER_ID): Promise<SourceItem[]> {
  const safeUserId = ensureUuid(userId);
  const supabase = getSupabaseAdmin();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("source_items")
        .select("*")
        .eq("user_id", safeUserId)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as SourceItem[];
      }
    } catch (err) {
      console.warn("[Supabase] Błąd odczytu source_items, fallback:", err);
    }
  }

  return globalStore.getSources(userId);
}

/**
 * Odczyt wspomnień z powiązanymi dowodami z bazy Supabase
 */
export async function getLiveMemories(userId: string = DEMO_USER_ID): Promise<MemoryItem[]> {
  const safeUserId = ensureUuid(userId);
  const supabase = getSupabaseAdmin();

  if (supabase) {
    try {
      const { data: mems, error: memError } = await supabase
        .from("memory_items")
        .select("*")
        .eq("user_id", safeUserId)
        .order("created_at", { ascending: false });

      if (!memError && mems && mems.length > 0) {
        const { data: evis } = await supabase
          .from("memory_evidence")
          .select("*")
          .eq("user_id", safeUserId);

        const eviMap = new Map<string, MemoryEvidence[]>();
        if (evis) {
          for (const e of evis) {
            const list = eviMap.get(e.memory_item_id) || [];
            list.push(e as MemoryEvidence);
            eviMap.set(e.memory_item_id, list);
          }
        }

        return mems.map((m) => ({
          ...m,
          evidence: eviMap.get(m.id) || [],
        })) as MemoryItem[];
      }
    } catch (err) {
      console.warn("[Supabase] Błąd odczytu memory_items, fallback:", err);
    }
  }

  return globalStore.getMemories(userId);
}

/**
 * Zapis przypadku decyzyjnego w Supabase
 */
export async function persistDecisionCase(params: {
  userId?: string;
  situation: string;
  optionsConsidered: string[];
  chosenOption: string;
  userJustification?: string;
  decisionDate?: string;
}): Promise<DecisionCase> {
  const userId = ensureUuid(params.userId || DEMO_USER_ID);
  const decisionId = crypto.randomUUID();
  const now = new Date().toISOString();
  const dateStr = params.decisionDate || now.split("T")[0];

  const decision: DecisionCase = {
    id: decisionId,
    user_id: userId,
    situation: params.situation,
    options_considered: params.optionsConsidered,
    chosen_option: params.chosenOption,
    user_justification: params.userJustification || null,
    observed_outcome: null,
    post_hoc_reflection: null,
    decision_date: dateStr,
    created_at: now,
  };

  globalStore.addDecision(userId, {
    situation: decision.situation,
    options_considered: decision.options_considered,
    chosen_option: decision.chosen_option,
    user_justification: decision.user_justification,
    observed_outcome: null,
    post_hoc_reflection: null,
    decision_date: decision.decision_date,
  });

  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase.from("decisions").insert({
        id: decisionId,
        user_id: userId,
        situation: decision.situation,
        options_considered: decision.options_considered,
        chosen_option: decision.chosen_option,
        user_justification: decision.user_justification,
        decision_date: dateStr,
        created_at: now,
      });
    } catch (err) {
      console.warn("[Supabase] Błąd zapisu decisions:", err);
    }
  }

  return decision;
}

/**
 * Odczyt decyzji z Supabase
 */
export async function getLiveDecisions(userId: string = DEMO_USER_ID): Promise<DecisionCase[]> {
  const safeUserId = ensureUuid(userId);
  const supabase = getSupabaseAdmin();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("decisions")
        .select("*")
        .eq("user_id", safeUserId)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as DecisionCase[];
      }
    } catch (err) {
      console.warn("[Supabase] Błąd odczytu decisions:", err);
    }
  }

  return globalStore.getDecisions(userId);
}

/**
 * Zapis dyspozycji cyfrowej spuścizny
 */
export async function persistLegacyDirective(
  userId: string = DEMO_USER_ID,
  directive: Partial<LegacyDirective>
): Promise<LegacyDirective> {
  const safeUserId = ensureUuid(userId);
  const now = new Date().toISOString();

  const modeToDeathAction: Record<string, "delete_all" | "archive_only" | "reconstruction_allowed"> = {
    archive_only: "archive_only",
    interactive_memorial: "reconstruction_allowed",
    total_erasure: "delete_all",
  };

  const onDeath = directive.mode ? modeToDeathAction[directive.mode] || "delete_all" : "delete_all";
  const email = directive.trusted_contact_email || directive.primary_contact_email || null;

  globalStore.updateLegacyDirective({
    mode: directive.mode || "archive_only",
    trusted_contact_email: email || undefined,
    inactivity_period_days: directive.inactivity_period_days || 90,
    require_death_certificate: directive.require_death_certificate !== false,
    posthumous_intro_message: directive.posthumous_intro_message || "",
  });

  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase
        .from("legacy_directives")
        .upsert(
          {
            user_id: safeUserId,
            is_enabled: true,
            primary_contact_email: email,
            primary_contact_name: directive.primary_contact_name || "Zaufany kontakt",
            on_verified_death: onDeath,
            allow_simulation: onDeath === "reconstruction_allowed",
            status: directive.status || "dormant",
            updated_at: now,
          },
          { onConflict: "user_id" }
        );
    } catch (err) {
      console.warn("[Supabase] Błąd zapisu legacy_directives:", err);
    }
  }

  return globalStore.getLegacyDirective(userId);
}

/**
 * Odczyt dyspozycji cyfrowej spuścizny
 */
export async function getLiveLegacyDirective(userId: string = DEMO_USER_ID): Promise<LegacyDirective> {
  const safeUserId = ensureUuid(userId);
  const supabase = getSupabaseAdmin();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("legacy_directives")
        .select("*")
        .eq("user_id", safeUserId)
        .maybeSingle();

      if (!error && data) {
        return {
          ...data,
          mode: data.on_verified_death === "reconstruction_allowed"
            ? "interactive_memorial"
            : data.on_verified_death === "archive_only"
            ? "archive_only"
            : "total_erasure",
          trusted_contact_email: data.primary_contact_email,
        } as LegacyDirective;
      }
    } catch (err) {
      console.warn("[Supabase] Błąd odczytu legacy_directives:", err);
    }
  }

  return globalStore.getLegacyDirective(userId);
}

/**
 * Zapis wiadomości i konwersacji w Supabase
 */
export async function persistConversationMessage(params: {
  userId?: string;
  conversationId?: string;
  role: "user" | "assistant";
  content: string;
  mode?: ConversationMode;
  citations?: any[];
  uncertainty?: string;
}): Promise<Message> {
  const userId = ensureUuid(params.userId || DEMO_USER_ID);
  const conversationId = ensureUuid(params.conversationId);
  const messageId = crypto.randomUUID();
  const now = new Date().toISOString();

  // Upewnienie się, że sesja konwersacji istnieje w Supabase
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase.from("conversations").upsert(
        {
          id: conversationId,
          user_id: userId,
          title: "Sesja dialogowa AlterJa",
          mode: params.mode || "reconstruction",
          updated_at: now,
        },
        { onConflict: "id" }
      );

      await supabase.from("messages").insert({
        id: messageId,
        conversation_id: conversationId,
        user_id: userId,
        role: params.role,
        content: params.content,
        mode: params.mode || "reconstruction",
        grounding_citations: params.citations || [],
        uncertainty_level: params.uncertainty || null,
        created_at: now,
      });
    } catch (err) {
      console.warn("[Supabase] Błąd zapisu wiadomości:", err);
    }
  }

  // Zapis w pamięci lokalnej
  return globalStore.addMessage(
    conversationId,
    userId,
    params.role,
    params.content,
    {
      mode: params.mode,
      uncertainty_level: params.uncertainty as any,
    }
  );
}

/**
 * Zapis odpowiedzi wywiadu adaptacyjnego w Supabase
 */
export async function persistInterviewAnswer(params: {
  userId?: string;
  topic: string;
  questionText: string;
  answerText: string;
  category: MemoryLayer;
}): Promise<void> {
  const userId = ensureUuid(params.userId || DEMO_USER_ID);
  const sessionId = ensureUuid("00000000-0000-0000-0003-000000000001");
  const now = new Date().toISOString();

  // 1. Zapis jako wspomnienie
  await persistMemoryWithEvidence({
    userId,
    layer: params.category,
    title: `Wywiad: ${params.topic}`,
    content: params.answerText,
    epistemicStatus: "user_declaration",
    confidence: "confirmed",
  });

  // 2. Zapis w tabelach interview_sessions i interview_answers
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase.from("interview_sessions").upsert(
        {
          id: sessionId,
          user_id: userId,
          topic: "Adaptacyjny wywiad autobiograficzny",
          status: "active",
        },
        { onConflict: "id" }
      );

      await supabase.from("interview_answers").insert({
        id: crypto.randomUUID(),
        session_id: sessionId,
        user_id: userId,
        question_text: params.questionText,
        answer_text: params.answerText,
        is_skipped: false,
        created_at: now,
      });
    } catch (err) {
      console.warn("[Supabase] Błąd zapisu odpowiedzi wywiadu:", err);
    }
  }
}

/**
 * Odczyt statystyk do pulpitu głównego z Supabase
 */
export async function getLiveDashboardStats(userId: string = DEMO_USER_ID) {
  const safeUserId = ensureUuid(userId);
  const supabase = getSupabaseAdmin();

  let sourcesCount = globalStore.getSources(userId).length;
  let memoriesCount = globalStore.getMemories(userId).length;
  let decisionsCount = globalStore.getDecisions(userId).length;
  let hypothesesCount = globalStore.getHypotheses(userId).length;

  if (supabase) {
    try {
      const [srcRes, memRes, decRes, hypRes] = await Promise.all([
        supabase.from("source_items").select("*", { count: "exact", head: true }).eq("user_id", safeUserId),
        supabase.from("memory_items").select("*", { count: "exact", head: true }).eq("user_id", safeUserId),
        supabase.from("decisions").select("*", { count: "exact", head: true }).eq("user_id", safeUserId),
        supabase.from("hypotheses").select("*", { count: "exact", head: true }).eq("user_id", safeUserId),
      ]);

      if (srcRes.count !== null && srcRes.count !== undefined) sourcesCount = srcRes.count;
      if (memRes.count !== null && memRes.count !== undefined) memoriesCount = memRes.count;
      if (decRes.count !== null && decRes.count !== undefined) decisionsCount = decRes.count;
      if (hypRes.count !== null && hypRes.count !== undefined) hypothesesCount = hypRes.count;
    } catch (err) {
      console.warn("[Supabase] Błąd odczytu statystyk pulpitu:", err);
    }
  }

  return {
    sourcesCount,
    memoriesCount,
    decisionsCount,
    hypothesesCount,
    profile: globalStore.getProfile(userId),
  };
}

/**
 * Sprawdzenie stanu bazy Supabase i liczby rekordów
 */
export async function checkDatabaseHealth(): Promise<{
  connected: boolean;
  tableCount: number;
  sourcesCount: number;
  memoriesCount: number;
  url: string;
}> {
  const supabase = getSupabaseAdmin();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "Brak skonfigurowanego URL";

  if (!supabase) {
    return {
      connected: false,
      tableCount: 0,
      sourcesCount: globalStore.getSources(DEMO_USER_ID).length,
      memoriesCount: globalStore.getMemories(DEMO_USER_ID).length,
      url,
    };
  }

  try {
    const { count: srcCount, error: srcError } = await supabase
      .from("source_items")
      .select("*", { count: "exact", head: true });

    const { count: memCount, error: memError } = await supabase
      .from("memory_items")
      .select("*", { count: "exact", head: true });

    return {
      connected: !srcError && !memError,
      tableCount: 23,
      sourcesCount: srcCount ?? globalStore.getSources(DEMO_USER_ID).length,
      memoriesCount: memCount ?? globalStore.getMemories(DEMO_USER_ID).length,
      url,
    };
  } catch (err) {
    return {
      connected: false,
      tableCount: 0,
      sourcesCount: globalStore.getSources(DEMO_USER_ID).length,
      memoriesCount: globalStore.getMemories(DEMO_USER_ID).length,
      url,
    };
  }
}
