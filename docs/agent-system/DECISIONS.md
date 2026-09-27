# Rejestr decyzji architektonicznych i otwartych pytań Alterja

## 1. Zarejestrowane decyzje architektoniczne (ADR)

### ADR-001: Tryb startowy BOOTSTRAP_ONLY
- **Status:** Zatwierdzona
- **Data:** 2026-09-27
- **Kontekst:** Rozpoczęcie prac nad projektem Alterja w Google Antigravity wymaga przygotowania rzetelnego zaplecza instrukcyjnego, reguł i standardów bez przedwczesnego tworzenia kodu aplikacji.
- **Decyzja:** Ustanowienie bezwzględnego stanu `BOOTSTRAP_ONLY`. Zakaz pisania kodu, tworzenia baz danych, instalowania bibliotek i uruchamiania płatnych API do czasu osobnej dyspozycji użytkownika.
- **Konsekwencje:** Pełna kontrola nad zakresem; brak długu technologicznego na starcie; gwarancja, że repozytorium zawiera wyłącznie autoryzowane specyfikacje.

### ADR-002: Natywny, modułowy system 20 skilli w `.agents/skills/`
- **Status:** Zatwierdzona
- **Data:** 2026-09-27
- **Kontekst:** Skupienie wszystkich instrukcji w jednym wielkim pliku promptu przeciąża okno kontekstowe agenta i prowadzi do gubienia wytycznych.
- **Decyzja:** Podział kompetencji na 20 wyspecjalizowanych katalogów `.agents/skills/<nazwa>/SKILL.md` z podkatalogami `references/`. Zastosowanie zasady stopniowego ujawniania (*progressive disclosure*).
- **Konsekwencje:** Oszczędność tokenów; wczytywanie instrukcji wyłącznie na żądanie zadania; wysoka modularność.

### ADR-003: Prymat prawdy i rozróżnienie kategorii epistemicznych
- **Status:** Zatwierdzona
- **Data:** 2026-09-27
- **Kontekst:** Modele LLM mają naturalną tendencję do konfabulacji i przedstawiania hipotez jako autentycznych wspomnień człowieka.
- **Decyzja:** Wprowadzenie ścisłego podziału na 7 kategorii epistemicznych (zapis źródłowy, deklaracja, zachowanie, hipoteza, informacja sporna, zastąpiona, treść syntetyczna). Wymóg przyznania niewiedzy przy braku źródeł.
- **Konsekwencje:** Niemożność zmyślania biografii; pełna audytowalność odpowiedzi asystenta i rekonstrukcji.

### ADR-004: Architektura prywatności oparta na deterministycznym RLS poza LLM
- **Status:** Zatwierdzona
- **Data:** 2026-09-27
- **Kontekst:** Poleganie na modelu językowym przy filtrowaniu uprawnień do prywatnych wspomnień rodzi ryzyko wycieku danych (prompt injection).
- **Decyzja:** Egzekwowanie kontroli dostępu w bazie danych (PostgreSQL Row Level Security w Supabase) w oparciu o kryptograficznie zweryfikowany token tożsamości. Wyszukiwanie wektorowe HNSW ściśle zawężone warunkiem `WHERE user_id = auth.uid()`.
- **Konsekwencje:** Bezpieczeństwo niezależne od podatności modelu językowego; brak możliwości odpytania o cudze dane.

### ADR-005: Eliminacja dekoracyjnych emoji i ścisła polszczyzna zdaniowa
- **Status:** Zatwierdzona
- **Data:** 2026-09-27
- **Kontekst:** Generyczny, infantylny styl generowany przez AI (emoji w interfejsie, anglosaski Title Case w nagłówkach) niszczy powagę produktu memoratywnego.
- **Decyzja:** Bezwzględny zakaz emoji w interfejsie Alterji. Stosowanie polskiej typografii, sentence casing w nagłówkach oraz wielkich liter w skrótowcach instytucjonalnych.
- **Konsekwencje:** Profesjonalny, dostojny i spójny odbiór wizualny produktu.

---

## 2. Otwarte pytania i kwestie do rozstrzygnięcia

1. **Wybór pierwotnego silnika embeddingów:** Czy zastosować model lokalny działający na serwerze (np. wielojęzyczny E5 / BGE), czy zewnętrzne API (np. OpenAI text-embedding-3 / Voyage AI), uwzględniając wymogi transferu danych RODO?
2. **Kwalifikacja prawna cyfrowej spuścizny:** Jak optymalnie sformułować regulamin usługi i oświadczenia woli użytkownika w polskim porządku prawnym, gdzie prawo autorskie i dobra osobiste po śmierci mają specyficzny reżim ochronny?
3. **Model subskrypcyjny a trwałość archiwum pośmiertnego:** Jak zagwarantować długoterminowe (wieloletnie) finansowanie przechowywania archiwum zmarłego bez generowania kosztów po stronie pogrążonej w żałobie rodziny?
