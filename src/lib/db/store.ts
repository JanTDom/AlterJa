// ==============================================================================
// AlterJa (alterja.pl) — Główny magazyn danych i silnik domenowy
// ==============================================================================

import {
  Profile,
  Consent,
  SourceItem,
  MemoryItem,
  MemoryEvidence,
  Hypothesis,
  DecisionCase,
  Conversation,
  Message,
  LegacyDirective,
  ApiClient,
  AccessGrant,
  ConsentScope,
  MemoryLayer,
} from "@/domains/types";

// Fikcyjne dane inicjalizacyjne dla demonstracji i testów (jawnie oznaczone)
export const DEMO_USER_ID = "00000000-0000-0000-0000-000000000001";
export const DEMO_USER_EMAIL = "jan.nowak@fikcyjny-przyklad.pl";

class MemoryDataStore {
  private profiles: Map<string, Profile> = new Map();
  private consents: Map<string, Consent[]> = new Map();
  private sources: Map<string, SourceItem[]> = new Map();
  private memories: Map<string, MemoryItem[]> = new Map();
  private hypotheses: Map<string, Hypothesis[]> = new Map();
  private decisions: Map<string, DecisionCase[]> = new Map();
  private conversations: Map<string, Conversation[]> = new Map();
  private messages: Map<string, Message[]> = new Map();
  private legacyDirectives: Map<string, LegacyDirective> = new Map();
  private apiClients: Map<string, ApiClient[]> = new Map();

  constructor() {
    this.seedDemoData();
  }

