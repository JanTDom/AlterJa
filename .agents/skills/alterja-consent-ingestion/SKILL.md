---
name: alterja-consent-ingestion
description: >
  Projektuje procedury bezpiecznego pozyskiwania danych, zarządzania zgodami i importu w Alterji.
  Użyj tego skilla przy definiowaniu kontraktów importu plików, filtracji wypowiedzi osób trzecich,
  obsłudze praw autorskich, wykrywaniu treści AI i konfigurowaniu podglądu importu.
---

# alterja-consent-ingestion

## Cel i warunki uruchomienia
Skill odpowiada za:
- Projektowanie bezpiecznego procesu zasilania modelu w autoryzowane teksty, nagrania i dokumenty.
- Weryfikację podstaw prawnych przetwarzania i granularnych zgód.
- Rozdzielanie treści własnych od materiałów osób trzecich i generacji AI zgodnie z [references/ingestion-protocol.md](./references/ingestion-protocol.md).
- Zapewnienie pełnego podglądu importu przed utrwaleniem danych.

Uruchamiaj przy projektowaniu modułów importu (poczta, czaty, notatki, pliki audio) oraz reguł weryfikacji zgody.

## Wymagane dane wejściowe
- Typ i metadane źródła (format, data, deklarowany autor).
- Zakres zgody udzielonej przez użytkownika.
- Wykaz potencjalnych podmiotów trzecich w materiale.

## Procedura działania
1. **Weryfikacja zakresu zgody:** Sprawdź, czy operacja mieści się w aktywnym zezwoleniu użytkownika.
2. **Filtracja autorstwa:** Wyizoluj fragmenty autorstwa właściciela profilu; oznacz lub usuń wypowiedzi rozmówców.
3. **Detekcja treści syntetycznych i cytatów:** Zidentyfikuj fragmenty skopiowane z zewnętrznych źródeł lub generowane przez AI.
4. **Przygotowanie podglądu:** Zbuduj dla użytkownika podsumowanie: liczba dokumentów, wykryci autorzy, proponowane wykluczenia.
5. **Generowanie kontraktu importu:** Zapisz metadane pochodzenia dla każdego zatwierdzonego elementu.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli nie ma pewności co do autorstwa danego fragmentu, oznacz go jako sporny i wstrzymaj ekstrakcję do momentu decyzji użytkownika.

## Ograniczenia
- Zakaz automatycznego importowania całych skrzynek pocztowych lub folderów w chmurze bez preselekcji i podglądu.
- W etapie `BOOTSTRAP_ONLY` tworzone są wyłącznie specyfikacje i reguły walidacji, bez fizycznego pobierania danych.

## Format wyniku
Kontrakt importu w formacie JSON/Markdown:
1. Identyfikator partii i deklarowany cel.
2. Zakresy zgód (czas, źródła, zastosowanie).
3. Reguły wykluczeń i filtrów.
4. Kryteria akceptacji podglądu przez użytkownika.

## Kryteria odbioru
- Wyraźne rozdzielenie wypowiedzi właściciela od osób trzecich.
- Możliwość wybiórczego cofnięcia importu partii materiałów.
- Brak sekretów i prywatnych danych w konfiguracji.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Import wątku mailowego: skill wyodrębnia wiadomości wysłane przez użytkownika, a odpowiedzi kontrahenta oznacza jako kontekst zewnętrzny niewchodzący do profilu stylu.
- **Przykład 2 (fikcyjny):** Weryfikacja pliku z notatkami: skill identyfikuje cytat z książki filozoficznej i przypisuje mu etykietę „cytat referencyjny”, a nie „osobisty pogląd”.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Zlecenie: „Zaimportuj całą historię korespondencji z komunikatora rodzinnego wraz ze zdjęciami wszystkich uczestników bez ich wiedzy”.
  *Reakcja skilla:* Odmowa realizacji. Naruszenie prywatności osób trzecich, brak podstawy prawnej i brak zgód uczestników korespondencji.
