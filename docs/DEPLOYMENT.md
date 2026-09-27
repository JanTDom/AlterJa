# Procedura wdrożeniowa i operacje środowiskowe (DEPLOYMENT)

## 1. Architektura wdrożenia
- **Frontend & API Routes:** Next.js (App Router) hostowany na platformie Vercel.
- **Baza danych & Storage:** Supabase PostgreSQL z Row Level Security, schematem 22 tabel i dedykowanym bucketem prywatnym.
- **AI Engine:** Google Gemini SDK (`@google/genai` / `@google/generative-ai`) wywoływany wyłącznie po stronie serwera.
- **Wersjonowanie:** GitHub (`JanTDom/AlterJa`).

## 2. Zmienne środowiskowe (Environment Variables)

### Zmienne serwerowe (NIGDY niewidoczne po stronie klienta):
- `GEMINI_API_KEY`: Klucz API do Google Gemini AI.
- `SUPABASE_SERVICE_ROLE_KEY`: Klucz administracyjny Supabase (wyłącznie dla backendowych workerów i migracji).
- `DATABASE_URL`: Bezpośrednie połączenie Postgres (dla pgboss / narzędzi migracyjnych).
- `API_AUTH_SECRET`: Sól i klucz HMAC do podpisywania webhooków i weryfikacji tokenów API.

### Zmienne publiczne klienta:
- `NEXT_PUBLIC_SUPABASE_URL`: Publiczny adres projektu Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Publiczny klucz anonimowy podlegający politykom RLS.
- `NEXT_PUBLIC_APP_URL`: Kanoniczny adres aplikacji (`https://alterja.pl`).

## 3. Procedura wydania i rollbacku
1. Walidacja lokalna: `npm run lint`, `npm run typecheck`, `npm test`.
2. Budowanie: `npm run build`.
3. Commit i push na GitHub: `git push origin main`.
4. Wdrożenie na Vercel: `vercel --prod`.
5. Rollback: Natychmiastowe przywrócenie poprzedniego wdrożenia w panelu Vercel (`vercel rollback <deployment-id>`) lub wycofanie commita w git.
