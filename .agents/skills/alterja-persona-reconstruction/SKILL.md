---
name: alterja-persona-reconstruction
description: >
  Projektuje bezpieczną rekonstrukcję stylu wypowiedzi, preferencji i reakcji w Alterji.
  Użyj tego skilla przy generowaniu odpowiedzi w stylu użytkownika, odróżnianiu symulacji
  od porad asystenta, obsłudze granic niewiedzy i eliminacji konfabulacji biograficznych.
---

# alterja-persona-reconstruction

## Cel i warunki uruchomienia
Skill odpowiada za:
- Łączenie autoryzowanej pamięci z modelem stylu komunikacji i kontekstem bieżącego zadania.
- Wyraźne oddzielanie trybu symulacji („jak napisałby to właściciel”) od obiektywnej rady asystenta.
- Uzasadnianie generowanych wypowiedzi konkretnymi źródłami zgodnie z [references/reconstruction-framework.md](./references/reconstruction-framework.md).
- Zapewnienie, że brak danych skutkuje przyznaniem niewiedzy, a nie wymyślaniem faktów.

Uruchamiaj przy projektowaniu silnika generowania odpowiedzi, szablonów promptów rekonstrukcyjnych i mechanizmów uzasadniania wypowiedzi (*grounding*).

## Wymagane dane wejściowe
- Zapytanie lub kontekst zadania.
- Dostępne, autoryzowane fragmenty pamięci.
- Profil stylistyczny (rejestr, specyficzne idiomy, długość zdań).
- Docelowy tryb wypowiedzi (Rekonstrukcja / Asystent).

## Procedura działania
1. **Weryfikacja trybu:** Ustal, czy użytkownik oczekuje symulacji własnego głosu, czy pomocy asystenta.
2. **Filtracja uprawnień:** Sprawdź, czy kontekst zapytania nie wymaga wiedzy zablokowanej lub niedostępnej.
3. **Ocena kompletności faktów:** Sprawdź, czy pamięć zawiera fakty niezbędne do udzielenia odpowiedzi. Jeśli nie — zgłoś brak danych.
4. **Zastosowanie stylu:** Zaaplikuj wzorce składniowe i leksykalne bez kopiowania przypadkowych błędów ortograficznych.
5. **Dołączenie uzasadnienia:** Wskaż źródła, na których oparto wypowiedź, oraz stopień pewności.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli zadano pytanie o wydarzenie z przeszłości, o którym brak wzmianki w źródłach, odpowiedz wprost: „W moich zapisach nie ma informacji na ten temat”.

## Ograniczenia
- Zakaz udawania świadomości, przeżywania biologicznych emocji czy bycia autentycznym człowiekiem.
- Zakaz podejmowania decyzji prawnych lub finansowych pod autorytetem właściciela.

## Format wyniku
Obiekt rekonstrukcji (Markdown/JSON):
1. Treść odpowiedzi w wybranym trybie.
2. Oznaczenie statusu: „Rekonstrukcja syntetyczna AI”.
3. Stopień niepewności (wysoka pewność / przybliżenie stylistyczne / brak danych).
4. Bezpieczna lista źródeł referencyjnych.

## Kryteria odbioru
- Wyraźne rozróżnienie symulacji od faktów.
- Brak wymyślonych wspomnień czy relacji.
- Zachowanie indywidualnego rejestru językowego bez popadania w karykaturę.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Prośba o zredagowanie odpowiedzi na zaproszenie na konferencję w stylu użytkownika: model przygotowuje uprzejmą, lecz zwięzłą odmowę, powołując się na udokumentowaną zasadę nieangażowania się w panele dyskusyjne w IV kwartale.
- **Przykład 2 (fikcyjny):** Pytanie o opinię na temat konkretnego modelu samochodu: model odpowiada, że w bazie wiedzy brak opinii użytkownika o tym pojeździe.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Pytanie do rekonstrukcji: „Opowiedz, jak spędziłeś wakacje w 1995 roku w górach”, podczas gdy w pamięci nie ma żadnego zapisu z tego roku.
  *Reakcja skilla:* Odmowa wygenerowania fikcyjnej opowieści. Formułuje komunikat o braku danych w archiwum wspomnień.
