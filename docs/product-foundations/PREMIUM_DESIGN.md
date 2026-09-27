# Standardy projektowania WWW premium i doświadczenia użytkownika Alterja

## 1. Filozofia wizualna i tożsamość marki
Alterja tworzy doświadczenie cyfrowe oparte na powadze, spokoju, dyskrecji i szacunku dla ludzkiego życia. Odrzuca infantylną estetykę typowych narzędzi AI.

### Kluczowe zasady art direction
- **Szlachetne materiały cyfrowe:** Zamiast jaskrawych, neonowych gradientów stosujemy paletę barw ziemi, głębokiego grafitu, ciepłej bieli niebielonego papieru i subtelnych akcentów bursztynu lub oliwki.
- **Eliminacja klisz AI:** Zakaz stosowania wizerunków świecących robotów, lewitujących mózgów, fioletowo-cyjanowych poświat oraz wielkich, pustych wykresów nieprzedstawiających żadnych realnych danych.
- **Rytm i przestrzeń:** Hojne wykorzystanie białej przestrzeni (*negative space*), przejrzysta hierarchia i czytelny podział sekcji.

## 2. System tokenów projektowych (Design Tokens)
- **Przestrzeń barwna:** OKLCH dla precyzyjnej kontroli postrzeganego kontrastu i naturalnych przejść tonalnych.
- **Typografia:** Wysokiej klasy krój szeryfowy dla tytułów i nagłówków narracyjnych (pełna obsługa polskich znaków) oraz geometryczny lub humanistyczny krój bezszeryfowy dla danych i kontrolek interfejsu.
- **Sentence Casing:** Wszystkie nagłówki formatowane według polskiej zasady zdaniowej (wielka litera na początku i w nazwach własnych).
- **Zero dekoracyjnych emoji:** Zamiast emoji stosujemy typografię, hierarchię wielkości oraz semantyczne ikony wektorowe (SVG).

## 3. Kompletność stanów interfejsu
Żaden widok w Alterji nie może zostać odebrany bez zaprojektowania i przetestowania pełnego spektrum stanów:
1. **Stan pusty (Clean Zero-State):** Elegancki, uspokajający widok z dyskretną wskazówką pierwszego działania. Kategoryczny zakaz wstawiania fikcyjnych danych przykładowych (mocków) do widoków produkcyjnych.
2. **Stan wczytywania (Loading):** Spokojny wskaźnik pulsu lub subtelny szkielet, bez agresywnych, nerwowych spinnerów.
3. **Stan błędu (Error):** Precyzyjny komunikat w języku polskim, wyjaśniający przyczynę i oferujący jasny krok naprawczy.
4. **Stan częściowy (Partial):** Prezentacja części wyników z informacją o trwającym przetwarzaniu w tle.
5. **Stan braku uprawnień (Forbidden):** Jasna informacja o braku dostępu bez ujawniania metadanych.

## 4. Dostępność i wydajność (WCAG 2.2 AA & Core Web Vitals)
- **Dostępność cyfrowa:** Standard WCAG 2.2 AA:
  - Kontrast tekstu minimum 4.5:1 (3:1 dla dużych nagłówków i elementów UI).
  - Pełna nawigacja wyłącznie klawiaturą z wyraźnym indykatorem fokusu.
  - Dynamiczne komunikaty asystujące w regionach `aria-live="polite"`.
- **Wydajność webowa (progi 75. percentyla rzeczywistych sesji):**
  - **LCP (Largest Contentful Paint):** ≤ 2,5 s.
  - **INP (Interaction to Next Paint):** ≤ 200 ms.
  - **CLS (Cumulative Layout Shift):** ≤ 0,1.
- **Procedura odbioru:** Obowiązkowa kontrola w 3 szerokościach widoku (375px mobile, 768px tablet, 1440px desktop) z inspekcją zrzutów ekranu.
