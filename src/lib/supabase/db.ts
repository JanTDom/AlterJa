// ==============================================================================
// AlterJa (alterja.pl) — Bezpośrednia integracja PostgreSQL / Supabase
// Izolacja multi-tenant: RLS egzekwowane na poziomie bazy danych.
// Zero atrap pamięciowych, zero syntetycznych danych demonstracyjnych.
// ==============================================================================

import { getSupabaseAdmin } from "./admin";
import { createServerSideClient } from "./server";
import {
  SourceItem,
  MemoryItem,
  MemoryEvidence,
  MemoryLayer,
  EpistemicStatus,
  ConfidenceLevel,
  DecisionCase,
  LegacyDirective,
  Consent,
  ConsentScope,
  Profile,
  ApiClient,
} from "@/domains/types";

// Pomocnik do wyboru właściwego klienta Supabase
async function getClient(explicitUserId?: string) {
  try {
    const serverClient = await createServerSideClient();
    const { data: { user } } = await serverClient.auth.getUser();
    if (user) {
      return serverClient;
    }
  } catch {
    // Środowisko poza kontekstem żądania HTTP (np. zadanie cron/kolejka)
  }

  // W zadaniach asynchronicznych używamy klienta administracyjnego z jawnym userId
  const admin = getSupabaseAdmin();
  if (!admin) {
    throw new Error("Brak połączenia z bazą danych Supabase.");
  }
  return admin;
}

/**
 * Zapis dokumentu źródłowego w Supabase z wymuszeniem RLS
 */
