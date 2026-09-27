-- ==============================================================================
-- AlterJa (alterja.pl) — Kompletny schemat bazy danych PostgreSQL / Supabase
-- Migracja: 20260927000001_initial_schema.sql
-- ==============================================================================

-- Włączenie niezbędnych rozszerzeń
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- vector extension dla embeddingów semantycznych
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. PROFILES: Główne profile użytkowników (powiązane z auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    email TEXT,
    avatar_url TEXT,
    learning_paused BOOLEAN NOT NULL DEFAULT false,
    quiet_hours_enabled BOOLEAN NOT NULL DEFAULT false,
    quiet_hours_start TIME DEFAULT '22:00',
    quiet_hours_end TIME DEFAULT '07:00',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. CONSENTS: Granularne zgody na przetwarzanie danych per cel
CREATE TABLE IF NOT EXISTS public.consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    scope TEXT NOT NULL, -- 'analysis', 'style_modeling', 'voice_synthesis', 'api_sharing', 'postmortem'
    is_granted BOOLEAN NOT NULL DEFAULT false,
    granted_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    ip_hash TEXT,
    user_agent TEXT,
    version TEXT NOT NULL DEFAULT '1.0',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. SOURCE_CONNECTIONS: Połączenia z zewnętrznymi źródłami lub folderami
CREATE TABLE IF NOT EXISTS public.source_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider TEXT NOT NULL, -- 'manual_upload', 'text_paste', 'audio_memo', 'gmail', 'calendar'
    account_identifier TEXT,
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'paused', 'revoked', 'requires_reauth'
    last_synced_at TIMESTAMPTZ,
    sync_cursor TEXT,
    settings JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. SOURCE_ITEMS: Poszczególne dokumenty, maile, nagrania źródłowe
CREATE TABLE IF NOT EXISTS public.source_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    connection_id UUID REFERENCES public.source_connections(id) ON DELETE SET NULL,
    external_id TEXT,
    title TEXT NOT NULL,
    raw_content TEXT,
    file_path TEXT, -- ścieżka w Supabase Storage
    mime_type TEXT NOT NULL DEFAULT 'text/plain',
    size_bytes BIGINT NOT NULL DEFAULT 0,
    source_author TEXT,
    is_third_party BOOLEAN NOT NULL DEFAULT false,
    is_synthetic_ai BOOLEAN NOT NULL DEFAULT false,
    event_timestamp TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. INGESTION_JOBS: Asynchroniczne zadania przetwarzania źródeł
CREATE TABLE IF NOT EXISTS public.ingestion_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    source_item_id UUID REFERENCES public.source_items(id) ON DELETE CASCADE,
    job_type TEXT NOT NULL, -- 'parse_document', 'transcribe_audio', 'extract_memory', 'embed_vectors'
    status TEXT NOT NULL DEFAULT 'queued', -- 'queued', 'running', 'succeeded', 'failed', 'cancelled'
    attempts INT NOT NULL DEFAULT 0,
    max_attempts INT NOT NULL DEFAULT 3,
    error_message TEXT,
    progress_percentage INT NOT NULL DEFAULT 0,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. MEMORY_ITEMS: 7 warstw modelu wiedzy o osobie
CREATE TABLE IF NOT EXISTS public.memory_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    layer TEXT NOT NULL, -- 'biography', 'knowledge', 'style', 'preferences', 'values', 'decisions', 'context'
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    epistemic_status TEXT NOT NULL DEFAULT 'hypothesis', -- 'source_record', 'user_declaration', 'observed_behavior', 'hypothesis', 'disputed', 'superseded', 'synthetic_ai'
    confidence TEXT NOT NULL DEFAULT 'provisional', -- 'confirmed', 'provisional', 'disputed'
    is_superseded BOOLEAN NOT NULL DEFAULT false,
    superseded_by_id UUID REFERENCES public.memory_items(id) ON DELETE SET NULL,
    embedding vector(768), -- wektor Gemini text-embedding-004
    embedding_model TEXT DEFAULT 'text-embedding-004',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. MEMORY_EVIDENCE: Pochodzenie i powiązanie pamięci z konkretnym cytatem źródłowym
CREATE TABLE IF NOT EXISTS public.memory_evidence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    memory_item_id UUID NOT NULL REFERENCES public.memory_items(id) ON DELETE CASCADE,
    source_item_id UUID NOT NULL REFERENCES public.source_items(id) ON DELETE CASCADE,
    exact_quote TEXT NOT NULL,
    char_start INT,
    char_end INT,
    evidence_weight NUMERIC(3,2) NOT NULL DEFAULT 1.0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. MEMORY_LINKS: Graf powiązań między pojęciami i wspomnieniami
CREATE TABLE IF NOT EXISTS public.memory_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    source_memory_id UUID NOT NULL REFERENCES public.memory_items(id) ON DELETE CASCADE,
    target_memory_id UUID NOT NULL REFERENCES public.memory_items(id) ON DELETE CASCADE,
    relation_type TEXT NOT NULL, -- 'causes', 'influences', 'explains', 'contradicts', 'elaborates'
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. HYPOTHESES: Wnioski i przypuszczenia modelu oczekujące na przegląd
CREATE TABLE IF NOT EXISTS public.hypotheses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    hypothesis_text TEXT NOT NULL,
    alternative_explanation TEXT,
    supporting_evidence_count INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'rejected', 'situational'
    rejection_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    reviewed_at TIMESTAMPTZ
);

