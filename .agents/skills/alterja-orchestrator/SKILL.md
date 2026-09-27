---
name: alterja-orchestrator
description: >
  Zarządza etapami prac, zakresem i koordynacją agentów w projekcie Alterja.
  Użyj tego skilla przy planowaniu prac, rozstrzyganiu sprzeczności, doborze
  odpowiednich skilli do zadania oraz weryfikacji ograniczeń etapu BOOTSTRAP_ONLY.
---

# alterja-orchestrator

## Cel i warunki uruchomienia
Skill koordynuje pracę w projekcie Alterja. Odpowiada za:
- Weryfikację, czy zlecone zadanie jest zgodne z bieżącym etapem projektu (`BOOTSTRAP_ONLY`).
- Dobór najmniejszego wystarczającego zestawu skilli pomocniczych.
- Rozstrzyganie sprzeczności pomiędzy instrukcjami i wytycznymi.
- Prowadzenie rejestru decyzji architektonicznych i proceduralnych w [references/orchestration-lifecycle.md](./references/orchestration-lifecycle.md).

Uruchamiaj ten skill na początku każdego złożonego zadania, przy zmianie etapu lub przy konieczności skoordynowania wielu perspektyw domenowych.

## Wymagane dane wejściowe
- Treść polecenia użytkownika.
- Aktualny stan projektu (odczytany z `AGENTS.md`).
- Kontekst zrealizowanych dotąd prac i stan rejestru decyzji.

## Procedura działania
1. **Weryfikacja etapu:** Sprawdź, czy zadanie nie narusza zakazów etapu `BOOTSTRAP_ONLY`. Jeśli wymaga pisania kodu aplikacji, tworzenia bazy lub uruchamiania usług — natychmiast zatrzymaj proces.
2. **Dekonstrukcja zadania:** Rozbij zadanie na cele atomowe.
3. **Selekcja skilli:** Wybierz wyłącznie te skille z katalogu 20, które bezpośrednio odpowiadają celom atomowym.
4. **Stworzenie planu:** Przedstaw krótki plan krok po kroku ze wskazaniem dowodów weryfikacji.
5. **Nadzór nad wykonaniem:** Koordynuj pracę skilli, pilnując standardu Fable 5.1 (dowód > deklaracja).
6. **Zapis decyzji:** Po istotnym rozstrzygnięciu odnotuj wpis w `docs/agent-system/DECISIONS.md`.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli polecenie użytkownika jest dwuznaczne w kwestii zakresu (np. „przygotuj prototyp”), załóż wariant bezpieczniejszy (dokumentacyjny, bez kodu) i poproś o sprecyzowanie.
- Jeśli występuje konflikt między regułą nadrzędną a skillem, reguła nadrzędna ma bezwzględne pierwszeństwo.

## Ograniczenia
- Zakaz uruchamiania fazy implementacji aplikacji przed wyraźną dyspozycją użytkownika znoszącą stan `BOOTSTRAP_ONLY`.
- Zakaz włączania wszystkich 20 skilli naraz do jednego wątku, jeśli zadanie dotyczy wąskiego wycinka.

## Format wyniku
Strukturalny raport orkiestracji zawierający:
1. Status etapu (`BOOTSTRAP_ONLY` lub inny).
2. Wybrane skille i uzasadnienie ich doboru.
3. Plan działania i zidentyfikowane ryzyka.
4. Dowody weryfikacji każdego kroku.

## Kryteria odbioru
- Zadanie wykonane ściśle w granicach etapu.
- Brak zbędnych plików i modyfikacji poza zakresem.
- Rejestr decyzji zaktualizowany w przypadku kluczowych ustaleń.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Użytkownik zleca: „Zaplanuj procedurę weryfikacji poprawności językowej komunikatów interfejsu”. Orchestrator potwierdza etap `BOOTSTRAP_ONLY`, dobiera skill `alterja-polish-editor` oraz `alterja-quality-verification`, tworzy plan procedury redakcyjnej i zapisuje ją w dokumentacji bez tworzenia kodu.
- **Przykład 2 (fikcyjny):** Użytkownik pyta: „Jakie skille są potrzebne do zdefiniowania modelu danych pamięci?”. Orchestrator dobiera `alterja-memory-provenance` oraz `alterja-backend-data` i przedstawia koncepcyjny zarys bez uruchamiania bazy danych.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Użytkownik zleca: „Napisz komponent logowania w Next.js i skonfiguruj tabelę w Supabase”.
  *Reakcja skilla:* Odmowa realizacji kodu i migracji ze względu na aktywny stan `BOOTSTRAP_ONLY`. Wskazanie konieczności formalnego otwarcia etapu implementacji oraz zaoferowanie w zamian przygotowania specyfikacji wymagań uwierzytelniania w dokumentacji.
