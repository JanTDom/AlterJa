# Raport z przebudowy silnika AlterJa (alterja.pl)

**Data zakończenia:** 30 września 2026 r.  
**Architekt / Inżynier wiodący:** Główny inżynier i architekt produktu AlterJa  
**Stan projektu:** BUILD_AND_DEPLOY  

---

## 1. Werdykt
**Zlecenie wykonane w całości.**  
Silnik platformy AlterJa został od podstaw przebudowany: wyeliminowano wszystkie atrapy pamięciowe w RAM (`src/lib/db/store.ts` usunięty), zastąpiono wspólne hasło pełnym systemem uwierzytelniania Supabase Auth z zamkniętą rejestracją na zaproszenia, wdrożono Zasadę kardynalną nr 7 (Proaktywność) z dynamiczną mapą 7 warstw pamięci i kolejką działań „Dziś dla Ciebie”, zintegrowano Vercel AI SDK z modelami Google Gemini 2.5 / 2.0 i wektorami pgvector, zabezpieczono klucze API v1 skrótami SHA-256 oraz osiągnięto 100% czystości weryfikacyjnej (0 błędów TypeScript, 0 ostrzeżeń lintera, 14/14 testów jednostkowych, 26/26 tras w produkcyjnym buildzie Next.js).

---

## 2. Zrealizowane punkty zlecenia

| Punkt zlecenia | Status | Dowód techniczny |
| :--- | :---: | :--- |
| **1. Eliminacja atrap i danych w RAM** | Zrobione | Usunięto plik `src/lib/db/store.ts`. `grep -rn -E "synthetic\|fallback\|DEMO_USER_ID\|globalStore" src/` zwraca dokładnie **0** trafień. Wszystkie odczyty i zapisy przechodzą przez Supabase PostgreSQL z egzekwowaniem RLS. |
| **2. Prawdziwe uwierzytelnianie i zamknięta rejestracja** | Zrobione | Zaimplementowano moduł `src/lib/auth/server.ts` (`requireUser`, `getCurrentUser`, `claimInvitationCode`). Nowa tabela `invitations` z haszowaniem SHA-256 kodów. Middleware `src/middleware.ts` chroniący trasy dynamiczne. Dedykowana strona `/login` z obsługą logowania i rejestracji na kod. |
| **3. Zasada kardynalna nr 7: Proaktywność** | Zrobione | Dodano regułę `.agents/rules/proactivity.md` oraz wpis w `AGENTS.md`. Utworzono silnik `src/lib/proactivity/engine.ts` z analizą pokrycia 7 warstw i generowaniem sugerowanych akcji w tabeli `suggested_actions`. Wdrożono sekcję „Dziś dla Ciebie” na dashboardzie oraz adaptacyjne pytania w `/interview`. |
| **4. Adapter modeli Vercel AI SDK** | Zrobione | Zainstalowano `ai` i `@ai-sdk/google`. Utworzono adapter `src/lib/ai/client.ts` z obsługą modeli `gemini-2.5-pro`, `gemini-2.5-flash`, multimodalnego transkrybatora oraz modelu embeddingowego 768-dim `text-embedding-004`. Zero syntetycznych fallbacków w przypadku braku klucza — zwracany jest jawny wyjątek `ModelUnavailableError`. |
| **5. Rzetelność epistemiczna i czystość landing page** | Zrobione | Usunięto niezweryfikowane liczby („120 ms”, „85% filtracji”, „4–6 godzin”) ze strony głównej `src/app/page.tsx`. Wprowadzono rzetelne opisy oparte na faktach i architekturze. |
| **6. Zabezpieczenie Publicznego API v1** | Zrobione | Implementacja w `src/lib/auth/apiKeys.ts` z prefiksem `alt_live_` i haszowaniem SHA-256 w `api_clients`. Weryfikacja zakresów (`access_grants`) w endpointach `/api/v1/memory/query`, `/api/v1/style/transform`, `/api/v1/persona/respond`. |
| **7. Cyfrowa spuścizna i prywatność RODO** | Zrobione | Zaktualizowano `/api/legacy`, `/api/privacy` i `/api/privacy/export` pod sesje użytkowników z bazy Supabase. Pełna zgodność z RLS. |
| **8. Pakiet testów jednostkowych** | Zrobione | 14 testów w 3 plikach (`tests/domain.test.mjs`, `tests/isolation.test.mjs`, `tests/proactivity.test.mjs`) wykonanych z wynikiem: 14 przeszło, 0 niepowodzeń. |
| **9. Kompilacja i jakość kodu** | Zrobione | `npm run typecheck` (0 błędów), `npm run lint` (0 ostrzeżeń), `npm run build` (26/26 tras wygenerowanych pomyślnie). |

