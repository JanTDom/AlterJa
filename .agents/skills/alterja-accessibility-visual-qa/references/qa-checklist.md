# Procedury audytu dostępności i kontroli wizualnej Alterja

## 1. Wymagania WCAG 2.2 Poziom AA
- **Percepcja:**
  - Minimalny kontrast tekstu: 4.5:1 dla tekstu zwykłego, 3:1 dla dużego tekstu i kontrolek interfejsu.
  - Informacja nie może być przekazywana wyłącznie za pomocą koloru.
- **Funkcjonalność:**
  - Pełna obsługa interfejsu wyłącznie przy użyciu klawiatury (brak pułapek klawiatury, logiczna kolejność tabulacji).
  - Widoczny, wyraźny wskaźnik fokusu na wszystkich elementach interaktywnych.
  - Rozmiar celu dotykowego: minimum 24x24 px (zalecane 44x44 px na urządzeniach mobilnych).
- **Zrozumiałość i rzetelność:**
  - Czytniki ekranu: poprawne ogłaszanie dynamicznych zmian za pomocą regionów `aria-live="polite"`.

## 2. Metodologia odbioru wizualnego (Visual QA)
1. Sprawdzenie na 3 szerokościach widoku: 375px (mobile), 768px (tablet), 1440px (desktop).
2. Sprawdzenie z powiększeniem tekstu do 200%.
3. Weryfikacja działania w trybie wysokiego kontrastu i ciemnym motywie.
