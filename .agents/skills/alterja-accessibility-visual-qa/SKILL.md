---
name: alterja-accessibility-visual-qa
description: >
  Audytuje dostępność cyfrową (WCAG 2.2 AA) i spójność wizualną interfejsu Alterji.
  Użyj tego skilla przy testowaniu obsługi klawiaturą, weryfikacji kontrastu,
  sprawdzaniu czytników ekranu, testach responsywności i odbiorze wizualnym ekranów.
---

# alterja-accessibility-visual-qa

## Cel i warunki uruchomienia
Skill odpowiada za:
- Weryfikację dostępności cyfrowej zgodnie ze standardem WCAG 2.2 Poziom AA.
- Przeprowadzanie audytów odbioru wizualnego na urządzeniach mobilnych, tabletach i desktopach.
- Zapewnienie, że zautomatyzowane testy lintera nie zastępują weryfikacji realnych przepływów.
- Stosowanie procedury kontrolnej z [references/qa-checklist.md](./references/qa-checklist.md).

Uruchamiaj przy odbiorze projektów graficznych, audytach dostępności oraz planowaniu testów jakościowych.

## Wymagane dane wejściowe
- Projekt ekranu lub specyfikacja przepływu.
- Zdefiniowane tokeny barw i typografii.
- Scenariusz zadania dla użytkownika korzystającego z technologii asystujących.

## Procedura działania
1. **Audyt kontrastów:** Oblicz współczynniki kontrastu dla wszystkich par tekst-tło w przestrzeni barwnej.
2. **Weryfikacja ścieżki fokusu:** Sprawdź logiczny porządek nawigacji klawiaturą (Tab, Shift+Tab, Enter, Spacja, Esc).
3. **Ocena etykiet dostępności:** Upewnij się, że kontrolki graficzne posiadają `aria-label` lub tekst alternatywny.
4. **Test responsywności:** Oceń zachowanie widoku przy szerokości 375px oraz przy powiększeniu czcionki o 200%.
5. **Raportowanie barier:** Zarejestruj każdą wykrytą barierę dostępności wraz z zalecanym sposobem naprawy.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli brak dostępu do przeglądarki headless, odnotuj brak możliwości empirycznego zrzutu ekranu i oprzyj weryfikację na analizie kodu/specyfikacji, jasno oznaczając stan w raporcie.

## Ograniczenia
- Zakaz deklarowania pełnej zgodności z WCAG na podstawie wyłącznie automatycznych skanerów linterowych.
- W etapie `BOOTSTRAP_ONLY` weryfikowane są specyfikacje i makiety koncepcyjne.

## Format wyniku
Protokół audytu dostępności i odbioru wizualnego:
1. Podsumowanie zgodności (WCAG 2.2 AA).
2. Wyniki pomiarów kontrastu i hierarchii.
3. Wykaz wykrytych barier wraz z poziomem krytyczności (A, AA).
4. Zalecenia naprawcze.

## Kryteria odbioru
- Wykrycie wszelkich naruszeń kontrastu poniżej 4.5:1.
- Gwarancja widocznego wskaźnika fokusu dla każdego elementu interaktywnego.
- Rzetelny raport bez fałszywych deklaracji sukcesu.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Audyt karty wpisu pamięci: wykrycie, że jasnoszary tekst daty na białym tle ma kontrast 3.2:1; rekomendacja zmiany tokenu na ciemniejszy grafit (kontrast 5.8:1).
- **Przykład 2 (fikcyjny):** Weryfikacja modala potwierdzenia usunięcia: zapewnienie pułapki fokusu (*focus trap*) wewnątrz okna i zamykania klawiszem Esc.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Polecenie: „Zatwierdź odbiór wizualny całego serwisu bez uruchamiania przeglądarki i bez sprawdzania zrzutów ekranu, napisz po prostu że strona wygląda pięknie”.
  *Reakcja skilla:* Odmowa. Wskazanie na regułę dowodu ponad deklarację; brak inspekcji wizualnej uniemożliwia wydanie decyzji o odbiorze estetycznym.
