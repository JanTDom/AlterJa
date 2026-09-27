# Procedury operacyjne i procedury kontrolne Alterja

## 1. Bramki decyzyjne cyklu wytwórczego
Projekt porusza się wzdłuż sformalizowanych bramek. Przejście do kolejnego etapu wymaga jednoznacznej dyspozycji użytkownika:
1. **Bramka 1: Wyposażenie (BOOTSTRAP_ONLY)** — Utworzenie i weryfikacja instrukcji, skilli, procedur i testów jakościowych. Brak kodu.
2. **Bramka 2: Zakres i koncepcja produktu** — Zdefiniowanie wymagań MVP, hipotez i ścieżek użytkownika.
3. **Bramka 3: Projekt wizualny i tokeny** — Akceptacja tożsamości marki, palety OKLCH, typografii i makiet stanów.
4. **Bramka 4: Architektura i implementacja** — Kodowanie komponentów, schematów bazy i integracji API z testami jednostkowymi.
5. **Bramka 5: Weryfikacja jakościowa i audyty** — Testy WCAG 2.2 AA, Core Web Vitals, testy bezpieczeństwa OWASP i regresji AI.
6. **Bramka 6: Środowisko podglądu (Staging / Preview)** — Pełna weryfikacja działania w odizolowanym środowisku chmurowym.
7. **Bramka 7: Wydanie produkcyjne** — Odrębna, pisemna autoryzacja uruchomienia produkcyjnego.

---

## 2. Rejestr 12 procedur wykonawczych

### Procedura 1: Audyt zakresu (Scope Audit)
- **Wejście:** Nowe polecenie użytkownika.
- **Kroki:**
  1. Sprawdzenie bieżącej aktywnej bramki w `AGENTS.md`.
  2. Weryfikacja, czy polecenie nie wymaga działań zakazanych w danym etapie.
  3. Zgłoszenie ewentualnych rozbieżności.
- **Dowody:** Wpis w planie operacyjnym potwierdzający zgodność z etapem.
- **Warunek zatrzymania:** Zlecenie wykracza poza aktualny etap bez formalnej autoryzacji.
- **Wymagane uprawnienia:** Odczyt instrukcji lokalnych.

### Procedura 2: Dobór skilli (Skill Selection)
- **Wejście:** Zdekomponowane zadanie techniczne lub analityczne.
- **Kroki:**
  1. Identyfikacja perspektyw domenowych potrzebnych do zadania.
  2. Wybór maksymalnie 2–4 skilli z `docs/agent-system/CAPABILITY_MATRIX.md`.
  3. Wczytanie plików `SKILL.md` wyłącznie dla wytypowanych skilli.
- **Dowody:** Zestawienie nazw skilli z uzasadnieniem w raporcie początkowym.
- **Warunek zatrzymania:** Próba wczytania wszystkich 20 skilli naraz do jednego promptu.
- **Wymagane uprawnienia:** Odczyt `.agents/skills/`.

### Procedura 3: Weryfikacja źródeł (Evidence Verification)
- **Wejście:** Teza, norma prawna, cytat lub parametr techniczny biblioteki.
- **Kroki:**
  1. Dotarcie do źródła pierwotnego (akt prawny, RFC, oficjalna dokumentacja).
  2. Porównanie zapisu źródłowego z twierdzeniem roboczym.
  3. Zapisanie ograniczeń interpretacyjnych.
- **Dowody:** Wpis w `docs/agent-system/SOURCES.md` z datą i cytatem.
- **Warunek zatrzymania:** Źródło pierwotne jest niedostępne lub zaprzecza tezie.
- **Wymagane uprawnienia:** Dostęp do dokumentacji lub sieci w trybie pasywnym.

### Procedura 4: Kontrola psychologiczna (Psychological Boundary Check)
- **Wejście:** Wyekstrahowana preferencja, notatka biograficzna lub interpretacja zachowania.
- **Kroki:**
  1. Sprawdzenie, czy interpretacja nie stawia diagnozy klinicznej ani oceny moralnej.
  2. Oddzielenie stanu chwilowego od trwałej dyspozycji.
  3. Zaproponowanie alternatywnej interpretacji dla użytkownika.
- **Dowody:** Notatka psychologiczna zawierająca status hipotezy i alternatywy.
- **Warunek zatrzymania:** Próba etykietowania użytkownika lub diagnozowania osób trzecich.
- **Wymagane uprawnienia:** Kompetencje skilla `alterja-personality-psychology`.

### Procedura 5: Redakcja polska (Polish Editorial Review)
- **Wejście:** Dowolny tekst interfejsu, mikrotekst, dialog lub dokument.
- **Kroki:**
  1. Weryfikacja fleksji, rekcji, szyku i norm RJP 2026.
  2. Egzekwowanie sentence casing w nagłówkach i wielkich liter w skrótowcach.
  3. Usunięcie dekoracyjnych emoji i kalek korporacyjnych.
- **Dowody:** Zestawienie tekstu przed i po redakcji z wykazem zmian.
- **Warunek zatrzymania:** Tekst zawiera żargon lub sformułowania wprowadzające użytkownika w błąd.
- **Wymagane uprawnienia:** Kompetencje skilla `alterja-polish-editor`.

