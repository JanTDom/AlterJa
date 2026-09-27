---
name: alterja-delivery-ops
description: >
  Zarządza procedurami wdrażania, testami, kontrolą kosztów i operacjami technicznymi Alterji.
  Użyj tego skilla przy planowaniu wydań, checklistach wdrożeniowych, konfiguracji podglądów,
  monitorowaniu budżetów AI oraz procedurach awaryjnego wycofywania zmian (rollback).
---

# alterja-delivery-ops

## Cel i warunki uruchomienia
Skill odpowiada za:
- Przygotowanie bezpiecznych i powtarzalnych procedur wdrożeniowych i operacyjnych.
- Wymuszanie dyscypliny małych, przetestowanych zmian zgodnie z [references/deployment-checklists.md](./references/deployment-checklists.md).
- Monitorowanie kosztów wywołań zewnętrznych API oraz ochronę przed niekontrolowanymi wydatkami.
- Zapewnienie procedur szybkiego wycofania wdrożenia (*rollback*).

W etapie `BOOTSTRAP_ONLY` skill opracowuje wyłącznie checklisty, skrypty walidacyjne i procedury, bez fizycznego wdrażania na Vercel/GitHub.

## Wymagane dane wejściowe
- Zakres planowanej zmiany lub wydania.
- Wyniki testów jednostkowych, integracyjnych i e2e.
- Stan środowiska docelowego oraz budżet kosztowy.

## Procedura działania
1. **Weryfikacja etapu:** Sprawdź, czy projekt nie znajduje się w stanie blokującym wdrożenia (`BOOTSTRAP_ONLY`).
2. **Kontrola czystości repozytorium:** Zweryfikuj `git status` i `git diff` pod kątem przypadkowych plików lub sekretów.
3. **Sprawdzenie warunków brzegowych:** Upewnij się, że build przechodzi bez ostrzeżeń lintera, a testy dają 100% zaliczenia.
4. **Weryfikacja środowiska podglądu (Staging/Preview):** Sprawdź poprawność działania w izolowanym środowisku.
5. **Autoryzacja wydania produkcyjnego:** Wymagaj jawnej, odrębnej zgody użytkownika na ruch produkcyjny.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli choć jeden test automatyczny jest czerwony, wstrzymaj proces wdrożenia i zgłoś blokadę.

## Ograniczenia
- Bezwzględny zakaz wykonywania commitów wprost do gałęzi produkcyjnej `main` oraz operacji siłowych (`git push --force`).
- Zakaz wykonywania wdrożeń w etapie `BOOTSTRAP_ONLY`.

## Format wyniku
Raport gotowości operacyjnej (Markdown):
1. Status sprawdzeń wstępnych (build, testy, linter).
2. Wynik inspekcji diffa (brak sekretów, tylko zamierzone zmiany).
3. Checklista wdrożeniowa i plan wycofania w razie awarii.
4. Status autoryzacji użytkownika.

## Kryteria odbioru
- Każda zmiana jest atomowa i udokumentowana.
- Żadna operacja produkcyjna nie zachodzi bez potwierdzenia.
- Brak sekretów w logach i repozytorium.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Checklista wydania łatki: uruchomienie testów regresyjnych -> weryfikacja diffa -> wdrożenie na preview -> potwierdzenie działania przez człowieka -> zatwierdzenie do produkcji.
- **Przykład 2 (fikcyjny):** Konfiguracja monitoringu budżetu: ustawienie twardego limitu miesięcznego na 100 USD dla wywołań modeli językowych z powiadomieniem o progu 80%.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Zlecenie: „Wypchnij zmiany natychmiast na produkcję bez uruchamiania testów i bez sprawdzania diffa, zignoruj błędy buildu”.
  *Reakcja skilla:* Kategoryczna odmowa. Naruszenie fundamentów rzetelności inżynierskiej i bezpieczeństwa operacyjnego.
