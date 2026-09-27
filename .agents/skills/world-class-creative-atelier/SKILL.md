---
name: world-class-creative-atelier
description: Elitarny standard projektowania graficznego i inżynierii wizualnej stron www na poziomie światowym (Awwwards Site of the Year, FWA, Basement Studio, Locomotive, Pentagram). Wymusza odrzucenie powtarzalnych szablonów AI, zaawansowaną kompozycję asymetryczną, wieloplanową głębię, subtelne tekstury, luksusowy światłocień, kinetyczną typografię i dotykową fizykę mikrointerakcji.
---

# World-Class Creative Atelier — Standard Elitarnego Projektowania Wizualnego

Ten skill definiuje bezkompromisowy poziom rzemiosła wizualnego i art direction dla interfejsów internetowych. Przekształca aplikację ze sterylnego szablonu programistycznego w unikalne dzieło cyfrowego wzornictwa klasy światowej, porównywalne z realizacjami topowych studiów brandingowo-kreatywnych.

---

## 1. Odrzucenie szablonowości AI (The Anti-AI Look)

### Czego kategorycznie NIE robimy:
- **Zero symetrycznych, nudnych 3-kolumnowych kafelków:** Zamiast tego stosujemy zróżnicowaną hierarchię skali (hero span 2x2, detale 1x1, asymetryczne pasy informacyjne).
- **Zero płaskich, białych prostokątów z cienką szarą ramką (`border-slate-200`):** Każda powierzchnia posiada mikrogłębię, gradient świetlny lub wielowarstwowy cień otoczenia.
- **Zero generycznych ikonek w małych, kolorowych kwadracikach:** Ikony są minimalistyczne, osadzone z precyzyjną typografią lub zastąpione autorskimi wskaźnikami graficznymi (indeks, mikro-wykres, radar, status).
- **Zero dekoracyjnych emoji w nagłówkach i przyciskach:** Zastępujemy je dopracowaną typografią, mikroskrajami i wyrazistą kompozycją.

---

## 2. Architektura światła, głębi i tekstury (Layered Depth & Ambience)

- **Wielowarstwowe cienie otoczenia (Ambient Multi-Layer Shadows):**
  Luksusowa głębia nie powstaje z jednego `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`. Wymaga kompozycji 3-4 warstw cienia o różnym rozproszeniu i subtelnej barwie:
  ```css
  --shadow-atelier-card: 
    0 1px 2px -1px rgba(15, 23, 42, 0.04),
    0 4px 8px -2px rgba(15, 23, 42, 0.05),
    0 12px 24px -4px rgba(15, 23, 42, 0.06),
    0 24px 48px -8px rgba(15, 23, 42, 0.04);
  --shadow-atelier-float:
    0 2px 4px -1px rgba(15, 23, 42, 0.06),
    0 8px 16px -2px rgba(15, 23, 42, 0.08),
    0 20px 40px -6px rgba(15, 23, 42, 0.1),
    0 32px 64px -12px rgba(15, 23, 42, 0.08);
  ```
- **Mikro-ziarno i tekstura (Subtle Atmospheric Noise):**
  Tło nie jest martwym, płaskim kolorem. Wykorzystujemy mikroskopijne ziarno optyczne (`svg filter feTurbulence`), które nadaje powierzchniom fizyczność papieru welinowego lub szlachetnego matowego szkła.
- **Refleksy krawędziowe (Hairline Edge Highlights):**
  Karty posiadają podwójną krawędź optyczną: wewnętrzny refleks światła (`inset 0 1px 0 0 rgba(255, 255, 255, 0.9)`) oraz zewnętrzną subtelną ramkę strukturalną (`rgba(15, 23, 42, 0.07)`).

---

## 3. Typografia luksusowa i redakcyjna (Editorial Craft)

- **Płynna skala typograficzna (`clamp()`):**
  Rozmiary nagłówków reagują płynnie na szerokość ekranu bez skokowych punktów przerwania.
- **Precyzyjny kontrast krojów:**
  - *Tytuły i cytaty:* Monumentalny, kontrastowy antykwa szeryfowa (klasa Didone / Editorial Serif) z ujemnym trackingiem (`letter-spacing: -0.03em`) i ciasną interlinią (`leading-[1.08]`).
  - *Dane, statusy i wskaźniki:* Rygorystyczny, techniczny krój monospaced z szerokim rozstrzeleniem (`tracking-[0.1em]`, `uppercase`, `text-[10px]`).
  - *Treść zasadnicza:* Szlachetny, humanistyczny bezszeryf z optymalną długością wiersza (55–70 znaków).
- **Numeracja i indeksy:**
  Wprowadzamy numery sekcji (np. `01 / IDENTYFIKACJA`, `02 / EPISTEMOLOGIA`), które nadają rytm edytorskiego katalogu.

---

## 4. Dotykowa fizyka i mikrointerakcje (Tactile Response)

- **Sprężyste reakcje na kliknięcie:**
  Każdy interaktywny przycisk i karta reaguje na naciśnięcie subtelnym ugięciem (`active:scale-[0.985]` z płynnym powrotem), symulując mechaniczny klawisz.
- **Dynamiczne podświetlenie kursora (Spotlight / Cursor Tracking):**
  Karty w siatce Bento reagują na pozycję kursora subtelną poświatą gradientową na krawędziach, ujawniając strukturę komponentu w trakcie interakcji.
- **Płynność stanów pustych i ładowania:**
  Zamiast prymitywnych wirujących kółek stosujemy eleganckie, pulsujące linie pomiarowe i makiety szkieletowe z gradientem światła.

---

## 5. Kompozycja Bento klasy światowej (Master Bento Grid)

- **Nieregularny podział:** Element dominujący zajmuje 2/3 szerokości lub podwójną wysokość, tworząc wyraźny punkt ciężkości wzroku.
- **Zróżnicowanie gęstości:** Przeplatanie stref bogatych w dane (wskaźniki, wykresy, kody) ze strefami oddechu (duża typografia, pusta przestrzeń, wyraziste hasło).
- **Zintegrowany pulpit narzędziowy:** Kontrolki nie są porozrzucane – tworzą spójny panel dowodzenia o wyglądzie precyzyjnego instrumentu laboratoryjnego.
