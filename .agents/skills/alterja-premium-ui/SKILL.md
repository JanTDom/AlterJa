---
name: alterja-premium-ui
description: >
  Projektuje zaawansowane układy, przepływy użytkownika i stany interfejsu w Alterji.
  Użyj tego skilla przy tworzeniu architektury informacji widoków, systemów tokenów,
  projektowaniu stanów pustych i błędów, kompozycji ekranów oraz ergonomii interakcji.
---

# alterja-premium-ui

## Cel i warunki uruchomienia
Skill odpowiada za:
- Projektowanie kompletnych przepływów użytkownika (od pierwszego wejścia po zarządzanie spuścizną).
- Opracowywanie systemów tokenów projektowych zgodnie z [references/ui-tokens-system.md](./references/ui-tokens-system.md).
- Gwarantowanie, że każdy widok posiada dopracowane wszystkie stany (pusty, ładowanie, błąd, sukces).
- Zapewnienie intuicyjności kluczowych operacji (audyt źródeł, korekta, cofnięcie udostępnienia).

Uruchamiaj przy projektowaniu struktury widoków, specyfikacji komponentów i audycie użyteczności.

## Wymagane dane wejściowe
- Scenariusz użytkownika i zadanie do wykonania.
- Tokeny i wytyczne marki z `alterja-brand-art-direction`.
- Ograniczenia urządzeń (mobilne, stacjonarne).

## Procedura działania
1. **Analiza zadania:** Zidentyfikuj główny cel użytkownika na danym ekranie.
2. **Architektura informacji:** Ułóż elementy według hierarchii ważności, eliminując zbędne ozdobniki.
3. **Projektowanie stanów:** Zdefiniuj wygląd dla stanu pustego, wczytywania, błędu i pełnych danych.
4. **Weryfikacja ergonomii:** Upewnij się, że operacje destrukcyjne (usunięcie wspomnienia) wymagają potwierdzenia, a operacje krytyczne mają czytelne cofnięcie.
5. **Dostosowanie do urządzeń:** Zaprojektuj spójny układ dla ekranów smartfonów, tabletów i monitorów.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli nie wiadomo, jak użytkownik zareaguje na dany układ, wybierz wariant prostszy, o wyższej czytelności typograficznej.

## Ograniczenia
- Zakaz prezentowania fałszywych wskaźników postępu lub fikcyjnych recenzji.
- W etapie `BOOTSTRAP_ONLY` tworzone są wyłącznie specyfikacje i makiety koncepcyjne w dokumentacji, bez kodu komponentów.

## Format wyniku
Specyfikacja interfejsu (Markdown):
1. Struktura widoku i hierarchia elementów.
2. Definicja stanów (Empty, Loading, Error, Success).
3. Przepływ interakcji krok po kroku.
4. Zastosowane tokeny (kolory, typografia, odstępy).

## Kryteria odbioru
- Kompletność stanów (brak niedokończonych widoków).
- Użytkownik potrafi bez instrukcji znaleźć źródło wspomnienia i skorygować je.
- Brak dekoracyjnych emoji i szablonowego wyglądu AI.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Specyfikacja ekranu „Przegląd pamięci”: lista wpisów z filtrem dat, widoczną etykietą pochodzenia i jednym przyciskiem „Edytuj lub usuń” przy każdym elemencie.
- **Przykład 2 (fikcyjny):** Projekt stanu pustego dla nowego konta: minimalistyczna karta z informacją „Twoja biblioteka jest pusta” i przyciskiem do wyboru pierwszego źródła importu.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Zlecenie zaprojektowania ekranu z ukrytym przyciskiem usunięcia konta oraz wyskakującym oknem wymuszającym zakup subskrypcji pod groźbą utraty danych.
  *Reakcja skilla:* Kategoryczna odmowa. Zakaz stosowania zwodniczych wzorców (*dark patterns*).