### Procedura 6: Przegląd importu (Ingestion Review)
- **Wejście:** Zestaw plików, korespondencji lub nagrań zgłoszonych do zasilenia modelu.
- **Kroki:**
  1. Kontrola zakresu zgody i praw autorskich.
  2. Odsianie wypowiedzi osób trzecich i treści wygenerowanych przez AI.
  3. Wygenerowanie podglądu dla użytkownika z opcją wykluczeń.
- **Dowody:** Kontrakt importu i podsumowanie zatwierdzone przez człowieka.
- **Warunek zatrzymania:** Brak zgody na przetwarzanie danych osób trzecich obecnych w materiale.
- **Wymagane uprawnienia:** Dostęp do modułu importu i zgód.

### Procedura 7: Przegląd kontraktów API (API Contract Review)
- **Wejście:** Nowy endpoint lub profil udostępniania w specyfikacji OpenAPI.
- **Kroki:**
  1. Weryfikacja zasady minimalizacji (czy profil nie ujawnia zbyt wielu danych).
  2. Kontrola autoryzacji OAuth 2.0 i schematów błędów.
  3. Sprawdzenie procedury natychmiastowego cofnięcia tokena.
- **Dowody:** Zwalidowany schemat OpenAPI 3.1 z danymi fikcyjnymi.
- **Warunek zatrzymania:** Endpoint umożliwia eksport całej tożsamości lub podejmowanie decyzji prawnych.
- **Wymagane uprawnienia:** Kompetencje skilla `alterja-api-platform`.

### Procedura 8: Audyt prywatności i RODO (Privacy Audit)
- **Wejście:** Nowy przepływ danych, podwykonawca lub integracja zewnętrzna.
- **Kroki:**
  1. Ocena podstawy prawnej (art. 6 / art. 9 RODO).
  2. Weryfikacja braku sekretów w promptach i logach.
  3. Sprawdzenie skuteczności procedury kaskadowego usuwania danych.
- **Dowody:** Macierz zagrożeń i zgodności w dokumentacji bezpieczeństwa.
- **Warunek zatrzymania:** Ryzyko wycieku danych wrażliwych lub brak możliwości ich usunięcia.
- **Wymagane uprawnienia:** Dostęp do dokumentacji bezpieczeństwa i procedur DPO.

### Procedura 9: Odbiór wizualny i dostępności (Visual & Accessibility QA)
- **Wejście:** Wdrożony widok w środowisku podglądu lub makieta wysokiej wierności.
- **Kroki:**
  1. Pomiar kontrastów i weryfikacja obsługi klawiaturą (WCAG 2.2 AA).
  2. Sprawdzenie responsywności na 3 szerokościach (375px, 768px, 1440px).
  3. Weryfikacja stanów (pusty, błąd, ładowanie) i eliminacja emoji.
- **Dowody:** Zrzuty ekranu, log audytu dostępności i pomiary liczbowe.
- **Warunek zatrzymania:** Naruszenie kryteriów dostępności poziomu A lub AA.
- **Wymagane uprawnienia:** Narzędzie przeglądarkowe (w późniejszych etapach).

### Procedura 10: Przegląd procedur spuścizny (Digital Legacy Review)
- **Wejście:** Konfiguracja dyspozycji pośmiertnej lub wniosek opiekuna archiwum.
- **Kroki:**
  1. Weryfikacja, czy użytkownik za życia aktywował moduł i zdefiniował dyspozycje.
  2. Sprawdzenie procedury formalnego uwierzytelnienia aktu zgonu.
  3. Zamrożenie rdzenia tożsamości i weryfikacja zgody odbiorcy kontaktu.
- **Dowody:** Protokół dyspozycji ze statusem prawnym i technicznym.
- **Warunek zatrzymania:** Brak urzędowego aktu zgonu lub próba modyfikacji charakteru zmarłego.
- **Wymagane uprawnienia:** Kompetencje skilla `alterja-digital-legacy`.

### Procedura 11: Testy regresji modeli i promptów (AI Regression Testing)
- **Wejście:** Zmiana modelu bazowego, promptu systemowego lub algorytmu pamięci.
- **Kroki:**
  1. Uruchomienie niezanieczyszczonego zestawu testowego (pytania kontrolne).
  2. Porównanie wskaźników halucynacji i odmów przy braku wiedzy z baseline.
  3. Weryfikacja zachowania indywidualnego stylu.
- **Dowody:** Raport ewaluacyjny ze statystykami i wielkością próby.
- **Warunek zatrzymania:** Wzrost odsetka konfabulacji lub pogorszenie odmów przy braku danych.
- **Wymagane uprawnienia:** Środowisko testowe i zbiory ewaluacyjne.

### Procedura 12: Wdrażanie i kontrola operacyjna (Delivery & Ops Procedure)
- **Wejście:** Zestaw przetestowanych zmian przygotowanych do wydania.
- **Kroki:**
  1. Kontrola `git diff` pod kątem czystości kodu i braku sekretów.
  2. Weryfikacja zielonego statusu testów CI/CD i budżetów wydajnościowych.
  3. Publikacja na środowisku Preview i test dymny (*smoke test*).
  4. Uzyskanie pisemnej zgody użytkownika i wdrożenie produkcyjne.
- **Dowody:** Skrót commita, log wdrożenia, wskaźniki błędów 5xx po wdrożeniu.
- **Warunek zatrzymania:** Błąd buildu, czerwony test lub brak zgody na produkcję.
- **Wymagane uprawnienia:** Dostęp do narzędzi CI/CD (po zniesieniu BOOTSTRAP_ONLY).
