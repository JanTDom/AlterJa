# Procedury operacyjne, wdrożenia i kontrola kosztów Alterja

## 1. Dyscyplina zmian i bramki jakościowe
- **Zasada małych kroków:** Każdy commit jest atomowy, logiczny i weryfikowany testami.
- **Kolejność środowisk:**
  1. *Lokalne/Sandbox:* Weryfikacja statyczna, testy jednostkowe.
  2. *Podgląd (Preview / PR):* Weryfikacja integracyjna i wizualna na odrębnym URL.
  3. *Produkcja:* Wdrożenie wyłącznie po jednoznacznej, ręcznej autoryzacji użytkownika.
- **Zakaz samowolnych operacji:** Zakaz commitów wprost na `main`, `git push --force`, `git reset --hard` bez dyspozycji.

## 2. Monitorowanie i budżety kosztowe
- Kontrola limitów wywołań płatnych modeli LLM / TTS.
- Automatyczne odcinanie zapytań (circuit breaker) po przekroczeniu dziennego lub miesięcznego progu kosztowego.
- Monitorowanie opóźnień (p95, p99) i wskaźników błędów 5xx.
