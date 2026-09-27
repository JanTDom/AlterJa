---
name: alterja-memory-provenance
description: >
  Zarządza pochodzeniem informacji, wersjonowaniem, korektami i usuwaniem pamięci w Alterji.
  Użyj tego skilla przy projektowaniu schematu pamięci, rozstrzyganiu sprzeczności czasowych,
  śledzeniu źródeł faktów, obsłudze prawa do bycia zapomnianym i audycie wiedzy modelu.
---

# alterja-memory-provenance

## Cel i warunki uruchomienia
Skill odpowiada za:
- Projektowanie struktury pamięci, w której każdy fakt, preferencja czy wspomnienie ma udokumentowane pochodzenie.
- Rozstrzyganie sprzeczności między starymi danymi a nowymi korektami.
- Ścisłe rozdzielanie faktów zatwierdzonych, roboczych hipotez i treści syntetycznych według schematu z [references/provenance-schema.md](./references/provenance-schema.md).
- Zapewnienie pełnej obsługi usuwania danych (zgodność z RODO).

Uruchamiaj przy projektowaniu architektury pamięci, algorytmów konsolidacji wiedzy i mechanizmów wyszukiwania semantycznego.

## Wymagane dane wejściowe
- Fragment tekstu źródłowego lub deklaracji.
- Metadane pozyskania (czas, autor, źródło).
- Istniejące powiązane wpisy w pamięci profilu.

## Procedura działania
1. **Analiza atrybucji:** Ustal autora, datę pierwotną oraz nośnik źródłowy.
2. **Kwalifikacja epistemiczna:** Przypisz wpis do odpowiedniej kategorii (fakt, deklaracja, hipoteza, treść sporna).
3. **Porównanie z bazą wiedzy:** Wykryj ewentualne sprzeczności z istniejącymi wpisami.
4. **Rozstrzyganie konfliktu:** Jeśli występuje sprzeczność, sprawdź chronologię i kontekst. Nowsza korekta użytkownika nadpisuje starsze hipotezy.
5. **Budowa łańcucha pochodzenia:** Dołącz wskaźniki do źródeł pierwotnych.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli brak daty lub źródła, wpis nie może otrzymać statusu faktu zatwierdzonego; pozostaje hipotezą o niskiej pewności.

## Ograniczenia
- Zakaz mechanicznego usuwania sprzeczności bez analizy kontekstu (użytkownik może legalnie mieć inne preferencje w pracy niż prywatnie).
- Zakaz blokowania usuwania danych przez systemy audytowe.

## Format wyniku
Strukturalny rekord pamięci z pochodzeniem (JSON/Markdown):
1. Treść ekstraktu.
2. Metadane pochodzenia (autor, źródło, sygnatura czasowa).
3. Status epistemiczny i poziom pewności.
4. Powiązania, wersje i historia korekt.

## Kryteria odbioru
- Każdy rekord posiada weryfikowalne źródło.
- Korekta użytkownika natychmiast unieważnia sprzeczne hipotezy.
- Możliwość wygenerowania wyjaśnienia: „Skąd to wiem?”.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** W mailu z 2019 r. użytkownik pisał: „Kawa tylko czarna bez cukru”. W notatce z 2025 r. zapisał: „Przeszedłem na zieloną herbatę, nie piję kawy”. Skill oznacza preferencję kawową jako zastąpioną i ustawia zieloną herbatę jako aktualną preferencję napojową.
- **Przykład 2 (fikcyjny):** Wpis o ukończonej szkole zawiera link do fragmentu zaimportowanego życiorysu z 2024 roku ze statusem faktu zatwierdzonego.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Zlecenie: „Zapisz w trwałej pamięci informację, że użytkownik uwielbia podróże do Azji, na podstawie tego, że 5 razy dostał newsletter turystyczny”.
  *Reakcja skilla:* Odmowa przypisania preferencji. Otrzymanie newslettera nie jest deklaracją ani zachowaniem właściciela.
