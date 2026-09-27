# Reguła etapu: BOOTSTRAP_ONLY

## 1. Status i rygor etapu
W projekcie Alterja obowiązuje stan `BOOTSTRAP_ONLY`. Każda sesja robocza i każde zadanie musi weryfikować tę granicę przed podjęciem jakichkolwiek działań.
Stan ten może zostać zniesiony wyłącznie przez wyraźne, pisemne polecenie użytkownika otwierające kolejną fazę (np. faza koncepcji wizualnej, faza implementacji).

## 2. Działania dozwolone
- Odczyt struktury bieżącego katalogu projektu i istniejących plików.
- Tworzenie i aktualizacja dokumentacji Markdown w katalogach `.agents/rules/`, `.agents/skills/` oraz `docs/`.
- Sprawdzanie spójności wewnętrznej, walidacja linków, testowanie poprawności YAML frontmatter oraz sucha analiza scenariuszy kontrolnych.
- Prowadzenie rejestru decyzji architektonicznych i otwartych pytań.

## 3. Działania bezwzględnie zabronione
- Tworzenie kodu aplikacji (Next.js, React, Node.js, Python itd.), komponentów UI, stylów, routingu, schematów baz danych i migracji.
- Inicjalizowanie menedżerów pakietów (`npm init`, `pnpm init`), instalowanie zależności lub bibliotek.
- Konfigurowanie i uruchamianie usług zewnętrznych: GitHub, Vercel, Supabase, Cloudflare, serwisów DNS czy dostawców płatności.
- Uruchamianie serwerów deweloperskich, kontenerów Docker, zadań cyklicznych (cron) lub płatnych wywołań API AI.
- Importowanie, odczytywanie lub utrwalanie prywatnych danych użytkownika (poczta, czaty, notatki osobiste, dane biometryczne).
- Wdrażanie makiet podających się za działający kod.

## 4. Wykrycie naruszenia
Jeżeli polecenie użytkownika lub plan działania wymagałby wyjścia poza `BOOTSTRAP_ONLY`, agent natychmiast zatrzymuje się, cytuje niniejszą regułę i prosi o formalną autoryzację zmiany etapu.
