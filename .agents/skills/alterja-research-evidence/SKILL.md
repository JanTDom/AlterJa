---
name: alterja-research-evidence
description: >
  Weryfikuje źródła pierwotne, dowody naukowe, specyfikacje techniczne i normy w Alterji.
  Użyj tego skilla przy sprawdzaniu dokumentacji API, analizie publikacji psychologicznych,
  audycie cytatów prawnych (RODO, AI Act), zasad językowych RJP i rejestracji dowodów.
---

# alterja-research-evidence

## Cel i warunki uruchomienia
Skill odpowiada za:
- Weryfikację założeń i twierdzeń w oparciu o źródła pierwotne i dokumentację techniczną.
- Prowadzenie rejestru źródeł projektu zgodnie z [references/evidence-framework.md](./references/evidence-framework.md).
- Odróżnianie wiedzy zweryfikowanej od założeń i spekulacji.
- Zapewnienie, że brak możliwości weryfikacji skutkuje oznaczeniem „stan nieznany / niezweryfikowany”, a nie fabrykowaniem faktów.

Uruchamiaj przy analizie prawnej, cytowaniu literatury naukowej, weryfikacji parametrów technicznych bibliotek i kontroli twierdzeń.

## Wymagane dane wejściowe
- Teza, parametr techniczny lub artykuł do zweryfikowania.
- Wskazanie źródła (link, numer normy, identyfikator publikacji).
- Kontekst zastosowania w projekcie Alterja.

## Procedura działania
1. **Identyfikacja źródła pierwotnego:** Odszukaj oficjalny dokument, specyfikację lub akt prawny.
2. **Ekstrakcja i porównanie:** Porównaj twierdzenie robocze z dosłownym brzmieniem w źródle pierwotnym.
3. **Ocena aktualności:** Sprawdź datę publikacji, wersję specyfikacji lub stan prawny (np. normy RJP od 2026 r.).
4. **Odnotowanie ograniczeń:** Zdefiniuj, co dokładnie źródło potwierdza, a czego nie wolno z niego wywodzić.
5. **Aktualizacja rejestru źródeł:** Zapisz wpis w `docs/agent-system/SOURCES.md`.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli dostęp do pełnej treści źródła jest niemożliwy lub zablokowany, zapisz stan: „Niezweryfikowane z powodu braku dostępu do źródła pierwotnego”.

## Ograniczenia
- Zakaz wymyślania parametrów technicznych, fałszowania cytatów lub przypisywania autorom wniosków, których nie sformułowali.
- Zakaz przenoszenia wyników badań akademickich do deklaracji marketingowych bez zastrzeżeń metodologicznych.

## Format wyniku
Nota dowodowa (Markdown):
1. Badane twierdzenie lub parametr.
2. Źródło pierwotne (tytuł, autor, data, identyfikator).
3. Dosłowny cytat lub wyciąg z dokumentacji.
4. Ocena wiarygodności i zakres zastosowania w Alterji.

## Kryteria odbioru
- Wszystkie cytaty i odwołania są autentyczne i weryfikowalne.
- Brak zmyślonych adresów URL czy nieistniejących parametrów funkcji.
- Rejestr źródeł zawiera datę sprawdzenia.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Weryfikacja zakresu uprawnień Gmail API: sprawdzenie w oficjalnej dokumentacji Google, że zakres `gmail.readonly` wymaga przejścia audytu bezpieczeństwa aplikacji (*restricted scope*).
- **Przykład 2 (fikcyjny):** Weryfikacja statusu prawnego RODO: sprawdzenie motywu 27 rozporządzenia 2016/679 i odnotowanie, że RODO nie ma zastosowania do danych osób zmarłych, lecz nie wyłącza ochrony praw osób żyjących występujących w tych samych materiałach.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Polecenie: „Wymyśl cytat z profesora psychologii potwierdzający, że Alterja jest w 100% bezpieczna dla każdego człowieka”.
  *Reakcja skilla:* Kategoryczna odmowa. Bezwzględny zakaz fabrykowania cytatów, opinii eksperckich i fałszywych autorytetów.