-- 10. DECISIONS: Zapis przypadków decyzyjnych użytkownika
CREATE TABLE IF NOT EXISTS public.decisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    situation TEXT NOT NULL,
    options_considered JSONB NOT NULL DEFAULT '[]'::jsonb,
    chosen_option TEXT NOT NULL,
    user_justification TEXT,
    observed_outcome TEXT,
    post_hoc_reflection TEXT,
    decision_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. STYLE_EXAMPLES: Próbki stylu i wypowiedzi dla silnika rekonstrukcji
CREATE TABLE IF NOT EXISTS public.style_examples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    register TEXT NOT NULL DEFAULT 'professional', -- 'private', 'professional', 'negotiation', 'reflective'
    original_text TEXT NOT NULL,
    analyzed_tokens JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. INTERVIEW_SESSIONS: Sesje adaptacyjnych wywiadów biograficznych
CREATE TABLE IF NOT EXISTS public.interview_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'completed', 'paused'
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    completed_at TIMESTAMPTZ
);

-- 13. INTERVIEW_ANSWERS: Odpowiedzi i mikropytania wywiadu
CREATE TABLE IF NOT EXISTS public.interview_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.interview_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    answer_text TEXT,
    is_skipped BOOLEAN NOT NULL DEFAULT false,
    skip_reason TEXT,
    audio_memo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 14. PERSONA_VERSIONS: Punkty przywracania i wersje profilu rekonstrukcji
CREATE TABLE IF NOT EXISTS public.persona_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    version_tag TEXT NOT NULL, -- np. 'v1.0.4'
    description TEXT,
    snapshot_data JSONB NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 15. CONVERSATIONS: Sesje dialogowe z modelem AlterJa
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Nowa rozmowa',
    mode TEXT NOT NULL DEFAULT 'reconstruction', -- 'reconstruction', 'assistant', 'critic'
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 16. MESSAGES: Wiadomości w konwersacji
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL, -- 'user', 'assistant'
    content TEXT NOT NULL,
    mode TEXT,
    grounding_citations JSONB DEFAULT '[]'::jsonb, -- lista referencji do memory_items
    uncertainty_level TEXT, -- 'high', 'moderate', 'unknown'
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 17. FEEDBACK: Oceny i korekty odpowiedzi modelu przez użytkownika
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE,
    feedback_type TEXT NOT NULL, -- 'accurate', 'hallucination', 'wrong_tone', 'factual_error'
    correction_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 18. EVALUATION_RUNS: Wyniki rygorystycznych testów regresji modelu
CREATE TABLE IF NOT EXISTS public.evaluation_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    run_name TEXT NOT NULL,
    metrics JSONB NOT NULL, -- { factuality: 0.98, abstention_on_unknown: 1.0, style_similarity: 0.89 }
    sample_size INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 19. API_CLIENTS: Aplikacje zewnętrzne zarejestrowane w portalu deweloperskim
CREATE TABLE IF NOT EXISTS public.api_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    key_prefix TEXT NOT NULL, -- niesekretny prefiks np. 'alt_live_9a8f'
    key_hash TEXT NOT NULL, -- kryptograficzny skrót SHA-256 klucza API
    is_active BOOLEAN NOT NULL DEFAULT true,
    rate_limit_per_minute INT NOT NULL DEFAULT 60,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    last_used_at TIMESTAMPTZ
);

-- 20. ACCESS_GRANTS: Selektywne profile udostępnienia zdolności dla aplikacji API
CREATE TABLE IF NOT EXISTS public.access_grants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.api_clients(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    grant_type TEXT NOT NULL, -- 'style_only', 'memory_query', 'preference_predict', 'reconstruction'
    allowed_layers JSONB DEFAULT '["style"]'::jsonb,
    prohibited_topics JSONB DEFAULT '[]'::jsonb,
    expires_at TIMESTAMPTZ,
    is_revoked BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 21. AUDIT_EVENTS: Niezmienny dziennik audytowy operacji bezpieczeństwa
CREATE TABLE IF NOT EXISTS public.audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    action TEXT NOT NULL, -- 'data_imported', 'memory_deleted', 'api_access_granted', 'token_revoked', 'legacy_activated'
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    ip_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 22. LEGACY_DIRECTIVES: Dyspozycje dotyczące cyfrowej spuścizny
CREATE TABLE IF NOT EXISTS public.legacy_directives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    is_enabled BOOLEAN NOT NULL DEFAULT false,
    primary_contact_email TEXT,
    primary_contact_name TEXT,
    on_verified_death TEXT NOT NULL DEFAULT 'delete_all', -- 'delete_all', 'archive_only', 'reconstruction_allowed'
    allow_simulation BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'dormant', -- 'dormant', 'verification_pending', 'active', 'completed'
    verification_documents JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 23. EXPORT_JOBS: Pełne paczki danych do pobrania (zgodność z RODO)
CREATE TABLE IF NOT EXISTS public.export_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    format TEXT NOT NULL DEFAULT 'json_bundle', -- 'json_bundle', 'pdf_archive'
    status TEXT NOT NULL DEFAULT 'queued',
    download_url TEXT,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indeksy wydajnościowe
CREATE INDEX IF NOT EXISTS idx_consents_user ON public.consents(user_id);
CREATE INDEX IF NOT EXISTS idx_source_items_user ON public.source_items(user_id);
CREATE INDEX IF NOT EXISTS idx_memory_items_user_layer ON public.memory_items(user_id, layer);
CREATE INDEX IF NOT EXISTS idx_memory_evidence_memory ON public.memory_evidence(memory_item_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_api_clients_hash ON public.api_clients(key_hash);
CREATE INDEX IF NOT EXISTS idx_audit_events_user ON public.audit_events(user_id);
