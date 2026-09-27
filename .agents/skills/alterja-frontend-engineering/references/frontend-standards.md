# Standardy inżynierii frontendu Alterja

## 1. Stos technologiczny i ograniczenia środowiskowe
- **Środowisko docelowe:** Next.js (App Router), React, TypeScript (strict mode), Tailwind CSS v4 lub czysty nowoczesny CSS.
- **Wymagania lokalne:** MacBook z procesorem Intel (brak akceleracji GPU, brak zależności wymagających wyłącznie Apple Silicon).
- **Semantyka HTML:** Wykorzystanie natywnych elementów (`<dialog>`, `<nav>`, `<main>`, `<article>`), arie i role wyłącznie tam, gdzie konieczne.

## 2. Architektura komponentów i odporność
- **Separacja I/O od renderowania:** Logika pobierania danych oddzielona od widoków prezentacyjnych.
- **Odporność na błędy (Error Boundaries):** Każdy krytyczny fragment widoku zabezpieczony komponentem wychwytującym błędy renderowania.
- **Bezpieczeństwo danych po stronie klienta:** Brak sekretów (`service_role`, klucze prywatne) w paczkach JS; tylko anonimowe klucze publiczne.
