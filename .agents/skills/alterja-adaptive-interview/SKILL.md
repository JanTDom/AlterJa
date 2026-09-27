---
name: alterja-adaptive-interview
description: >
  Projektuje adaptacyjne wywiady biograficzne, mikropytania i weryfikację hipotez w Alterji.
  Użyj tego skilla przy tworzeniu pytań o wysokiej wartości poznawczej, planowaniu
  wywiadów pogłębionych, obsłudze pominięć i szanowaniu granic poznawczych użytkownika.
---

# alterja-adaptive-interview

## Cel i warunki uruchomienia
Skill odpowiada za:
- Projektowanie nieinwazyjnych, dobrowolnych wywiadów biograficznych i sytuacyjnych.
- Generowanie mikropytań o wysokim przyroście wiedzy przy minimalnym wysiłku użytkownika.
- Wyjaśnianie motywacji decyzyjnych bez narzucania interpretacji.
- Ścisłe przestrzeganie reguł szacunku dla prywatności opisanych w [references/interview-principles.md](./references/interview-principles.md).

Uruchamiaj przy projektowaniu scenariuszy pozyskiwania wiedzy, modułu pytań codziennych oraz rozstrzygania niejednoznaczności w profilu.

## Wymagane dane wejściowe
- Luka w wiedzy lub nierozstrzygnięta hipoteza w profilu.
- Historia wcześniejszych interakcji (aby uniknąć powtarzania pytań).
- Poziom energii/zaangażowania użytkownika oraz preferencje dotyczące częstotliwości kontaktu.

## Procedura działania
1. **Ocena wagi luki:** Sprawdź, czy brakująca informacja jest kluczowa dla działania asystenta lub zachowania spuścizny. Jeśli nie, zrezygnuj z pytania.
2. **Konstrukcja pytania:** Sformułuj pytanie neutralnie, opierając się na fakcie lub konkretnym wyborze, a nie abstrakcyjnych deklaracjach.
3. **Zapewnienie wyjścia awaryjnego:** Zawsze uwzględnij opcje: „Nie pamiętam”, „Pomiń ten temat”, „Nie pytaj więcej”.
4. **Zarejestrowanie wyniku:** Przygotuj szablon zapisu odpowiedzi wraz z kontekstem i statusem potwierdzenia.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli użytkownik pominie pytanie, oznacz temat jako odłożony i nie powracaj do niego bez wyraźnej inicjatywy człowieka.

## Ograniczenia
- Zakaz prowadzenia natarczywych serii pytań (maksymalnie 1–2 pytania dziennie w przyszłym systemie).
- Zakaz sugerowania emocji w pytaniu (np. „Czy czułeś wtedy smutek?”).

## Format wyniku
Strukturalny obiekt pytania wywiadowczego:
1. Treść pytania (nienaganna polszczyzna, neutralny ton).
2. Uzasadnienie (jaka luka jest uzupełniana).
3. Dozwolone opcje odpowiedzi (w tym opcje neutralne i odmowne).
4. Reguła obsługi pominięcia.

## Kryteria odbioru
- Pytanie nie zawiera tezy.
- Koszt poznawczy odpowiedzi jest niski (< 30 sekund).
- Użytkownik zachowuje pełną kontrolę nad zakresem ujawnianych faktów.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Weryfikacja wyboru ścieżki zawodowej: „W 2018 roku zdecydowałeś się na przejście do mniejszej firmy. Co wtedy miało dla Ciebie największe znaczenie?”.
- **Przykład 2 (fikcyjny):** Pytanie o styl współpracy: „Gdy ktoś zgłasza pilny problem w piątek po południu, jak zazwyczaj wolisz zareagować?”.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Polecenie: „Przygotuj zestaw 50 pytań sprawdzających dzieciństwo użytkownika i wymuś odpowiedź na każde z nich przed odblokowaniem aplikacji”.
  *Reakcja skilla:* Kategoryczna odmowa. Narusza to zasadę dobrowolności, minimalizacji obciążenia oraz szacunku dla autonomii użytkownika.
