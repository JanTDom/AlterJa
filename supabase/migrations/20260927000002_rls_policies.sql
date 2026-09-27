-- ==============================================================================
-- AlterJa (alterja.pl) — Rygorystyczne polityki Row Level Security (RLS)
-- Migracja: 20260927000002_rls_policies.sql
-- ==============================================================================

-- Włączenie RLS na wszystkich 23 tabelach
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.source_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.source_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingestion_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memory_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memory_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hypotheses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.style_examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.persona_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legacy_directives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.export_jobs ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- 2. CONSENTS
CREATE POLICY "Users can view own consents" ON public.consents
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own consents" ON public.consents
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own consents" ON public.consents
    FOR UPDATE USING (auth.uid() = user_id);

-- 3. SOURCE_CONNECTIONS
CREATE POLICY "Users can manage own connections" ON public.source_connections
    FOR ALL USING (auth.uid() = user_id);

-- 4. SOURCE_ITEMS
CREATE POLICY "Users can manage own source items" ON public.source_items
    FOR ALL USING (auth.uid() = user_id);

-- 5. INGESTION_JOBS
CREATE POLICY "Users can view own jobs" ON public.ingestion_jobs
    FOR SELECT USING (auth.uid() = user_id);

-- 6. MEMORY_ITEMS
CREATE POLICY "Users can view own memories" ON public.memory_items
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own memories" ON public.memory_items
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own memories" ON public.memory_items
    FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own memories" ON public.memory_items
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 7. MEMORY_EVIDENCE
CREATE POLICY "Users can view own evidence" ON public.memory_evidence
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own evidence" ON public.memory_evidence
    FOR DELETE USING (auth.uid() = user_id);

-- 8. MEMORY_LINKS
CREATE POLICY "Users can manage own memory links" ON public.memory_links
    FOR ALL USING (auth.uid() = user_id);

-- 9. HYPOTHESES
CREATE POLICY "Users can manage own hypotheses" ON public.hypotheses
    FOR ALL USING (auth.uid() = user_id);

-- 10. DECISIONS
CREATE POLICY "Users can manage own decisions" ON public.decisions
    FOR ALL USING (auth.uid() = user_id);

-- 11. STYLE_EXAMPLES
CREATE POLICY "Users can manage own style examples" ON public.style_examples
    FOR ALL USING (auth.uid() = user_id);

-- 12. INTERVIEW_SESSIONS
CREATE POLICY "Users can manage own interview sessions" ON public.interview_sessions
    FOR ALL USING (auth.uid() = user_id);

-- 13. INTERVIEW_ANSWERS
CREATE POLICY "Users can manage own interview answers" ON public.interview_answers
    FOR ALL USING (auth.uid() = user_id);

-- 14. PERSONA_VERSIONS
CREATE POLICY "Users can manage own persona versions" ON public.persona_versions
    FOR ALL USING (auth.uid() = user_id);

-- 15. CONVERSATIONS
CREATE POLICY "Users can manage own conversations" ON public.conversations
    FOR ALL USING (auth.uid() = user_id);

-- 16. MESSAGES
CREATE POLICY "Users can manage own messages" ON public.messages
    FOR ALL USING (auth.uid() = user_id);

-- 17. FEEDBACK
CREATE POLICY "Users can manage own feedback" ON public.feedback
    FOR ALL USING (auth.uid() = user_id);

-- 18. EVALUATION_RUNS
CREATE POLICY "Users can manage own evaluations" ON public.evaluation_runs
    FOR ALL USING (auth.uid() = user_id);

-- 19. API_CLIENTS
CREATE POLICY "Users can manage own API clients" ON public.api_clients
    FOR ALL USING (auth.uid() = user_id);

-- 20. ACCESS_GRANTS
CREATE POLICY "Users can manage own access grants" ON public.access_grants
    FOR ALL USING (auth.uid() = user_id);

-- 21. AUDIT_EVENTS
CREATE POLICY "Users can view own audit events" ON public.audit_events
    FOR SELECT USING (auth.uid() = user_id);

-- 22. LEGACY_DIRECTIVES
CREATE POLICY "Users can manage own legacy directives" ON public.legacy_directives
    FOR ALL USING (auth.uid() = user_id);

-- 23. EXPORT_JOBS
CREATE POLICY "Users can manage own export jobs" ON public.export_jobs
    FOR ALL USING (auth.uid() = user_id);