  private seedDemoData() {
    // 1. Profil fikcyjny do demonstracji produktu
    const demoProfile: Profile = {
      id: DEMO_USER_ID,
      display_name: "Jan Nowak (Profil demonstracyjny)",
      email: DEMO_USER_EMAIL,
      avatar_url: "/alterja-icon.png",
      learning_paused: false,
      quiet_hours_enabled: true,
      quiet_hours_start: "22:00",
      quiet_hours_end: "07:00",
      created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.profiles.set(DEMO_USER_ID, demoProfile);

    // 2. Granularne zgody
    const demoConsents: Consent[] = [
      {
        id: "c-1",
        user_id: DEMO_USER_ID,
        scope: "analysis",
        is_granted: true,
        granted_at: new Date(Date.now() - 30 * 86400000).toISOString(),
        revoked_at: null,
        version: "1.0",
        created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      },
      {
        id: "c-2",
        user_id: DEMO_USER_ID,
        scope: "style_modeling",
        is_granted: true,
        granted_at: new Date(Date.now() - 30 * 86400000).toISOString(),
        revoked_at: null,
        version: "1.0",
        created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      },
      {
        id: "c-3",
        user_id: DEMO_USER_ID,
        scope: "voice_synthesis",
        is_granted: false,
        granted_at: null,
        revoked_at: null,
        version: "1.0",
        created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      },
      {
        id: "c-4",
        user_id: DEMO_USER_ID,
        scope: "api_sharing",
        is_granted: true,
        granted_at: new Date(Date.now() - 10 * 86400000).toISOString(),
        revoked_at: null,
        version: "1.0",
        created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
      },
      {
        id: "c-5",
        user_id: DEMO_USER_ID,
        scope: "postmortem",
        is_granted: false,
        granted_at: null,
        revoked_at: null,
        version: "1.0",
        created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      },
    ];
    this.consents.set(DEMO_USER_ID, demoConsents);

    // 3. Źródła autoryzowane
    const demoSources: SourceItem[] = [
      {
        id: "src-1",
        user_id: DEMO_USER_ID,
        title: "Dziennik zawodowy 2024 — Fragment o zasadach pracy",
        raw_content:
          "W projektach inżynierskich zawsze cenię precyzję i powściągliwość. Wolę poświęcić dodatkowe dwa dni na weryfikację faktów w źródłach pierwotnych, niż wdrożyć niesprawdzone założenie pod presją czasu.",
        mime_type: "text/plain",
        size_bytes: 215,
        source_author: "Jan Nowak",
        is_third_party: false,
        is_synthetic_ai: false,
        event_timestamp: "2024-05-12T10:00:00Z",
        created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
      },
      {
        id: "src-2",
        user_id: DEMO_USER_ID,
        title: "Notatka osobista — Wybór kawy i poranny rytuał",
        raw_content:
          "Przeszedłem definitywnie na czarną kawę bez cukru, najlepiej jasno paloną z Etiopii. Żadnego mleka roślinnego.",
        mime_type: "text/plain",
        size_bytes: 110,
        source_author: "Jan Nowak",
        is_third_party: false,
        is_synthetic_ai: false,
        event_timestamp: "2025-01-10T08:30:00Z",
        created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
      },
    ];
    this.sources.set(DEMO_USER_ID, demoSources);

    // 4. Wspomnienia z dowodami w 7 warstwach
    const demoMemories: MemoryItem[] = [
      {
        id: "mem-1",
        user_id: DEMO_USER_ID,
        layer: "values",
        title: "Prymat rzetelności nad pośpiechem",
        content:
          "Właściciel preferuje dokładną weryfikację w źródłach pierwotnych i odrzuca podejmowanie decyzji pod presją czasu bez solidnych dowodów.",
        epistemic_status: "user_declaration",
        confidence: "confirmed",
        is_superseded: false,
        created_at: new Date(Date.now() - 24 * 86400000).toISOString(),
        updated_at: new Date(Date.now() - 24 * 86400000).toISOString(),
        evidence: [
          {
            id: "ev-1",
            user_id: DEMO_USER_ID,
            memory_item_id: "mem-1",
            source_item_id: "src-1",
            exact_quote:
              "Wolę poświęcić dodatkowe dwa dni na weryfikację faktów w źródłach pierwotnych, niż wdrożyć niesprawdzone założenie pod presją czasu.",
            source_title: "Dziennik zawodowy 2024",
            created_at: new Date(Date.now() - 24 * 86400000).toISOString(),
          },
        ],
      },
      {
        id: "mem-2",
        user_id: DEMO_USER_ID,
        layer: "preferences",
        title: "Preferencja napojowa: czarna kawa",
        content: "Pije wyłącznie czarną kawę bez dodatków (jasny profil palenia, Etiopia).",
        epistemic_status: "user_declaration",
        confidence: "confirmed",
        is_superseded: false,
        created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
        updated_at: new Date(Date.now() - 14 * 86400000).toISOString(),
        evidence: [
          {
            id: "ev-2",
            user_id: DEMO_USER_ID,
            memory_item_id: "mem-2",
            source_item_id: "src-2",
            exact_quote:
              "Przeszedłem definitywnie na czarną kawę bez cukru, najlepiej jasno paloną z Etiopii.",
            source_title: "Notatka osobista",
            created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
          },
        ],
      },
      {
        id: "mem-3",
        user_id: DEMO_USER_ID,
        layer: "style",
        title: "Styl wypowiedzi: zwięzłość i sentence casing",
        content:
          "Formułuje myśli konkretnie, unika ozdobników i korporacyjnego żargonu, ceni poprawną polską interpunkcję i sentence casing w nagłówkach.",
        epistemic_status: "observed_behavior",
        confidence: "confirmed",
        is_superseded: false,
        created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
        updated_at: new Date(Date.now() - 20 * 86400000).toISOString(),
        evidence: [
          {
            id: "ev-3",
            user_id: DEMO_USER_ID,
            memory_item_id: "mem-3",
            source_item_id: "src-1",
            exact_quote: "zawsze cenię precyzję i powściągliwość",
            source_title: "Dziennik zawodowy 2024",
            created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
          },
        ],
      },
    ];
    this.memories.set(DEMO_USER_ID, demoMemories);

    // 5. Hipotezy do przeglądu
    const demoHypotheses: Hypothesis[] = [
      {
        id: "hyp-1",
        user_id: DEMO_USER_ID,
        hypothesis_text:
          "Użytkownik wykazuje wysoką ostrożność w delegowaniu decyzji technologicznych o charakterze nieodwracalnym.",
        alternative_explanation:
          "Może to być reakcja na wcześniejsze błędy podwykonawców w poprzednich projektach, a nie trwała nieufność.",
        supporting_evidence_count: 2,
        status: "pending",
        created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      },
    ];
    this.hypotheses.set(DEMO_USER_ID, demoHypotheses);

    // 6. Przypadki decyzyjne
    const demoDecisions: DecisionCase[] = [
      {
        id: "dec-1",
        user_id: DEMO_USER_ID,
        situation: "Wybór między szybkim wdrożeniem z długiem technologicznym a opóźnieniem premiery o tydzień.",
        options_considered: [
          "Wdrożenie na czas z ułomną bazą danych",
          "Opóźnienie o 7 dni i pełne przetestowanie RLS",
        ],
        chosen_option: "Opóźnienie o 7 dni i pełne przetestowanie RLS",
        user_justification:
          "Bezpieczeństwo danych użytkowników jest nienegocjowalne; wyciek zniweczyłby zaufanie do marki.",
        observed_outcome: "Wdrożenie odbyło się bez żadnego incydentu bezpieczeństwa.",
        post_hoc_reflection: "Kluczowa decyzja, która uratowała reputację produktu.",
        decision_date: "2024-06-15",
        created_at: new Date(Date.now() - 22 * 86400000).toISOString(),
      },
    ];
    this.decisions.set(DEMO_USER_ID, demoDecisions);

    // 7. Moduł cyfrowej spuścizny
    const demoLegacy: LegacyDirective = {
      id: "leg-1",
      user_id: DEMO_USER_ID,
      is_enabled: false,
      primary_contact_name: "Anna Nowak",
      primary_contact_email: "anna.nowak@przyklad.pl",
      on_verified_death: "archive_only",
      allow_simulation: false,
      status: "dormant",
      created_at: new Date(Date.now() - 28 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.legacyDirectives.set(DEMO_USER_ID, demoLegacy);

    // 8. Klient API
    const demoApiClient: ApiClient = {
      id: "api-1",
      user_id: DEMO_USER_ID,
      name: "Edytor Esejów (Aplikacja demonstracyjna)",
      key_prefix: "alt_live_7x9a",
      is_active: true,
      rate_limit_per_minute: 60,
      created_at: new Date(Date.now() - 8 * 86400000).toISOString(),
      last_used_at: new Date(Date.now() - 3600000).toISOString(),
      grants: [
        {
          id: "gr-1",
          client_id: "api-1",
          user_id: DEMO_USER_ID,
          grant_type: "style_only",
          allowed_layers: ["style"],
          prohibited_topics: ["finanse", "zdrowie", "relacje_rodzinne"],
          is_revoked: false,
          expires_at: null,
          created_at: new Date(Date.now() - 8 * 86400000).toISOString(),
        },
      ],
    };
    this.apiClients.set(DEMO_USER_ID, [demoApiClient]);
  }

  // --- Operacje na profilach ---
  public getProfile(userId: string = DEMO_USER_ID): Profile {
    const prof = this.profiles.get(userId);
    if (prof) return prof;
    const defaultProf: Profile = {
      id: userId,
      display_name: "Jan Nowak (Profil demonstracyjny)",
      email: DEMO_USER_EMAIL,
      avatar_url: "/alterja-icon.png",
      learning_paused: false,
      quiet_hours_enabled: true,
      quiet_hours_start: "22:00",
      quiet_hours_end: "07:00",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.profiles.set(userId, defaultProf);
    return defaultProf;
  }

  public updateProfile(userId: string = DEMO_USER_ID, updates: Partial<Profile>): Profile {
    const existing = this.profiles.get(userId) || {
      id: userId,
      display_name: null,
      email: null,
      avatar_url: null,
      learning_paused: false,
      quiet_hours_enabled: false,
      quiet_hours_start: "22:00",
      quiet_hours_end: "07:00",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const updated = { ...existing, ...updates, updated_at: new Date().toISOString() };
    this.profiles.set(userId, updated);
    return updated;
  }

  // --- Operacje na zgodach ---
  public getConsents(userId: string = DEMO_USER_ID): Consent[] {
    return this.consents.get(userId) || [];
  }

  public setConsent(userId: string = DEMO_USER_ID, scope: ConsentScope, isGranted: boolean): Consent {
    const userConsents = this.consents.get(userId) || [];
    const index = userConsents.findIndex((c) => c.scope === scope);
    const now = new Date().toISOString();

    if (index >= 0) {
      userConsents[index].is_granted = isGranted;
      if (isGranted) {
        userConsents[index].granted_at = now;
        userConsents[index].revoked_at = null;
      } else {
        userConsents[index].revoked_at = now;
      }
      this.consents.set(userId, userConsents);
      return userConsents[index];
    } else {
      const newConsent: Consent = {
        id: `c-${Date.now()}`,
        user_id: userId,
        scope,
        is_granted: isGranted,
        granted_at: isGranted ? now : null,
        revoked_at: isGranted ? null : now,
        version: "1.0",
        created_at: now,
      };
      userConsents.push(newConsent);
      this.consents.set(userId, userConsents);
      return newConsent;
    }
  }

  // --- Operacje na źródłach ---
  public getSources(userId: string = DEMO_USER_ID): SourceItem[] {
    return this.sources.get(userId) || [];
  }

  public addSource(
    userId: string,
    source: Omit<SourceItem, "id" | "user_id" | "created_at">
  ): SourceItem {
    const userSources = this.sources.get(userId) || [];
    const newSource: SourceItem = {
      ...source,
      id: `src-${Date.now()}`,
      user_id: userId,
      created_at: new Date().toISOString(),
    };
    userSources.unshift(newSource);
    this.sources.set(userId, userSources);
    return newSource;
  }

  public deleteSource(userId: string, sourceId: string): boolean {
    const userSources = this.sources.get(userId) || [];
    const filtered = userSources.filter((s) => s.id !== sourceId);
    this.sources.set(userId, filtered);

    // Kaskadowe usuwanie dowodów powiązanych z tym źródłem
    const userMemories = this.memories.get(userId) || [];
    for (const mem of userMemories) {
      if (mem.evidence) {
        mem.evidence = mem.evidence.filter((ev) => ev.source_item_id !== sourceId);
      }
    }
    return true;
  }

  // --- Operacje na pamięci (7 warstw) ---
  public getMemories(userId: string = DEMO_USER_ID, layer?: MemoryLayer): MemoryItem[] {
    const list = this.memories.get(userId) || [];
    if (layer) {
      return list.filter((m) => m.layer === layer);
    }
    return list;
  }

  public addMemory(
    userId: string,
    mem: Omit<MemoryItem, "id" | "user_id" | "created_at" | "updated_at">
  ): MemoryItem {
    const userMemories = this.memories.get(userId) || [];
    const now = new Date().toISOString();
    const newMem: MemoryItem = {
      ...mem,
      id: `mem-${Date.now()}`,
      user_id: userId,
      created_at: now,
      updated_at: now,
    };
    userMemories.unshift(newMem);
    this.memories.set(userId, userMemories);
    return newMem;
  }

  public updateMemory(
    userId: string,
    memoryId: string,
    updates: Partial<MemoryItem>
  ): MemoryItem | null {
    const userMemories = this.memories.get(userId) || [];
    const index = userMemories.findIndex((m) => m.id === memoryId);
    if (index === -1) return null;

    const updated = {
      ...userMemories[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    userMemories[index] = updated;
    this.memories.set(userId, userMemories);
    return updated;
  }

  public deleteMemory(userId: string, memoryId: string): boolean {
    const userMemories = this.memories.get(userId) || [];
    const filtered = userMemories.filter((m) => m.id !== memoryId);
    this.memories.set(userId, filtered);
    return true;
  }

  // --- Hipotezy ---
  public getHypotheses(userId: string): Hypothesis[] {
    return this.hypotheses.get(userId) || [];
  }

  public reviewHypothesis(
    userId: string,
    hypothesisId: string,
    decision: "confirmed" | "rejected" | "situational",
    reason?: string
  ): boolean {
    const list = this.hypotheses.get(userId) || [];
    const hyp = list.find((h) => h.id === hypothesisId);
    if (!hyp) return false;

    hyp.status = decision;
    hyp.rejection_reason = reason || null;
    hyp.reviewed_at = new Date().toISOString();

    // Jeśli zatwierdzona, utwórz wpis pamięci w odpowiedniej warstwie
    if (decision === "confirmed") {
      this.addMemory(userId, {
        layer: "values",
        title: "Potwierdzona cecha / zasada",
        content: hyp.hypothesis_text,
        epistemic_status: "user_declaration",
        confidence: "confirmed",
        is_superseded: false,
      });
    }

    return true;
  }

  // --- Przypadki decyzyjne ---
  public getDecisions(userId: string): DecisionCase[] {
    return this.decisions.get(userId) || [];
  }

  public addDecision(
    userId: string,
    dec: Omit<DecisionCase, "id" | "user_id" | "created_at">
  ): DecisionCase {
    const list = this.decisions.get(userId) || [];
    const newDec: DecisionCase = {
      ...dec,
      id: `dec-${Date.now()}`,
      user_id: userId,
      created_at: new Date().toISOString(),
    };
    list.unshift(newDec);
    this.decisions.set(userId, list);
    return newDec;
  }

  // --- Dialogi i wiadomości ---
  public getConversations(userId: string): Conversation[] {
    return this.conversations.get(userId) || [];
  }

  public createConversation(
    userId: string,
    title: string,
    mode: "reconstruction" | "assistant" | "critic" = "reconstruction"
  ): Conversation {
    const list = this.conversations.get(userId) || [];
    const now = new Date().toISOString();
    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      user_id: userId,
      title,
      mode,
      created_at: now,
      updated_at: now,
    };
    list.unshift(newConv);
    this.conversations.set(userId, list);
    return newConv;
  }

  public getMessages(conversationId: string): Message[] {
    return this.messages.get(conversationId) || [];
  }

  public addMessage(
    conversationId: string,
    userId: string,
    role: "user" | "assistant",
    content: string,
    options?: {
      mode?: "reconstruction" | "assistant" | "critic";
      grounding_citations?: { memory_id: string; title: string; quote: string }[];
      uncertainty_level?: "high" | "moderate" | "unknown";
    }
  ): Message {
    const list = this.messages.get(conversationId) || [];
    const newMsg: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      conversation_id: conversationId,
      user_id: userId,
      role,
      content,
      mode: options?.mode,
      grounding_citations: options?.grounding_citations,
      uncertainty_level: options?.uncertainty_level,
      created_at: new Date().toISOString(),
    };
    list.push(newMsg);
    this.messages.set(conversationId, list);
    return newMsg;
  }

  // --- Cyfrowa spuścizna ---
  // --- Cyfrowa spuścizna ---
  public getLegacyDirective(userId: string = DEMO_USER_ID): LegacyDirective {
    const existing = this.legacyDirectives.get(userId);
    if (existing) return existing;

    const defaultDirective: LegacyDirective = {
      id: `leg-${userId}`,
      user_id: userId,
      is_enabled: false,
      primary_contact_name: null,
      primary_contact_email: null,
      on_verified_death: "archive_only",
      allow_simulation: false,
      status: "dormant",
      mode: "archive_only",
      trusted_contact_email: "anna.nowak@przyklad.pl",
      inactivity_period_days: 180,
      require_death_certificate: true,
      posthumous_intro_message: "Zostawiam to archiwum z myślą o bliskich...",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.legacyDirectives.set(userId, defaultDirective);
    return defaultDirective;
  }

  public updateLegacyDirective(
    param1: string | Partial<LegacyDirective>,
    param2?: Partial<LegacyDirective>
  ): LegacyDirective {
    const userId = typeof param1 === "string" ? param1 : DEMO_USER_ID;
    const updates = typeof param1 === "string" ? param2 || {} : param1;
    const current = this.getLegacyDirective(userId);
    const updated = { ...current, ...updates, updated_at: new Date().toISOString() };
    this.legacyDirectives.set(userId, updated);
    return updated;
  }

  // --- API i granty deweloperskie ---
  public getApiClients(userId: string = DEMO_USER_ID): ApiClient[] {
    return this.apiClients.get(userId) || [];
  }

  public createApiClient(
    param1: string,
    param2?: string | string[],
    param3?: string
  ): ApiClient & { api_key: string } {
    let userId = DEMO_USER_ID;
    let name = param1;
    let scopes: string[] = ["style_only"];

    if (param3) {
      userId = param1;
      name = typeof param2 === "string" ? param2 : "Aplikacja";
    } else if (Array.isArray(param2)) {
      name = param1;
      scopes = param2;
    } else if (typeof param2 === "string") {
      userId = param1;
      name = param2;
    }

    const list = this.apiClients.get(userId) || [];
    const prefix = `alt_live_${Math.random().toString(36).slice(2, 6)}`;
    const secret = `sec_${Math.random().toString(36).slice(2, 18)}${Math.random().toString(36).slice(2, 18)}`;
    const fullKey = `${prefix}_${secret}`;

    const newClient: ApiClient & { api_key: string; client_id: string } = {
      id: `api-${Date.now()}`,
      user_id: userId,
      name,
      key_prefix: prefix,
      api_key: fullKey,
      client_id: `cli_${Math.random().toString(36).slice(2, 8)}`,
      is_active: true,
      rate_limit_per_minute: 60,
      created_at: new Date().toISOString(),
      last_used_at: null,
      grants: [
        {
          id: `gr-${Date.now()}`,
          client_id: `api-${Date.now()}`,
          user_id: userId,
          grant_type: (scopes[0] as any) || "style_only",
          allowed_layers: ["style"],
          prohibited_topics: ["finanse", "zdrowie"],
          is_revoked: false,
          expires_at: null,
          created_at: new Date().toISOString(),
        },
      ],
    };
    list.unshift(newClient);
    this.apiClients.set(userId, list);

    return newClient;
  }

  public revokeGrant(userId: string, clientId: string, grantId: string): boolean {
    const clients = this.apiClients.get(userId) || [];
    const client = clients.find((c) => c.id === clientId);
    if (!client || !client.grants) return false;

    const grant = client.grants.find((g) => g.id === grantId);
    if (!grant) return false;

    grant.is_revoked = true;
    return true;
  }

  // --- Metody fasadowe dla wygody UI i API ---
  public getConsentsMap(userId: string = DEMO_USER_ID): Record<string, boolean> {
    const list = this.getConsents(userId);
    const map: Record<string, boolean> = {
      profiling_core: true,
      memory_learning: true,
      style_analysis: true,
      third_party_sharing: false,
      legacy_preservation: true,
    };
    for (const c of list) {
      map[c.scope] = c.is_granted;
    }
    return map;
  }

  public updateConsent(purpose: string, isGranted: boolean, userId: string = DEMO_USER_ID): Record<string, boolean> {
    this.setConsent(userId, purpose as any, isGranted);
    return this.getConsentsMap(userId);
  }

  public getMemoryItems(userId: string = DEMO_USER_ID): MemoryItem[] {
    return this.getMemories(userId);
  }

  public getEvidenceForMemory(memoryId: string): MemoryEvidence[] {
    for (const [, mems] of this.memories) {
      const found = mems.find((m) => m.id === memoryId);
      if (found && found.evidence) return found.evidence;
    }
    return [];
  }

  public getMemoryStats(userId: string = DEMO_USER_ID) {
    const mems = this.getMemories(userId);
    return {
      total: mems.length,
      layers: {
        biography: mems.filter((m) => m.layer === "biography").length,
        knowledge: mems.filter((m) => m.layer === "knowledge").length,
        style: mems.filter((m) => m.layer === "style").length,
        preferences: mems.filter((m) => m.layer === "preferences").length,
        values: mems.filter((m) => m.layer === "values").length,
        decisions: mems.filter((m) => m.layer === "decisions").length,
        context: mems.filter((m) => m.layer === "context").length,
      },
    };
  }

  public getStyleExamples() {
    return [
      {
        context: "Krótka odpowiedź biznesowa",
        preferred_output: "Przeanalizowałem raport. Wyniki w sekcji 3 są spójne z naszymi założeniami; wdrożenie rozpoczynamy w poniedziałek.",
      },
      {
        context: "Odmowa lub korekta",
        preferred_output: "To rozwiązanie nie spełnia naszych kryteriów bezpieczeństwa. Wracamy do wariantu drugiego.",
      },
    ];
  }

  public getAuditEvents() {
    return [
      {
        id: "aud-1",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        event_type: "CONSENT_UPDATED",
        actor: "Użytkownik (panel)",
        payload: { scope: "memory_learning", status: "active" },
      },
      {
        id: "aud-2",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        event_type: "API_KEY_CREATED",
        actor: "Użytkownik (portal)",
        payload: { client_name: "Edytor Esejów", grant: "style_only" },
      },
      {
        id: "aud-3",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        event_type: "SOURCE_INGESTED",
        actor: "System (ingestion)",
        payload: { source: "Dziennik osobisty 2024", chunks: 14 },
      },
    ];
  }

  public revokeApiClient(clientId: string, userId: string = DEMO_USER_ID): boolean {
    const list = this.apiClients.get(userId) || [];
    const client = list.find((c) => c.id === clientId);
    if (!client) return false;
    client.is_active = false;
    return true;
  }

  public exportUserBundle(userId: string = DEMO_USER_ID) {
    return {
      profile: this.getProfile(userId),
      consents: this.getConsents(userId),
      sources: this.getSources(userId),
      memories: this.getMemories(userId),
      hypotheses: this.getHypotheses(userId),
      decisions: this.getDecisions(userId),
      legacy: this.getLegacyDirective(userId),
      export_timestamp: new Date().toISOString(),
      format_version: "AlterJa-RODO-1.0",
    };
  }

  public exportAllUserData(userId: string = DEMO_USER_ID) {
    return this.exportUserBundle(userId);
  }

  public deleteAllUserData(userId: string = DEMO_USER_ID) {
    this.memories.delete(userId);
    this.sources.delete(userId);
    this.hypotheses.delete(userId);
    this.decisions.delete(userId);
    this.conversations.delete(userId);
    this.legacyDirectives.delete(userId);
    this.apiClients.delete(userId);
    return true;
  }
}

// Globalny singleton w procesie serwera
export const globalStore = new MemoryDataStore();
export const store = globalStore;
