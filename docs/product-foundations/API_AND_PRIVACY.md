# Architektura API, prywatność i bezpieczeństwo Alterja

## 1. Filozofia API: Udostępnianie zdolności, nie tożsamości
API Alterji umożliwia zewnętrznym aplikacjom korzystanie z precyzyjnie określonych funkcji cyfrowego modelu osoby bez narażania na ujawnienie pełnej biografii czy bazy wspomnień.

### Granularne profile udostępniania (Scopes)
- `persona:style:transform` — prawo do redagowania tekstu w stylu właściciela bez wglądu w fakty życiowe.
- `persona:memory:query:work` — zapytania do wspomnień wyłącznie ze sfery zawodowej z określonych lat.
- `persona:availability:check` — zapytanie o preferowane ramy czasowe spotkań bez ujawniania kalendarza.
- `persona:reconstruction:interactive` — ograniczona liczba interakcji z symulacją w wyznaczonym kontekście.

### Standardy techniczne i autoryzacja
- **Specyfikacja:** OpenAPI 3.1 ze ścisłymi kontraktami wejścia/wyjścia (walidacja schematów Zod/TypeBox).
- **Protokół autoryzacji:** OAuth 2.0 z wytycznymi bezpieczeństwa RFC 9700 (Proof Key for Code Exchange - PKCE, krótko żyjące tokeny, rotacja refresh tokenów).
- **Zasada Zero-Trust:** Sam identyfikator użytkownika przekazany w parametrze nie daje uprawnień. Uprawnienie weryfikowane jest kryptograficznie w podpisie JWT.
- **Idempotencja i budżety:** Obowiązkowe nagłówki `Idempotency-Key` dla mutacji oraz automatyczne odcinanie zapytań (*rate limiting*) i budżetów tokenowych.

---

## 2. Prywatność i bezpieczeństwo w fazie projektowania (Privacy by Design)
Prywatność stanowi nienaruszalny fundament architektoniczny Alterji, zoptymalizowany pod kątem europejskich regulacji RODO (GDPR) oraz Aktu w sprawie AI (EU AI Act).

### Izolacja wielodostępna i reguły bazy danych
- **Separacja na poziomie silnika bazy danych:** Każda tabela zawiera `user_id uuid references auth.users not null`.
- **Row Level Security (RLS):** Uprawnienia egzekwowane w PostgreSQL przez polityki RLS (`USING (auth.uid() = user_id)`). Model językowy nie podejmuje decyzji o dostępie do danych.
- **Wyszukiwanie wektorowe:** Wyszukiwanie pgvector HNSW z twardym filtrem `WHERE user_id = auth.uid()` wbudowanym w funkcję bazy.
- **Ochrona sekretów:** Zakaz umieszczania klucza `service_role` we frontendzie; sekrety administracyjne dostępne wyłącznie w zabezpieczonym backendzie.

### Ochrona przed zagrożeniami LLM (OWASP Top 10 for LLM)
- **Obrona przed Prompt Injection (LLM01):** Wszystkie importowane dokumenty, maile i notatki są traktowane wyłącznie jako dane pasywne w formacie tekstowym. Żadne instrukcje ukryte w treści dokumentu nie mają prawa zmienić zasad systemowych ani wywołać nieautoryzowanych narzędzi.
- **Ochrona promptu systemowego (LLM07):** Prompty nadrzędne nie zawierają żadnych poufnych danych osobowych innych użytkowników ani kluczy API.
- **Usuwanie danych (Prawo do bycia zapomnianym):** Procedura kaskadowego usuwania trwale kasuje rekordy relacyjne, embeddingi wektorowe z indeksu oraz pliki ze storage bez pozostawiania osieroconych kopii.
