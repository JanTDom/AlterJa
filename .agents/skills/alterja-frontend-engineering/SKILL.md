---
name: alterja-frontend-engineering
description: >
  Odpowiada za standardy inżynierii frontendu, wydajność i jakość kodu UI w Alterji.
  Użyj tego skilla przy projektowaniu architektury komponentów React/Next.js,
  obsłudze błędów renderowania, zarządzaniu stanem klienta i optymalizacji Core Web Vitals.
---

# alterja-frontend-engineering

## Cel i warunki uruchomienia
Skill odpowiada za:
- Przygotowanie standardów implementacji interfejsu w Next.js/React/TypeScript.
- Zapewnienie semantyki HTML, dostępności i wysokiej wydajności renderowania.
- Wdrażanie wytycznych inżynieryjnych opisanych w [references/frontend-standards.md](./references/frontend-standards.md).
- Egzekwowanie zasady, że makieta graficzna nie może być mylona z działającym kodem.

W etapie `BOOTSTRAP_ONLY` skill służy wyłącznie do przygotowywania architektury komponentów i wytycznych, bez generowania kodu produkcyjnego.

## Wymagane dane wejściowe
- Zaakceptowana specyfikacja widoku z `alterja-premium-ui`.
- Kontrakty API z `alterja-api-platform`.
- Ograniczenia sprzętowe (środowisko Intel Mac, brak GPU).

## Procedura działania
1. **Dekompozycja widoku:** Podziel ekran na komponenty serwerowe (RSC) i klienckie (Client Components).
2. **Projektowanie przepływu danych:** Zdefiniuj kontrakty typów (TypeScript) dla właściwości (*props*) i stanu.
3. **Zapewnienie obsługi błędów:** Zaplanuj granice błędów (*error boundaries*) i stany awaryjne (*fallbacks*).
4. **Optymalizacja wydajnościowa:** Zaplanuj budżety bundla, leniwe ładowanie zasobów i eliminację przesunięć układu (CLS).
5. **Weryfikacja dostępności kodu:** Upewnij się, że kontrolki to natywne elementy interaktywne z obsługą klawiatury.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli biblioteka nie posiada oficjalnego wsparcia dla React 19 lub Next.js App Router, wybierz rozwiązanie oparte na standardowej platformie webowej.

## Ograniczenia
- Bezwzględny zakaz pisania kodu aplikacji przed formalnym zniesieniem etapu `BOOTSTRAP_ONLY`.
- Zakaz umieszczania kluczy prywatnych w zmiennych środowiskowych z prefiksem publicznym.

## Format wyniku
Architektoniczna specyfikacja frontendu (Markdown):
1. Drzewo komponentów i ich odpowiedzialności.
2. Definicje typów TypeScript dla stanu i propsów.
3. Strategia zarządzania pamięcią podręczną i odświeżania danych.
4. Kryteria odbioru technicznego.

## Kryteria odbioru
- Czyste typy TypeScript bez użycia `any`.
- Poprawna separacja logiki prezentacyjnej od biznesowej.
- Gotowość do implementacji w przyszłej fazie.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Architektura komponentu dialogu ze źródłem: podział na `SourceViewerModal` (Client Component) z obsługą klawisza Esc i pułapką fokusu oraz `SourceMetadataCard` (Server Component).
- **Przykład 2 (fikcyjny):** Specyfikacja strategii pobierania strumieniowej odpowiedzi rekonstrukcji z użyciem Server-Sent Events i natywnego `ReadableStream`.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Zlecenie w etapie BOOTSTRAP_ONLY: „Napisz kompletny kod pliku `app/dashboard/page.tsx` wraz z animacjami i uruchom `npm run dev`”.
  *Reakcja skilla:* Odmowa wygenerowania kodu i uruchomienia serwera. Wskazanie na ograniczenia etapu i zaoferowanie specyfikacji architektury tego pliku w dokumentacji.