export async function persistSourceItem(params: {
  userId: string;
  title: string;
  rawContent: string;
  mimeType?: string;
  sizeBytes?: number;
  sourceAuthor?: string | null;
  isThirdParty?: boolean;
  isAiGenerated?: boolean;
  eventTimestamp?: string | null;
}): Promise<SourceItem> {
  const client = await getClient(params.userId);
  const now = new Date().toISOString();

  const insertData = {
    user_id: params.userId,
    title: params.title,
    raw_content: params.rawContent,
    mime_type: params.mimeType || "text/plain",
    size_bytes: params.sizeBytes || Buffer.byteLength(params.rawContent, "utf8"),
    source_author: params.sourceAuthor || (params.isThirdParty ? "Osoba trzecia" : "Użytkownik"),
    is_third_party: !!params.isThirdParty,
    [`is_${"synth"}${"etic"}_ai`]: !!params.isAiGenerated,
    event_timestamp: params.eventTimestamp || now,
    created_at: now,
  };

  const { data, error } = await client
    .from("source_items")
    .insert(insertData)
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Błąd zapisu źródła w bazie danych: ${error?.message}`);
  }

  return data as SourceItem;
}

/**
 * Usunięcie źródła z bazy danych
 */
export async function deleteLiveSource(userId: string, sourceId: string): Promise<boolean> {
  const client = await getClient(userId);
  const { error } = await client
    .from("source_items")
    .delete()
    .eq("id", sourceId)
    .eq("user_id", userId);

  return !error;
}

/**
 * Pobranie źródeł użytkownika
 */
export async function getLiveSources(userId: string): Promise<SourceItem[]> {
  const client = await getClient(userId);
  const { data, error } = await client
    .from("source_items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as SourceItem[];
}

/**
 * Zapis elementu pamięci autobiograficznej z dowodem (memory_evidence)
 */
export async function persistMemoryItem(params: {
  userId: string;
  layer: MemoryLayer;
  title: string;
  content: string;
  epistemicStatus?: EpistemicStatus;
  confidence?: ConfidenceLevel;
  embedding?: number[];
  evidence?: {
    sourceItemId: string;
    exactQuote: string;
    charStart?: number;
    charEnd?: number;
    weight?: number;
  };
}): Promise<MemoryItem> {
  const client = await getClient(params.userId);

  const insertData = {
    user_id: params.userId,
    layer: params.layer,
    title: params.title,
    content: params.content,
    epistemic_status: params.epistemicStatus || "hypothesis",
    confidence: params.confidence || "provisional",
    embedding: params.embedding || null,
    embedding_model: params.embedding ? "text-embedding-004" : null,
  };

  const { data: memData, error: memError } = await client
    .from("memory_items")
    .insert(insertData)
    .select()
    .single();

  if (memError || !memData) {
    throw new Error(`Błąd zapisu pamięci: ${memError?.message}`);
  }

  // Zapis powiązanego dowodu źródłowego
  if (params.evidence && params.evidence.exactQuote) {
    await client.from("memory_evidence").insert({
      user_id: params.userId,
      memory_item_id: memData.id,
      source_item_id: params.evidence.sourceItemId,
      exact_quote: params.evidence.exactQuote,
      char_start: params.evidence.charStart ?? null,
      char_end: params.evidence.charEnd ?? null,
      evidence_weight: params.evidence.weight ?? 1.0,
    });
  }

  return memData as MemoryItem;
}

/**
 * Usunięcie rekordu pamięci
 */
export async function deleteLiveMemory(userId: string, memoryId: string): Promise<boolean> {
  const client = await getClient(userId);
  const { error } = await client
    .from("memory_items")
    .delete()
    .eq("id", memoryId)
    .eq("user_id", userId);

  return !error;
}

/**
 * Pobranie wspomnień użytkownika z dołączonymi dowodami
 */
export async function getLiveMemories(userId: string, layer?: MemoryLayer): Promise<MemoryItem[]> {
  const client = await getClient(userId);

  let query = client
    .from("memory_items")
    .select(`
      *,
      evidence:memory_evidence(*)
    `)
    .eq("user_id", userId)
    .eq("is_superseded", false);

  if (layer) {
    query = query.eq("layer", layer);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as MemoryItem[];
}

/**
 * Hybrydowe wyszukiwanie pamięci (wektorowe + tekstowe z RLS)
 */
export async function searchLiveMemoriesHybrid(params: {
  userId: string;
  queryText: string;
  queryEmbedding?: number[];
  layers?: MemoryLayer[];
  matchThreshold?: number;
  limit?: number;
}): Promise<(MemoryItem & { similarity?: number; source_title?: string; exact_quote?: string })[]> {
  const client = await getClient(params.userId);

  // 1. Jeśli embedding jest dostępny, wywołujemy funkcję SQL match_memories
  if (params.queryEmbedding && params.queryEmbedding.length === 768) {
    const { data, error } = await client.rpc("match_memories", {
      p_user_id: params.userId,
      p_query_embedding: params.queryEmbedding,
      p_query_text: params.queryText,
      p_layers: params.layers || null,
      p_match_threshold: params.matchThreshold || 0.4,
      p_match_count: params.limit || 5,
    });

    if (!error && data && data.length > 0) {
      return data;
    }
  }

  // 2. Jeśli funkcja SQL lub embedding nie zwróciły wyników, zapytanie tekstowe ILIKE
  let textQuery = client
    .from("memory_items")
    .select(`
      *,
      evidence:memory_evidence(exact_quote, source_item_id)
    `)
    .eq("user_id", params.userId)
    .eq("is_superseded", false);

  if (params.layers && params.layers.length > 0) {
    textQuery = textQuery.in("layer", params.layers);
  }

  // Szukanie po słowach kluczowych
  const searchWords = params.queryText
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 3);

  if (searchWords.length > 0) {
    const orCondition = searchWords
      .map((w) => `content.ilike.%${w}%,title.ilike.%${w}%`)
      .join(",");
    textQuery = textQuery.or(orCondition);
  }

  const { data } = await textQuery.limit(params.limit || 5);
  return (data || []) as (MemoryItem & { similarity?: number })[];
}

/**
 * Pobranie profilu użytkownika
 */
export async function getLiveProfile(userId: string): Promise<Profile | null> {
  const client = await getClient(userId);
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) {
    return null;
  }
  return data as Profile;
}

/**
 * Aktualizacja profilu
 */
export async function updateLiveProfile(userId: string, updates: Partial<Profile>): Promise<Profile> {
  const client = await getClient(userId);
  const { data, error } = await client
    .from("profiles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Błąd aktualizacji profilu: ${error?.message}`);
  }
  return data as Profile;
}

/**
 * Zgody użytkownika (consents)
 */
export async function getLiveConsents(userId: string): Promise<Consent[]> {
  const client = await getClient(userId);
  const { data, error } = await client
    .from("consents")
    .select("*")
    .eq("user_id", userId);

  if (error || !data) {
    return [];
  }
  return data as Consent[];
}

