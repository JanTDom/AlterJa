# Rejestr źródeł, norm i punktów odniesienia Alterja

Poniższy rejestr dokumentuje źródła pierwotne i punkty odniesienia określone w założeniach projektu Alterja. Każde źródło uzasadnia konkretny zakres wymagań i nie może być nadinterpretowane ponad treść pierwotną.

| Oznaczenie | Nazwa i autor | Identyfikator / URL | Data weryfikacji | Zakres uzasadniony przez źródło w Alterji |
| :--- | :--- | :--- | :--- | :--- |
| **[S1]** | Google Antigravity: Agent Skills | `https://antigravity.google/docs/skills` | 2026-09-27 | Struktura `SKILL.md`, YAML frontmatter, lokalizacja `.agents/skills/`, stopniowe ujawnianie instrukcji. |
| **[S2]** | Google Antigravity: Rules | `https://antigravity.google/docs/rules` | 2026-09-27 | Reguły projektowe `.agents/rules/*.md`, limit 12 000 znaków (24 KB) na plik, hierarchiczne ładowanie. |
| **[S3]** | Colby College: The Big Five Inventory–2 (BFI-2) | `https://www.colby.edu/academics/departments-and-programs/psychology/research-opportunities/personality-lab/the-bfi-2/` | 2026-09-27 | Pięć domen i 15 cech osobowości jako pomocnicza rama różnic indywidualnych; zakaz autodiagnozowania. |
| **[S4]** | Park et al.: LLM Agents Grounded in Self-Reports Enable General-Purpose Simulation of Individuals | `https://arxiv.org/abs/2411.10109` | 2026-09-27 | Inspiracja metodologiczna do modelowania osób; dowód na potrzebę ugruntowania w źródłach, a nie certyfikat 100% wierności. |
| **[S5]** | Hollanek & Nowaczyk-Basińska: Griefbots, Deadbots, Postmortem Avatars (Philosophy & Technology, 2024) | `https://www.repository.cam.ac.uk/items/bc2f1612-f989-4a92-9d1a-7105a3757d7b` | 2026-09-27 | Etyka symulacji pośmiertnych: wymóg wzajemnej zgody, transparentność statusu AI, procedury wycofania i ochrony przed uzależnieniem. |
| **[S6]** | EUR-Lex: Rozporządzenie 2016/679 (RODO) | `https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX%3A32016R0679` | 2026-09-27 | Zasady przetwarzania, ochrona w fazie projektowania (art. 25), motyw 27 (wyłączenie zmarłych, lecz ochrona praw osób żyjących). |
| **[S7]** | W3C: Web Content Accessibility Guidelines (WCAG) 2.2 | `https://www.w3.org/TR/WCAG22/` | 2026-09-27 | Kryteria dostępności poziomu AA: kontrasty, nawigacja klawiaturą, wskaźniki fokusu, obsługa czytników ekranu. |
| **[S8]** | Supabase: Row Level Security | `https://supabase.com/docs/guides/database/postgres/row-level-security` | 2026-09-27 | Zasady izolacji i kontroli dostępu na poziomie bazy danych; zakaz `service_role` we frontendzie. |
| **[S9]** | Google: Choose Gmail API Scopes | `https://developers.google.com/workspace/gmail/api/auth/scopes` | 2026-09-27 | Ograniczenia i procedury weryfikacji aplikacji przy dostępie do zakresu `gmail.readonly`. |
| **[S10]** | Rada Języka Polskiego PAN: Zasady pisowni i interpunkcji polskiej | `https://rjp.pan.pl/zasady-pisowni-i-interpunkcji-polskiej-2/` | 2026-09-27 | Oficjalna norma ortograficzna i interpunkcyjna języka polskiego, ze szczególnym uwzględnieniem reformy od 1 stycznia 2026 r. |
| **[S11]** | OWASP: LLM01:2025 Prompt Injection | `https://genai.owasp.org/llmrisk/llm01-prompt-injection/` | 2026-09-27 | Ryzyka wstrzykiwania instrukcji w importowanych danych; konieczność obrony poza samym promptem językowym. |
| **[S12]** | OWASP: LLM07:2025 System Prompt Leakage | `https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/` | 2026-09-27 | Ochrona przed wyciekiem promptu nadrzędnego; zasada nieumieszczania sekretów w treści promptów. |
| **[S13]** | IETF: RFC 9700 (Best Current Practice for OAuth 2.0 Security) | `https://www.rfc-editor.org/rfc/rfc9700.html` | 2026-09-27 | Standardy bezpiecznej autoryzacji tokenowej, ochrony przed przechwyceniem i rotacji uprawnień. |
| **[S14]** | OpenAPI Initiative: OpenAPI Specification 3.1 | `https://spec.openapis.org/oas/latest.html` | 2026-09-27 | Standard opisu kontraktów API i definicji schematów żądań/odpowiedzi. |
| **[S15]** | EUR-Lex: Rozporządzenie 2024/1689 (Akt w sprawie AI / AI Act) | `https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX%3A32024R1689` | 2026-09-27 | Klasyfikacja systemów AI, wymogi transparentności przy generowaniu treści syntetycznych i symulacjach osób. |
| **[S16]** | Google web.dev: Web Vitals | `https://web.dev/articles/vitals` | 2026-09-27 | Progi jakości wydajności webowej: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 w 75. percentylu wizyt. |