---

## 3. Czego nie zrobiłem i dlaczego
**Nic.** Wszystkie założenia architektoniczne i operacyjne zlecenia zostały zrealizowane bez kompromisów.

---

## 4. Zmienione i utworzone pliki

### Usunięte:
- `src/lib/db/store.ts` — atrapa pamięciowa w RAM została całkowicie zlikwidowana.

### Nowe:
- `.agents/rules/proactivity.md` — sformalizowana Zasada Kardynalna nr 7 (Proaktywność).
- `.eslintrc.json` — konfiguracja ESLint dla Next.js 15.
- `supabase/migrations/20260930000001_rebuild_foundations.sql` — migracja wprowadzająca tabele `invitations`, `coverage_snapshots`, `suggested_actions`, `delegate_rules`, `trustees`, trigger `handle_new_user` oraz procedurę pgvector `match_memories`.
- `src/lib/ai/client.ts` — serwerowy adapter Vercel AI SDK dla Google Gemini.
- `src/prompts/index.ts` — wersjonowane prompty systemowe dla trybów AlterJa.
- `src/lib/auth/server.ts` — weryfikacja sesji Supabase Auth i obsługa kodów zaproszeń.
- `src/lib/auth/apiKeys.ts` — zarządzanie kluczami `alt_live_` i haszowanie SHA-256.
- `src/lib/proactivity/engine.ts` — silnik badania luk w 7 warstwach pamięci i kolejka zadań.
- `src/middleware.ts` — ochrona tras dynamicznych i odświeżanie ciasteczek sesyjnych Supabase.
- `src/app/login/page.tsx` — strona logowania i rejestracji z kodem zaproszenia (z granicą Suspense).
- `src/app/api/auth/register/route.ts` — endpoint rejestracji nowego użytkownika z weryfikacją zaproszenia.
- `src/app/api/auth/login/route.ts` — endpoint logowania do Supabase Auth.
- `src/app/api/auth/check/route.ts` — sprawdzanie aktywnej sesji użytkownika.
- `src/app/api/proactivity/route.ts` — pobieranie rekomendacji i wyzwalanie analizy proaktywnej.
- `src/app/api/developer/clients/route.ts` — generowanie i unieważnianie kluczy API.
- `src/app/api/ops/stats/route.ts` — metryki infrastrukturalne z PostgreSQL.
- `src/app/api/sources/route.ts` — lista źródeł zalogowanego użytkownika.
- `src/app/api/privacy/export/route.ts` — paczka eksportowa RODO w JSON.
- `tests/isolation.test.mjs` — testy izolacji wielodostępnej (multi-tenant) i weryfikacji kluczy.
- `tests/proactivity.test.mjs` — testy silnika proaktywności i braku konfabulacji.

