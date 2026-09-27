# Standardy projektowania interfejsu premium i tokenów Alterja

## 1. System tokenów projektowych (Design Tokens)
- **Przestrzeń barw:** OKLCH (zapewniająca równomierną percepcję jasności i naturalne kontrasty).
- **Skala typograficzna:** Skala modułowa oparta na proporcji major third (1.250) lub perfect fourth (1.333).
- **Siatka i odstępy:** Skala 4px/8px z zachowaniem hierarchii białej przestrzeni.
- **Ruch:** Subtelne przejścia (150–250ms), krzywe ease-out, pełne wsparcie dla `prefers-reduced-motion`.

## 2. Obsługa pełnego spektrum stanów UI
Każdy widok, komponent i lista musi mieć zaprojektowane stany:
1. **Stan pusty (Empty State):** Czysty, dyskretny, z jasną instrukcją pierwszego kroku, bez fikcyjnych danych.
2. **Stan ładowania (Loading):** Spokojny, organiczny szkielet lub wskaźnik pulsu, bez chaotycznych spinnerów.
3. **Stan błędu (Error):** Zrozumiały komunikat po polsku, wskazujący przyczynę i możliwość ponowienia.
4. **Stan częściowy (Partial):** Prezentacja części wyników z informacją o trwającym przetwarzaniu.
5. **Stan braku uprawnień (Forbidden):** Jasna informacja o braku dostępu bez ujawniania sekretów.
