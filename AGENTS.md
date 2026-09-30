# Alterja (alterja.pl) — Instrukcja nadrzędna agenta

## 1. Stan projektu: BUILD_AND_DEPLOY
Bieżący etap projektu to **BUILD_AND_DEPLOY** (autoryzowany przez właściciela dnia 2026-09-27).
- Wszelkie wcześniejsze ograniczenia etapu `BOOTSTRAP_ONLY` zakazujące budowy aplikacji, inicjalizowania narzędzi, instalowania zależności, tworzenia bazy danych i wdrażania zostają zniesione.
- Obowiązuje pełna autonomia wykonawcza w zakresie architektury, implementacji kodu, testów, konfiguracji bazy danych Supabase oraz wdrożenia na Vercel i GitHub.
- Nienaruszalne pozostają: reguły prywatności, rzetelności epistemicznej (brak halucynacji), psychologii (brak autodiagnoz), standardu języka polskiego (zero dekoracyjnych emoji, sentence casing) oraz bezpieczeństwa (deterministyczna kontrola dostępu poza LLM, brak sekretów w logach i klientach).

## 2. Protokół startu sesji
1. Odczytanie niniejszego pliku `AGENTS.md` oraz potwierdzenie stanu `BUILD_AND_DEPLOY`.
2. Zapoznanie się z regułami w `.agents/rules/` i wytycznymi technicznymi.
3. Sprawdzenie rejestru decyzji i bieżącego statusu w [docs/IMPLEMENTATION_STATUS.md](file:///Users/macbookpro/PROJEKTY/ALTERJA/docs/IMPLEMENTATION_STATUS.md).
4. Praca iteracyjna: małe commity, testy weryfikacyjne, brak atrapowych funkcji w widokach produkcyjnych.

## 3. Reguły kardynalne projektu
1. **Prawda i dowód:** Fakt > założenie, inspekcja > spekulacja. Brak danych oznacza przyznanie niewiedzy, a nie fabrykowanie faktów, wspomnień czy motywacji.
2. **Prywatność i izolacja danych:** Prawdziwe dane osobowe, biografie i korespondencja nie mogą trafić do repozytorium instrukcji ani logów. Wszelkie dane demonstracyjne są jawnie oznaczone jako fikcyjne.
3. **Niezależność użytkowników:** Alterja jest platformą wielodostępną; każdy rekord danych podlega izolacji Row Level Security (RLS).
4. **Rozdzielenie ról i trybów:** Wyraźne rozróżnienie trybu Rekonstrukcji (przewidywanie reakcji właściciela na podstawie dowodów), trybu Asystenta (obiektywna pomoc) oraz trybu Krytycznego partnera.
5. **Czysta polszczyzna i zero emoji:** Komunikacja, interfejs i dokumentacja powstają w precyzyjnej polszczyźnie (sentence casing w nagłówkach, skrótowce TK, SN, KRS, PKW, TVP, PiS, PO, UE, MSWiA, KAS). Zero dekoracyjnych emoji w interfejsie.
6. **Decyzje człowieka:** Model nie podejmuje wiążących decyzji prawnych, nie generuje fikcyjnych oświadczeń woli, nie rozstrzyga sporów spadkowych i nie diagnozuje stanów klinicznych.
7. **Proaktywność:** Użytkownik nigdy nie ma się zastanawiać, co dać aplikacji. Aplikacja wie, czego jej brakuje, i sama o to prosi — konkretnie, w odpowiednim momencie, z uzasadnieniem. Każdy widok i endpoint jest oceniany pod kątem proaktywnego domykania luk poznawczych.

## 4. Zasoby docelowe
- **Repozytorium:** `https://github.com/JanTDom/AlterJa`
- **Domena kanoniczna:** `alterja.pl`
- **Platformy:** GitHub, Supabase, Vercel, Google Gemini
