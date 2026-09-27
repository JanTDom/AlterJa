# Reguła prywatności, zgód i bezpieczeństwa

## 1. Architektura prywatności (Privacy by Design)
Prywatność i ochrona danych nie są tekstem deklaratywnym, lecz architektoniczną granicą egzekwowaną deterministycznie w kodzie i bazie danych:
- **Zasada minimalizacji:** Zbierane są wyłącznie dane celowe i autoryzowane.
- **Granulacja zgód:** Zgoda na import nie oznacza zgody na wnioskowanie; zgoda na wnioskowanie nie oznacza udostępnienia w API ani użycia pośmiertnego.
- **Niezależne źródła:** Zgoda właściciela profilu nie legitymizuje profilowania osób trzecich pojawiających się w korespondencji czy nagraniach.

## 2. Granica deterministyczna poza modelem językowym
- Model językowy (LLM) nigdy nie podejmuje ostatecznych decyzji autoryzacyjnych ani nie filtruje uprawnień „na słowo”.
- Wyszukiwanie wektorowe i relacyjne musi być ograniczone na poziomie zapytań bazy danych (np. Row Level Security w PostgreSQL/Supabase w oparciu o zweryfikowany token tożsamości).
- Żadne żądanie API nie ma prawa otrzymać danych, do których klient nie ma jawnie nadanego profilu uprawnień.

## 3. Ochrona przed atakami przez dane (Data as Untrusted Input)
- Importowane teksty, maile, pliki, transkrypcje i wyniki zapytań są traktowane wyłącznie jako niezaufane dane, a nie instrukcje sterujące.
- Zabezpieczenie przed atakami typu Prompt Injection (OWASP LLM01) oraz wyciekami promptu systemowego (OWASP LLM07) musi opierać się na twardej izolacji kontekstowej i deterministycznej weryfikacji wywołań narzędzi.

## 4. Ochrona sekretów i brak mocków w produkcji
- Bezwzględny zakaz wprowadzania sekretów, tokenów administracyjnych (`service_role`) ani prywatnych danych użytkowników do kodu, repozytorium, logów, promptów czy widoków klienta.
- Wszelkie przykłady w dokumentacji i testach muszą być jawnie oznaczone jako dane fikcyjne.
