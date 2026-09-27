# Macierz kompetencji i przypisania zadań Alterja

## 1. Wykaz 20 skilli projektu

| Lp. | Identyfikator skilla | Perspektywa domenowa | Główne zadania i zastosowanie |
| :-- | :--- | :--- | :--- |
| 1 | `alterja-orchestrator` | Architekt AI / Koordynator | Dobór skilli, kontrola granic etapów, rozstrzyganie sprzeczności, rejestr ADR. |
| 2 | `alterja-product-research` | Projektant produktu | Analiza potrzeb, definiowanie MVP, mapowanie ścieżek użytkownika, kryteria sukcesu. |
| 3 | `alterja-personality-psychology` | Badacz psychologii | Psychologia różnic indywidualnych (BFI-2), tożsamość narracyjna, zakaz autodiagnoz. |
| 4 | `alterja-adaptive-interview` | Badacz / Moderator | Projektowanie dobrowolnych wywiadów, mikropytań, szacunek dla odmowy odpowiedzi. |
| 5 | `alterja-consent-ingestion` | Bezpieczeństwo / Prawnik | Pozyskiwanie danych, granulacja zgód, filtracja osób trzecich i treści AI, podgląd. |
| 6 | `alterja-memory-provenance` | Inżynier wiedzy | Pamięć z pochodzeniem źródeł, rozstrzyganie sprzeczności, historia korekt, usuwanie. |
| 7 | `alterja-persona-reconstruction` | Architekt AI / NLP | Rekonstrukcja stylu, rozróżnienie symulacji od asystenta, obsługa granic niewiedzy. |
| 8 | `alterja-evaluation` | Badacz AI / QA | Metodologia ewaluacji, testy regresji, zbiory bez zanieczyszczeń, eliminacja pseudometryk. |
| 9 | `alterja-api-platform` | Architekt API | Kontrakty OpenAPI 3.1, profile udostępniania stylu/pamięci, RFC 9700, cofanie tokenów. |
| 10 | `alterja-polish-editor` | Redaktor językowy | Poprawność językowa, normy RJP 2026, polska typografia, sentence casing, mikroteksty. |
| 11 | `alterja-brand-art-direction` | Dyrektor artystyczny | Tożsamość marki, powaga i spokój, eliminacja kiczowatych klisz sci-fi i neonów. |
| 12 | `alterja-premium-ui` | Projektant UI | Architektura widoków, system tokenów OKLCH, pełne spektrum stanów (pusty, błąd). |
| 13 | `alterja-frontend-engineering` | Inżynier frontendu | Standardy Next.js/React/TypeScript, semantyka HTML, budżety wydajności, obsługa błędów. |
| 14 | `alterja-accessibility-visual-qa` | Specjalista QA | Audyty WCAG 2.2 AA, kontrast, obsługa klawiaturą, czytniki ekranu, odbiór wizualny. |
| 15 | `alterja-backend-data` | Inżynier backendu | Model danych, izolacja wielodostępna (Supabase RLS), HNSW pgvector, kolejki zadań. |
| 16 | `alterja-security-privacy` | Bezpieczeństwo / DPO | Model zagrożeń OWASP LLM, obrona przed injection, zgodność z RODO i Aktem o AI. |
| 17 | `alterja-voice-multimodal` | Inżynier audio | Jakość syntezy mowy (ElevenLabs + failover), diarization, zgody biometryczne, znakowanie. |
| 18 | `alterja-digital-legacy` | Prawnik / Etyk spuścizny | Archiwum pośmiertne, procedury weryfikacji zgonu, zamrożenie tożsamości, etyka żałoby. |
| 19 | `alterja-delivery-ops` | Inżynier operacyjny | Procedury wydań, checklisty wdrożeniowe, kontrola budżetów AI, procedury rollback. |
| 20 | `alterja-research-evidence` | Analityk naukowy | Weryfikacja w źródłach pierwotnych, kontrola cytowań, rejestracja dowodów. |

## 2. Przypisanie skilli do scenariuszy roboczych

### Scenariusz A: Nowa propozycja funkcjonalna
1. `alterja-orchestrator` (weryfikacja etapu i plan)
2. `alterja-product-research` (analiza wartości i ścieżki)
3. `alterja-security-privacy` (analiza ryzyk prywatności)
4. `alterja-polish-editor` (redakcja opisów i pojęć)

### Scenariusz B: Modelowanie i rozbudowa pamięci
1. `alterja-memory-provenance` (schemat wpisów i pochodzenie)
2. `alterja-consent-ingestion` (zgody i filtry autorstwa)
3. `alterja-personality-psychology` (ostrożność interpretacji)
4. `alterja-backend-data` (struktura tabel i indeksów RLS)

### Scenariusz C: Przygotowanie integracji API
1. `alterja-api-platform` (kontrakty i profile uprawnień)
2. `alterja-security-privacy` (zagrożenia wycieku danych)
3. `alterja-persona-reconstruction` (granice rekonstrukcji)
4. `alterja-research-evidence` (weryfikacja RFC 9700 i OpenAPI)

### Scenariusz D: Weryfikacja i odbiór jakościowy
1. `alterja-evaluation` (testy wierności i regresji AI)
2. `alterja-accessibility-visual-qa` (kontrast, klawiatura, WCAG)
3. `alterja-polish-editor` (audyt językowy interfejsu)
4. `alterja-delivery-ops` (checklisty gotowości)
