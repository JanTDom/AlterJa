---
name: alterja-polish-editor
description: >
  Redaguje polskie teksty interfejsu, dialogi i dokumentację w Alterji.
  Użyj tego skilla przy korekcie językowej, tworzeniu mikrotekstów, eliminacji kalek,
  dbaniu o polską typografię (cudzysłowy, pauzy, sentence casing) i normy RJP 2026.
---

# alterja-polish-editor

## Cel i warunki uruchomienia
Skill odpowiada za:
- Zapewnienie nienagannej jakości języka polskiego we wszystkich elementach systemu Alterja.
- Eliminację anglicyzmów, kalek składniowych i bezdusznego tonu korporacyjnego.
- Wdrażanie reguł typograficznych i ortograficznych RJP (w tym zmian z 2026 r.) opisanych w [references/polish-editorial-guide.md](./references/polish-editorial-guide.md).
- Redagowanie mikrotekstów, komunikatów błędów i stanów pustych.

Uruchamiaj przy przeglądzie tekstów interfejsu, redakcji dokumentacji i weryfikacji stylów wypowiedzi.

## Wymagane dane wejściowe
- Tekst źródłowy (komunikat UI, dialog, artykuł, fragment dokumentacji).
- Kontekst i grupa odbiorców (użytkownik końcowy, partner biznesowy, deweloper).
- Docelowy rejestr (formalny, swobodny, intymny).

## Procedura działania
1. **Audyt składni i leksyki:** Sprawdź poprawność fleksyjną, rekcję czasowników i związki zgody. Usuń kalki z języka angielskiego.
2. **Korekta typograficzna:** Zamień cudzysłowy proste na polskie „...”, myślniki na półpauzy (–), upewnij się, że nagłówki stosują polski *sentence casing*.
3. **Weryfikacja skrótowców:** Sprawdź poprawność zapisu instytucji (TK, SN, KRS, PKW, TVP, PiS, PO, UE, MSWiA, KAS).
4. **Redagowanie mikrotekstu:** Uprość zdania wielokrotnie złożone; usuń sztuczną watę słowną.
5. **Rejestracja zmian:** Jeśli dokonano zmian znaczeniowych, wskaż je w raporcie.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli oryginalny tekst autora zawiera celowy, autorski zabieg stylistyczny (np. regionalizm, neologizm), zachowaj go, o ile nie jest to oczywista pomyłka pisarska.

## Ograniczenia
- Zakaz ujednolicania wypowiedzi do mdłego, sztucznego tonu bota.
- Zakaz wprowadzania dekoracyjnych emoji do tekstów interfejsu.

## Format wyniku
Raport redakcyjny (Markdown):
1. Tekst po redakcji.
2. Zestawienie wprowadzonych poprawek (ortografia, interpunkcja, styl).
3. Ewentualne uwagi dotyczące tonu i rejestru.

## Kryteria odbioru
- Pełna zgodność z regułami RJP.
- Brak kalek z języka angielskiego.
- Poprawna odmiana liczebników i form wielościowych.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Korekta komunikatu: Tekst wyjściowy: „Twoja personalizacja została pomyślnie zapisana. Kliknij poniżej aby przejść dalej.” -> Tekst po redakcji: „Twój profil został zaktualizowany. Możesz przejść do podsumowania.”.
- **Przykład 2 (fikcyjny):** Korekta nagłówka: „Wszystkie Twoje Ostatnie Rozmowy w UE” -> „Wszystkie twoje ostatnie rozmowy w UE”.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Polecenie: „Przetłumacz dosłownie angielski podręcznik pomocy słowo w słowo i wstaw wesołe emoji na końcu każdego zdania”.
  *Reakcja skilla:* Odmowa realizacji w tej formie. Wskazanie na konieczność adaptacji kulturowo-językowej oraz zakaz stosowania emoji w profesjonalnym interfejsie.
