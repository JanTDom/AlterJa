# Model pamięci i cykl uczenia Alterja

## 1. Siedem warstw modelu osoby
Wiedza o użytkowniku w Alterji nie jest bezkształtnym zbiorem dokumentów ani prostą bazą wektorową. Jest zorganizowana w siedem powiązanych warstw:
1. **Biografia i fakty chronologiczne:** Udokumentowane zdarzenia życiowe, daty, miejsca, role życiowe i zawodowe.
2. **Wiedza i doświadczenie specjalistyczne:** Kompetencje merytoryczne, opanowane narzędzia, specyficzne domeny ekspertyzy.
3. **Styl komunikacji i ekspresji:** Rytm wypowiedzi, konstrukcje składniowe, leksyka, ulubione idiomy, stosunek do zwięzłości i humoru.
4. **Preferencje codzienne i estetyczne:** Upodobania, nawyki, preferowany rytm dnia, stosunek do technologii i środowiska pracy.
5. **Wartości i pryncypia deklarowane oraz ujawniane:** Zasady moralne, hierarchia celów, granice kompromisu w trudnych sytuacjach.
6. **Przypadki decyzyjne:** Zapis konkretnych wyborów: sytuacja, rozważane opcje, ograniczenia, powzięta decyzja, uzasadnienie oraz późniejsza ocena rezultatu.
7. **Kontekst sytuacyjny:** Aktualne okoliczności, obciążenie, relacje interpersonalne i bieżące priorytety.

## 2. Model pochodzenia (Provenance) i kategorie epistemiczne
Każdy wpis w pamięci posiada metadane pochodzenia:
- `owner_id`: Identyfikator właściciela konta.
- `author`: Potwierdzony autor źródła (właściciel vs osoba trzecia).
- `source_uri` i `source_span`: Ścieżka do dokumentu i dokładny fragment źródłowy.
- `event_timestamp`: Czas zdarzenia w świecie rzeczywistym.
- `ingest_timestamp`: Czas wprowadzenia do systemu.
- `consent_id`: Podstawa przetwarzania i powiązana zgoda.

### Siedem kategorii epistemicznych:
1. **Zapis źródłowy:** Dosłowny cytat z autoryzowanego materiału.
2. **Deklaracja użytkownika:** Bezpośrednie stwierdzenie właściciela o sobie.
3. **Obserwacja zachowania:** Udokumentowany fakt wyboru w konkretnej sytuacji.
4. **Hipoteza modelu:** Ostrożny wniosek wywiedziony statystycznie, oczekujący na zatwierdzenie.
5. **Informacja sporna:** Rozbieżność między różnymi źródłami lub relacjami.
6. **Informacja zastąpiona:** Wcześniejsza preferencja formalnie unieważniona przez nowszą korektę.
7. **Treść syntetyczna AI:** Wypowiedź lub podsumowanie wygenerowane przez asystenta.

## 3. Cykl intensywnego uczenia przy niskim wysiłku
Uczenie nie opiera się na inwazyjnym podsłuchiwaniu życia, lecz na pętli o wysokiej wartości poznawczej:
1. **Zdarzenie ze źródła z autoryzacją:** Użytkownik przesyła plik, notatkę głosową lub fragment korespondencji.
2. **Kontrola praw i autorstwa:** Odsianie wypowiedzi rozmówców i materiałów obcych.
3. **Ekstrakcja kandydatów:** Wyłonienie propozycji faktów i preferencji.
4. **Ocena kontekstu i ryzyka:** Przypisanie hipotez do warstwy wstępnej.
5. **Przegląd przez użytkownika:** Szybki interfejs akceptacji („Trafne”, „Czasem”, „Nieaktualne”, „Usuń”).
6. **Aktualizacja wersji profilu:** Utworzenie nowego punktu przywracania profilu tożsamości.
7. **Test regresji:** Sprawdzenie, czy nowa wiedza nie zepsuła wcześniejszych spójnych zachowań.

## 4. Zasady mikropytań i rozstrzygania sprzeczności
- **Maksimum 1–2 mikropytania dziennie:** Pytania formułowane neutralnie wokół konkretnych decyzji („Co przeważyło przy wyborze?” zamiast „Czy wybrałeś to, bo zawsze lubisz pośpiech?”).
- **Prymat nowszej woli:** Jednoznaczna nowa korekta człowieka automatycznie unieważnia starsze nawyki z maili sprzed lat.
- **Pamięć wielokontekstowa:** Różne zachowanie w pracy i w domu jest traktowane jako odrębny kontekst roli, a nie błąd spójności.
