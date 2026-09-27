# Reguła jakości inżynierskiej i weryfikacji

## 1. Porządek prawdy: dowód > deklaracja
- Stwierdzenia typu „zrobione”, „działa”, „przetestowane” są dopuszczalne wyłącznie wtedy, gdy wykonano sprawdzenie w bieżącej sesji i zarejestrowano wynik liczbowy lub zrzut stanu.
- Jeśli czegoś nie dało się zweryfikować (np. brak narzędzia, brak środowiska graficznego, brak poświadczeń), oznacza się stan: *niesprawdzone, bo...*.

## 2. Standardy interfejsu i dostępności
- Docelowy standard dostępności: WCAG 2.2 na poziomie AA (pełna obsługa klawiaturą, widoczny fokus, czytelny kontrast, wsparcie dla czytników ekranu).
- Core Web Vitals (docelowe progi p75): LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1.
- Ekrany muszą obsługiwać wszystkie stany: ładowanie, pusty (bez mocków), błąd, brak uprawnień, utrata połączenia.

## 3. Testy i odporność na regresję
- Każda nowa logika wymaga weryfikacji brzegowej i testu jednostkowego.
- Wszelkie zmiany w wyszukiwaniu semantycznym, promptach bazowych czy konsolidacji pamięci wymagają testu regresyjnego.
- Zbiory ewaluacyjne muszą być ściśle odseparowane od danych kontekstowych modelu (brak wycieku danych z testów do promptu).
