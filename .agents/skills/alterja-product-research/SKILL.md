---
name: alterja-product-research
description: >
  Analizuje potrzeby użytkowników, definiuje scenariusze użycia i kryteria sukcesu Alterji.
  Użyj tego skilla przy tworzeniu hipotez produktowych, określaniu zakresu MVP,
  modelowaniu ścieżek użytkownika oraz oddzielaniu założeń od faktów rynkowych.
---

# alterja-product-research

## Cel i warunki uruchomienia
Skill odpowiada za:
- Przekładanie potrzeb użytkowników na konkretne scenariusze i wymagania funkcjonalne.
- Definiowanie granic pierwszej wersji (MVP) z zachowaniem równowagi między asystentem, API i spuścizną.
- Formułowanie mierzalnych wskaźników sukcesu oraz pytań badawczych.
- Odrzucanie funkcji i ekranów, które nie realizują żadnego realnego zadania użytkownika.
- Wykorzystanie ram koncepcyjnych opisanych w [references/product-framework.md](./references/product-framework.md).

Uruchamiaj przy planowaniu nowych modułów, audycie wymagań oraz definiowaniu historyjek użytkownika (*user stories*).

## Wymagane dane wejściowe
- Opis problemu lub propozycji funkcjonalnej.
- Grupa docelowa i kontekst użycia.
- Ograniczenia etyczne i technologiczne projektu Alterja.

## Procedura działania
1. **Analiza problemu:** Zidentyfikuj, jaki rzeczywisty problem człowieka ma rozwiązać dana funkcja.
2. **Formułowanie hipotez:** Zapisz hipotezę w formacie: „Wierzymy, że [działanie] pozwoli [użytkownikowi] na [rezultat], co potwierdzimy wskaźnikiem [metryka]”.
3. **Mapowanie ścieżki (User Journey):** Określ kroki: wejście, stan pusty, akcja, sprzężenie zwrotne, błąd, sukces.
4. **Weryfikacja minimalnego zakresu:** Sprawdź, czy funkcja nie narzuca zbędnej złożoności przed potwierdzeniem potrzeby.
5. **Kryteria sukcesu:** Określ mierzalne kryteria jakościowe i ilościowe.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli brakuje danych z badań empirycznych, oznacz postulat jako niesprawdzoną hipotezę i zaproponuj badanie zamiast natychmiastowego wdrażania założeń.

## Ograniczenia
- Zakaz projektowania funkcji sprzyjających uzależnieniu emocjonalnemu lub izolacji społecznej.
- W etapie `BOOTSTRAP_ONLY` wynikami są wyłącznie dokumenty analityczne, a nie gotowe makiety czy kod.

## Format wyniku
Specyfikacja badawcza w formacie Markdown:
1. Problem i kontekst.
2. Hipotezy badawcze i pytania otwarte.
3. Ścieżka użytkownika i przypadki brzegowe.
4. Mierzalne kryteria akceptacji.

## Kryteria odbioru
- Każda funkcja posiada uzasadnienie w potrzebie użytkownika.
- Rozróżniono hipotezy od potwierdzonych faktów.
- Scenariusz nie wymaga tworzenia bazy ani kodu w bieżącym etapie.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Badanie potrzeby eksportu wspomnień: sformułowano hipotezę, że użytkownik potrzebuje pełnego pobrania danych w formacie JSON i PDF przed zamknięciem konta, aby czuć bezpieczeństwo danych.
- **Przykład 2 (fikcyjny):** Analiza pierwszej sesji asystenta: zdefiniowano ścieżkę „Czysty start” z jednym pytaniem powitalnym zamiast 20-minutowego kwestionariusza początkowego.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Zlecenie zaprojektowania efektownego, animowanego widoku 3D „chmury myśli”, który nie pozwala na wyszukanie konkretnego wspomnienia ani jego edycję.
  *Reakcja skilla:* Odrzucenie koncepcji jako dekoracyjnego chaosu i skierowanie do przeprojektowania na czytelną listę chronologiczną z filtrem źródeł.