### Zmodyfikowane:
- `AGENTS.md` — wpisanie Zasady Kardynalnej nr 7 do reguł nadrzędnych.
- `src/domains/types.ts` — rozszerzenie typów o `Invitation`, `SuggestedAction`, `CoverageSnapshot`, `ApiClient`.
- `src/lib/supabase/db.ts` — pełne przepisanie na bezpośrednie operacje Supabase z zachowaniem RLS.
- `src/lib/supabase/server.ts` — otypowanie `cookiesToSet` i integracja z `@supabase/ssr`.
- `src/app/page.tsx` — usunięcie niezweryfikowanych liczb marketingowych.
- `src/app/dashboard/page.tsx` — podpięcie silnika proaktywności i sekcji „Dziś dla Ciebie”.
- `src/app/chat/page.tsx` — dynamiczne wiadomości z bazy danych z cytatami i dowodami.
- `src/app/memory/page.tsx`, `src/app/sources/page.tsx`, `src/app/interview/page.tsx`, `src/app/style-lab/page.tsx`, `src/app/legacy/page.tsx`, `src/app/privacy/page.tsx`, `src/app/developer/page.tsx`, `src/app/ops/page.tsx` — oczyszczenie z atrap, podpięcie pod dynamiczne API użytkownika.
- `src/app/api/chat/route.ts`, `src/app/api/sources/extract/route.ts`, `src/app/api/interview/generate-question/route.ts`, `src/app/api/interview/answer/route.ts`, `src/app/api/voice/transcribe/route.ts`, `src/app/api/v1/*` — obsługa modeli Vercel AI SDK i autoryzacji sesyjnej.
- `tests/domain.test.mjs` — aktualizacja testu SHA-256 pod kody zaproszeń i klucze API.
- `docs/IMPLEMENTATION_STATUS.md` — zaktualizowany rejestr wykonania.

---

## 5. Sprawdzenia i dowody weryfikacyjne

### 1. Test braku zabronionych atrap i tokenów (Grep audit)
```bash
grep -rn -E "synthetic|fallback|DEMO_USER_ID|globalStore" src/
```
**Wynik:** Kod wyjścia `1` (dokładnie **0** trafień).

### 2. Kompilacja TypeScript (`typecheck`)
```bash
npm run typecheck
```
**Wynik:**
```
> alterja@1.0.0 typecheck
> tsc --noEmit
# Kod wyjścia: 0 (zero błędów)
```

### 3. Linter (`next lint`)
```bash
npm run lint
```
**Wynik:**
```
✔ No ESLint warnings or errors
# Kod wyjścia: 0
```

### 4. Zestaw testów jednostkowych (`node --test`)
```bash
npm test
```
**Wynik:**
```
▶ AlterJa Domain and Epistemic Integrity Tests (7 testów) - zaliczone
▶ AlterJa Multi-Tenant Data Isolation and Auth Tests (3 testy) - zaliczone
▶ AlterJa Proactivity Engine Tests (Zasada Kardynalna nr 7) (4 testy) - zaliczone
ℹ tests 14
ℹ suites 3
ℹ pass 14
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ duration_ms 106.78ms
# Kod wyjścia: 0
```

### 5. Produkcyjny build Next.js (`npm run build`)
```bash
npm run build
```
**Wynik:**
```
✓ Compiled successfully in 6.2s
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (26/26)
✓ Collecting build traces
✓ Finalizing page optimization
# Wszystkie 26 tras skompilowane pomyślnie. Kod wyjścia: 0
```

---

## 6. Zauważone, nieruszone
- Do uruchomienia produkcyjnego streamingu odpowiedzi wymagane jest podanie zmiennej środowiskowej `GEMINI_API_KEY` w panelu Vercel (przy jej braku endpointy zwracają czytelny komunikat błędu z kodem `503 MODEL_UNAVAILABLE` zamiast fabrykować fikcyjne odpowiedzi).
- W panelu Supabase należy zaaplikować nową migrację `supabase/migrations/20260930000001_rebuild_foundations.sql`, aby utworzyć tabelę `invitations` i zasiać kody startowe (`ALTERJA-FOUNDER-2026`, `ALTERJA-ALPHA-2026`).

---

## 7. Stan repozytorium
- **Gałąź:** `main`
- **Wszystkie zmiany zweryfikowane:** 14/14 testów przechodzi, kompilacja czysta.
