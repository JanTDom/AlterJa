-- ==============================================================================
-- AlterJa (alterja.pl) — Przebudowa silnika: fundamenty, proaktywność, zaproszenia
-- Migracja: 20260930000001_rebuild_foundations.sql
-- ==============================================================================

-- 1. INVITATIONS: Kody zaproszeń do zamkniętej rejestracji
CREATE TABLE IF NOT EXISTS public.invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    email TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    used_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    used_at TIMESTAMPTZ
);

-- 2. COVERAGE_SNAPSHOTS: Mapa pokrycia 7 warstw i podobszarów pamięci
CREATE TABLE IF NOT EXISTS public.coverage_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    layer TEXT NOT NULL,
    subarea TEXT NOT NULL,
    memory_count INT NOT NULL DEFAULT 0,
    freshness_score NUMERIC(4,3) NOT NULL DEFAULT 1.0,
    independent_sources_count INT NOT NULL DEFAULT 0,
    confirmed_ratio NUMERIC(4,3) NOT NULL DEFAULT 0.0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. SUGGESTED_ACTIONS: Kolejka następnych działań silnika proaktywności
CREATE TABLE IF NOT EXISTS public.suggested_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL, -- 'question', 'connect_source', 'confirm_hypothesis', 'resolve_conflict'
    priority NUMERIC(6,2) NOT NULL DEFAULT 100.0,
    rationale TEXT NOT NULL,
    layer TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'proposed', -- 'proposed', 'done', 'dismissed', 'snoozed'
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. DELEGATE_RULES: Twarde reguły delegata „Odpisz za mnie”
CREATE TABLE IF NOT EXISTS public.delegate_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    channel TEXT NOT NULL DEFAULT 'all', -- 'email', 'form', 'messenger', 'all'
    intent TEXT NOT NULL, -- 'pricing_inquiry', 'discount_request', 'meeting_proposal', 'general'
    condition_pattern TEXT NOT NULL,
    allowed_action TEXT NOT NULL, -- 'reject_with_policy', 'draft_for_approval', 'propose_slots'
    auto_send BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. TRUSTEES: Powiernicy cyfrowej spuścizny
CREATE TABLE IF NOT EXISTS public.trustees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT false,
    verification_token TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Włączenie RLS na nowych tabelach
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coverage_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suggested_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delegate_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trustees ENABLE ROW LEVEL SECURITY;

-- Polityki RLS
CREATE POLICY "Users can view own coverage" ON public.coverage_snapshots
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own suggested actions" ON public.suggested_actions
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own delegate rules" ON public.delegate_rules
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own trustees" ON public.trustees
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view valid invitations by code" ON public.invitations
    FOR SELECT USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Creators can manage their invitations" ON public.invitations
    FOR ALL USING (auth.uid() = created_by);

-- Indeksy dla nowych tabel
CREATE INDEX IF NOT EXISTS idx_coverage_snapshots_user ON public.coverage_snapshots(user_id);
CREATE INDEX IF NOT EXISTS idx_suggested_actions_user_status ON public.suggested_actions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_delegate_rules_user ON public.delegate_rules(user_id);
CREATE INDEX IF NOT EXISTS idx_trustees_user ON public.trustees(user_id);
CREATE INDEX IF NOT EXISTS idx_invitations_code ON public.invitations(code);

-- 6. Trigger automatycznego tworzenia profilu przy rejestracji w auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, email, display_name)
    VALUES (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
    )
    ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        updated_at = timezone('utc'::text, now());
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Funkcja hybrydowego wyszukiwania pamięci: match_memories
CREATE OR REPLACE FUNCTION public.match_memories(
    p_user_id UUID,
    p_query_embedding vector(768),
    p_query_text TEXT,
    p_layers TEXT[] DEFAULT NULL,
    p_match_threshold FLOAT DEFAULT 0.45,
    p_match_count INT DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    user_id UUID,
    layer TEXT,
    title TEXT,
    content TEXT,
    epistemic_status TEXT,
    confidence TEXT,
    similarity FLOAT,
    exact_quote TEXT,
    source_title TEXT
) LANGUAGE plpgsql STABLE AS $$
BEGIN
    RETURN QUERY
    SELECT
        m.id,
        m.user_id,
        m.layer,
        m.title,
        m.content,
        m.epistemic_status,
        m.confidence,
        (1 - (m.embedding <=> p_query_embedding))::FLOAT AS similarity,
        coalesce(e.exact_quote, '') AS exact_quote,
        coalesce(s.title, 'Deklaracja bezpośrednia') AS source_title
    FROM public.memory_items m
    LEFT JOIN LATERAL (
        SELECT me.exact_quote, me.source_item_id
        FROM public.memory_evidence me
        WHERE me.memory_item_id = m.id
        ORDER BY me.evidence_weight DESC
        LIMIT 1
    ) e ON true
    LEFT JOIN public.source_items s ON s.id = e.source_item_id
    WHERE m.user_id = p_user_id
      AND m.is_superseded = false
      AND (p_layers IS NULL OR m.layer = ANY(p_layers))
      AND m.embedding IS NOT NULL
      AND (1 - (m.embedding <=> p_query_embedding)) >= p_match_threshold
    ORDER BY similarity DESC
    LIMIT p_match_count;
END;
$$;
