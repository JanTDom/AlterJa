---
name: alterja-evaluation
description: >
  Projektuje eksperymenty ewaluacyjne, testy regresji i rygorystyczne pomiary jakości w Alterji.
  Użyj tego skilla przy tworzeniu zestawów testowych, badaniu odporności na halucynacje,
  pomiarach wierności stylu, testowaniu wycieków uprawnień i odrzucaniu fałszywych metryk.
---

# alterja-evaluation

## Cel i warunki uruchomienia
Skill odpowiada za:
- Projektowanie rzetelnych eksperymentów mierzących wierność faktograficzną, stylistyczną i bezpieczeństwo rekonstrukcji.
- Tworzenie testów regresyjnych zabezpieczających przed pogorszeniem jakości po zmianie promptów lub modeli bazowych.
- Egzekwowanie standardów naukowych i eliminację zmyślonych wskaźników procentowych zgodnie z [references/evaluation-protocol.md](./references/evaluation-protocol.md).
- Ocenę skuteczności procedur usuwania danych.

Uruchamiaj przy planowaniu testów modeli, weryfikacji zmian architektonicznych i audycie obietnic produktowych.

## Wymagane dane wejściowe
- Hipoteza badawcza lub testowany komponent.
- Reprezentatywny zbiór danych ewaluacyjnych (fikcyjne przypadki lub autoryzowane próbki).
- Zdefiniowane modele odniesienia (*baselines*).

## Procedura działania
1. **Definicja metryki:** Określ precyzyjną, operacyjną definicję mierzonej cechy (np. odsetek poprawnie zidentyfikowanych braków danych).
2. **Przygotowanie podziału danych:** Upewnij się, że zbiór testowy jest chroniony przed wyciekiem do kontekstu modelu.
3. **Konfiguracja prób ślepych i porównawczych:** Zaplanuj porównanie z modelem bazowym bez personalizacji.
4. **Wykonanie pomiaru:** Zbierz wyniki surowe wraz z rozkładem statystycznym i liczebnością próby.
5. **Raportowanie ograniczeń:** Wskaż granice ważności wniosków i potencjalne czynniki zakłócające.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli próba jest mała (np. N < 30), raportuj wyłącznie liczby bezwzględne i studia przypadków, zakazując ekstrapolacji na precyzyjne procenty.

## Ograniczenia
- Zakaz posługiwania się pojedynczym wskaźnikiem „stopnia odtworzenia osobowości”.
- Zakaz traktowania oceny innego LLM jako jedynego, ostatecznego arbitra prawdy.

## Format wyniku
Protokół eksperymentu ewaluacyjnego:
1. Pytanie badawcze i hipoteza.
2. Metodologia pomiaru i wielkość próby ($N$).
3. Wyniki surowe w porównaniu do baselines.
4. Zidentyfikowane błędy i przypadki brzegowe.
5. Ograniczenia badania.

## Kryteria odbioru
- Metodologia jest powtarzalna i odporna na wyciek danych.
- Wyniki poparte twardymi danymi liczbowymi.
- Odrzucenie pseudonaukowych twierdzeń marketingowych.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Test odporności na konfabulację: zestaw 20 pytań o zdarzenia fikcyjne; system uzyskuje wynik 20/20 odmów odpowiedzi z uzasadnieniem braku danych w źródłach.
- **Przykład 2 (fikcyjny):** Test regresji stylu: porównanie odpowiedzi na 10 standardowych maili biznesowych przed i po zmianie promptu systemowego z oceną zachowania kluczowych fraz.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Zlecenie: „Przygotuj wykres pokazujący inwestorom, że Alterja w 97,4% odtwarza ludzką świadomość”.
  *Reakcja skilla:* Kategoryczna odmowa. Wskazanie, że taki wskaźnik jest naukowo bezzasadny, niemierzalny i stanowi dezinformację rynkową.
