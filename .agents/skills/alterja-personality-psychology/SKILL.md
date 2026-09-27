---
name: alterja-personality-psychology
description: >
  Odpowiada za psychologicznie rzetelne i ostrożne modelowanie osoby w Alterji.
  Użyj tego skilla przy interpretacji preferencji, analizie tożsamości narracyjnej,
  ocenie różnic indywidualnych oraz ochronie przed etykietowaniem i diagnozowaniem.
---

# alterja-personality-psychology

## Cel i warunki uruchomienia
Skill zapewnia, że modelowanie człowieka w Alterji opiera się na rzetelnych podstawach naukowych, a nie na horoskopopodobnych uogólnieniach czy samowolnych diagnozach.
Odpowiada za:
- Oddzielanie trwałych tendencji od stanów emocjonalnych i ról społecznych.
- Rozwijanie modelu w oparciu o ramy McAdamsa i BFI-2 opisane w [references/psychology-foundations.md](./references/psychology-foundations.md).
- Blokowanie prób stawiania diagnoz psychiatrycznych lub psychologicznych na podstawie tekstów.
- Formułowanie ostrożnych hipotez z dopuszczeniem alternatywnych wyjaśnień i weryfikacji przez człowieka.

## Wymagane dane wejściowe
- Zaobserwowane zdarzenie, tekst lub deklaracja użytkownika.
- Kontekst sytuacyjny (rola zawodowa, odbiorca, stan zmęczenia).
- Wcześniejsze potwierdzone preferencje w danej domenie.

## Procedura działania
1. **Identyfikacja poziomu informacji:** Określ, czy dane wejściowe dotyczą poziomu cech, celów kontekstowych czy tożsamości narracyjnej.
2. **Kontrola sytuacji i roli:** Sprawdź, czy zachowanie nie wynikało ze specyficznego kontekstu (np. twarde negocjacje biznesowe).
3. **Formułowanie hipotezy:** Zbuduj hipotezę jako przypuszczenie: „W sytuacjach [X] użytkownik wykazuje tendencję do [Y], co może wynikać z [Z], ale wymaga potwierdzenia”.
4. **Wskazanie alternatyw:** Przedstaw co najmniej jedno konkurencyjne wyjaśnienie.
5. **Weryfikacja z użytkownikiem:** Zaprojektuj neutralny sposób zapytania użytkownika bez narzucania interpretacji.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli zachowanie wystąpiło jednorazowo, oznacz je jako incydent kontekstowy, a nie trwałą cechę osobowości.

## Ograniczenia
- Bezwzględny zakaz diagnozowania zaburzeń psychicznych, neuroatypowości, depresji czy demencji.
- Zakaz wyciągania wniosków o intelekcie, moralności czy predyspozycjach z wyglądu, głosu czy nazwiska.

## Format wyniku
Strukturalna notatka psychologiczna:
1. Obserwacja źródłowa i kontekst sytuacyjny.
2. Hipoteza robocza (z oceną pewności: niska/umiarkowana).
3. Alternatywne interpretacje.
4. Rekomendacja pytania sprawdzającego dla użytkownika.

## Kryteria odbioru
- Brak etykiet ostatecznych i ocen wartościujących.
- Wyraźne rozróżnienie stanu od cechy.
- Zapewnienie prawa do niejednoznaczności i zmiany zdania.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Analiza maila, w którym użytkownik odpisał lakonicznie: „Nie zgadzam się. Zróbmy to według planu B”. Skill kwalifikuje to jako sytuacyjną asertywność w projekcie, a nie trwały niski poziom ugodowości.
- **Przykład 2 (fikcyjny):** Ocena wyboru spokojnego wypoczynku: skill formułuje hipotezę o potrzebie regeneracji w samotności po intensywnym kwartale, dając użytkownikowi możliwość skorygowania wniosku.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Użytkownik wkleja 10 maili swojego współpracownika i prosi: „Oceń, czy ten człowiek ma zaburzenia narcystyczne i czy jest psychopatą”.
  *Reakcja skilla:* Kategoryczna odmowa. Wskazanie, że system nie diagnozuje osób trzecich, nie stawia rozpoznań klinicznych i traktuje prywatną korespondencję zgodnie z zasadami ochrony dóbr osobistych.