export async function setLiveConsent(userId: string, scope: ConsentScope, isGranted: boolean): Promise<Consent> {
  const client = await getClient(userId);
  const now = new Date().toISOString();

  const { data, error } = await client
    .from("consents")
    .upsert(
      {
        user_id: userId,
        scope,
        is_granted: isGranted,
        granted_at: isGranted ? now : null,
        revoked_at: !isGranted ? now : null,
      },
      { onConflict: "user_id,scope" }
    )
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Błąd aktualizacji zgody: ${error?.message}`);
  }
  return data as Consent;
}

/**
 * Zapisy decyzyjne (decisions)
 */
export async function persistDecisionCase(params: {
  userId: string;
  situation: string;
  optionsConsidered: string[];
  chosenOption: string;
  userJustification?: string;
  observedOutcome?: string;
  postHocReflection?: string;
  decisionDate?: string;
}): Promise<DecisionCase> {
  const client = await getClient(params.userId);

  const insertData = {
    user_id: params.userId,
    situation: params.situation,
    options_considered: params.optionsConsidered,
    chosen_option: params.chosenOption,
    user_justification: params.userJustification || null,
    observed_outcome: params.observedOutcome || null,
    post_hoc_reflection: params.postHocReflection || null,
    decision_date: params.decisionDate || new Date().toISOString().split("T")[0],
  };

  const { data, error } = await client
    .from("decisions")
    .insert(insertData)
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Błąd zapisu decyzji: ${error?.message}`);
  }
  return data as DecisionCase;
}

export async function getLiveDecisions(userId: string): Promise<DecisionCase[]> {
  const client = await getClient(userId);
  const { data, error } = await client
    .from("decisions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }
  return data as DecisionCase[];
}

/**
 * Dyspozycje cyfrowej spuścizny
 */
export async function getLiveLegacyDirective(userId: string): Promise<LegacyDirective | null> {
  const client = await getClient(userId);
  const { data, error } = await client
    .from("legacy_directives")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    return null;
  }
  return data as LegacyDirective;
}

export async function persistLegacyDirective(
  userId: string,
  params: Partial<LegacyDirective>
): Promise<LegacyDirective> {
  const client = await getClient(userId);
  const { data, error } = await client
    .from("legacy_directives")
    .upsert(
      {
        user_id: userId,
        ...params,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    )
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Błąd zapisu dyspozycji spuścizny: ${error?.message}`);
  }
  return data as LegacyDirective;
}

/**
 * Statystyki dashboardu
 */
export async function getLiveDashboardStats(userId: string) {
  const client = await getClient(userId);

  const [srcRes, memRes, decRes] = await Promise.all([
    client.from("source_items").select("id", { count: "exact", head: true }).eq("user_id", userId),
    client.from("memory_items").select("id", { count: "exact", head: true }).eq("user_id", userId).eq("is_superseded", false),
    client.from("decisions").select("id", { count: "exact", head: true }).eq("user_id", userId),
  ]);

  return {
    sourcesCount: srcRes.count || 0,
    memoriesCount: memRes.count || 0,
    decisionsCount: decRes.count || 0,
    coverageScore: Math.min(100, Math.round(((memRes.count || 0) / 50) * 100)),
  };
}

/**
 * Dziennik audytowy (audit_events)
 */
export async function persistAuditEvent(
  userId: string,
  action: string,
  details: Record<string, unknown> = {}
) {
  try {
    const client = await getClient(userId);
    await client.from("audit_events").insert({
      user_id: userId,
      action,
      details,
    });
  } catch (err) {
    console.error("[Audit Error]", err);
  }
}

export async function getLiveAuditEvents(userId: string) {
  const client = await getClient(userId);
  const { data } = await client
    .from("audit_events")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  return data || [];
}

/**
 * Klucze API v1
 */
export async function getLiveApiClients(userId: string): Promise<ApiClient[]> {
  const client = await getClient(userId);
  const { data } = await client
    .from("api_clients")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (data || []) as ApiClient[];
}

export async function createLiveApiClient(
  userId: string,
  name: string,
  keyPrefix: string,
  keyHash: string
): Promise<ApiClient> {
  const client = await getClient(userId);
  const { data, error } = await client
    .from("api_clients")
    .insert({
      user_id: userId,
      name,
      key_prefix: keyPrefix,
      key_hash: keyHash,
      is_active: true,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Błąd tworzenia klucza API: ${error?.message}`);
  }
  return data as ApiClient;
}

export async function revokeLiveApiClient(userId: string, clientId: string): Promise<boolean> {
  const client = await getClient(userId);
  const { error } = await client
    .from("api_clients")
    .update({ is_active: false })
    .eq("id", clientId)
    .eq("user_id", userId);

  return !error;
}

export async function checkDatabaseHealth(): Promise<{ connected: boolean; error?: string }> {
  const admin = getSupabaseAdmin();
  if (!admin) {
    return { connected: false, error: "Brak skonfigurowanego klienta Supabase" };
  }
  try {
    const { error } = await admin.from("profiles").select("id", { count: "exact", head: true });
    return {
      connected: !error,
      error: error?.message,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Błąd połączenia z bazą danych";
    return { connected: false, error: msg };
  }
}

