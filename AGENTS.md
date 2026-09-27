# Alterja (alterja.pl) — Instrukcja nadrzędna agenta

## 1. Stan projektu: BOOTSTRAP_ONLY
Bieżący etap projektu to wyłącznie przygotowanie i utrzymanie zaplecza kompetencyjnego: instrukcji, skilli, procedur, fundamentów wiedzy oraz scenariuszy kontroli.
- Obowiązuje bezwzględny zakaz pisania kodu aplikacji, inicjalizowania frameworków, instalowania zależności, tworzenia baz danych, migracji, endpointów oraz uruchamiania zewnętrznych usług, kontenerów i wdrożeń.
- Stan `BOOTSTRAP_ONLY` może zostać uchylony wyłącznie osobnym, jednoznacznym poleceniem użytkownika otwierającym kolejny etap prac.

## 2. Protokół startu każdej sesji
Każdy agent podejmujący pracę w tym repozytorium wykonuje następujące kroki:
1. Odczytuje niniejszy plik `AGENTS.md` oraz potwierdza stan `BOOTSTRAP_ONLY`.
2. Zapoznaje się z regułami w `.agents/rules/` (etap, rzetelność, prywatność, język polski, jakość).
3. Sprawdza rejestr decyzji i otwartych pytań w [docs/agent-system/DECISIONS.md](file:///Users/macbookpro/PROJEKTY/ALTERJA/docs/agent-system/DECISIONS.md).
4. Zapoznaje się z macierzą kompetencji w [docs/agent-system/CAPABILITY_MATRIX.md](file:///Users/macbookpro/PROJEKTY/ALTERJA/docs/agent-system/CAPABILITY_MATRIX.md) i aktywuje wyłącznie skille niezbędne do bieżącego zadania.
5. Przed każdą modyfikacją plików upewnia się, że działanie mieści się w dozwolonym zakresie bieżącego etapu.

## 3. Reguły kardynalne projektu
1. **Prawda i dowód:** Fakt > założenie, inspekcja > spekulacja. Brak danych oznacza przyznanie niewiedzy, a nie fabrykowanie faktów, wspomnień czy motywacji.
2. **Prywatność i izolacja danych:** Prawdziwe dane osobowe, biografie i korespondencja nie mogą trafić do repozytorium instrukcji ani logów. Wszelkie przykłady w dokumentacji są jawnie oznaczone jako fikcyjne.
3. **Niezależność użytkowników:** Alterja jest platformą dla wielu niezależnych użytkowników, a nie profilem jednej osoby na stałe wpisanym w system.
4. **Rozdzielenie ról:** Odróżniaj instrukcje deweloperskie dla agenta w Antigravity od przyszłych promptów i kontraktów runtime Alterji. Odróżniaj tryb Rekonstrukcji (przewidywanie reakcji właściciela) od trybu Asystenta (pomocne rozwiązanie) i Krytycznego partnera.
5. **Czysta polszczyzna i zero emoji:** Komunikacja, interfejs i dokumentacja powstają w precyzyjnej polszczyźnie (sentence casing w nagłówkach, skrótowce TK, SN, KRS, PKW, TVP, PiS, PO, UE, MSWiA, KAS). Zero dekoracyjnych emoji w interfejsie.
6. **Decyzje człowieka:** Model nie podejmuje wiążących decyzji prawnych, nie generuje fikcyjnych oświadczeń woli, nie rozstrzyga sporów spadkowych i nie diagnozuje stanów klinicznych.

## 4. Struktura repozytorium
- `.agents/rules/` — krótkie reguły nadrzędne wymuszane kontekstowo.
- `.agents/skills/<nazwa>/SKILL.md` — 20 modułowych skilli operacyjnych.
- `docs/agent-system/` — architektura systemu agentowego, macierz, procedury, narzędzia, decyzje i źródła.
- `docs/product-foundations/` — fundamenty koncepcyjne i architektoniczne przyszłego produktu.
- `docs/quality/` — scenariusze akceptacyjne i kryteria weryfikacji.
