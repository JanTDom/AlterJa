// ==============================================================================
// AlterJa (alterja.pl) — Mostek integracyjny PostgreSQL / Supabase
// ==============================================================================

import { getSupabaseAdmin } from "./admin";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";
import { SourceItem, MemoryItem, MemoryEvidence, MemoryLayer, EpistemicStatus, ConfidenceLevel } from "@/domains/types";

// Bezpieczny generator UUID dla rekordów Supabase
function ensureUuid(id?: string): string {
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
 * Zapis atomowego faktu wiedzy wraz z cytatem dowodowym w Supabase i lokalnym magazynie
 */
export async function persistMemoryWithEvidence(params: {
  userId?: string;
  sourceItemId: string;
  sourceTitle: string;
  layer: MemoryLayer;
  title: string;
  content: string;
  epistemicStatus: EpistemicStatus;
  confidence: ConfidenceLevel;
  exactQuote: string;
  charStart?: number;
  charEnd?: number;
}): Promise<MemoryItem> {
  const userId = ensureUuid(params.userId || DEMO_USER_ID);
  const memoryId = crypto.randomUUID();
  const evidenceId = crypto.randomUUID();
  const now = new Date().toISOString();

  const evidenceRecord: MemoryEvidence = {
    id: evidenceId,
    user_id: userId,
    memory_item_id: memoryId,
    source_item_id: params.sourceItemId,
    source_title: params.sourceTitle,
    exact_quote: params.exactQuote,
    char_start: params.charStart ?? null,
    char_end: params.charEnd ?? null,
    evidence_weight: 1.0,
    created_at: now,
  };

  const memoryRecord: MemoryItem = {
    id: memoryId,
    user_id: userId,
    layer: params.layer,
    title: params.title,
    content: params.content,
    epistemic_status: params.epistemicStatus,
    confidence: params.confidence,
    is_superseded: false,
    evidence: [evidenceRecord],
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
      } else {
        const { error: eviError } = await supabase.from("memory_evidence").insert({
          id: evidenceId,
          user_id: userId,
          memory_item_id: memoryId,
          source_item_id: params.sourceItemId,
          exact_quote: params.exactQuote,
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
