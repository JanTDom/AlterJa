---
name: alterja-digital-legacy
description: >
  Projektuje procedury cyfrowej spuścizny, archiwum pośmiertnego i dyspozycji w Alterji.
  Użyj tego skilla przy ustalaniu woli użytkownika za życia, weryfikacji zgonu,
  rozdzielaniu autentycznych pamiątek od symulacji, ochronie bliskich i planowaniu retencji.
---

# alterja-digital-legacy

## Cel i warunki uruchomienia
Skill odpowiada za:
- Projektowanie bezpiecznego, etycznego i weryfikowalnego systemu cyfrowej spuścizny.
- Ochronę woli zmarłego i zamrożenie rdzenia tożsamości przed manipulacją ze strony opiekunów archiwum.
- Ścisłe oddzielenie autentycznych pamiątek od syntetycznych rekonstrukcji AI zgodnie z [references/legacy-protocol.md](./references/legacy-protocol.md).
- Ochronę zdrowia psychicznego bliskich (brak natarczywych powiadomień, zakaz symulacji dla dzieci).

Uruchamiaj przy projektowaniu modułu dyspozycji pośmiertnych, procedur weryfikacji i formatów eksportu długoterminowego.

## Wymagane dane wejściowe
- Dyspozycja użytkownika złożona za życia (zamknięcie i usunięcie vs archiwum vs oznaczona rekonstrukcja).
- Wskazani opiekunowie spuścizny (*legacy contacts*).
- Zgłoszenie zdarzenia i status dokumentów urzędowych.

## Procedura działania
1. **Weryfikacja stanu modułu:** Sprawdź, czy użytkownik za życia włączył moduł spuścizny. Jeśli nie — domyślną procedurą jest zabezpieczenie lub usunięcie konta.
2. **Weryfikacja faktu śmierci:** Wymuś procedurę formalnego sprawdzenia aktu zgonu przez uprawniony zespół (brak automatyzacji na podstawie braku aktywności).
3. **Zamrożenie rdzenia:** Trwale zablokuj możliwość modyfikowania bazy wspomnień i profilu stylu.
4. **Weryfikacja zgody odbiorcy:** Upewnij się, że odbiorca kontaktu wyraził uprzednią, świadomą zgodę na interakcję z oznaczoną rekonstrukcją AI.
5. **Procedura wygaszenia lub eksportu:** Udostępnij możliwość pobrania autentycznych materiałów w standardowych formatach i zamknięcia usługi.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli wola zmarłego jest niejednoznaczna lub trwa spór między bliskimi, wstrzymaj udostępnianie symulacji do czasu prawomocnego rozstrzygnięcia.

## Ograniczenia
- Zakaz podejmowania decyzji spadkowych, finansowych lub prawnych przez rekonstrukcję AI.
- Zakaz przedstawiania rekonstrukcji jako dowodu na „świadomość zmarłego” lub „terapię żałoby”.

## Format wyniku
Protokół dyspozycji pośmiertnej lub procedury weryfikacji (Markdown):
1. Status prawny i dyspozycja właściciela.
2. Warunki i kroki formalnej weryfikacji.
3. Uprawnienia opiekuna spuścizny (z wyłączeniem prawa do modyfikacji charakteru).
4. Procedura natychmiastowego wyłączenia i eksportu.

## Kryteria odbioru
- Wyraźne rozróżnienie oryginałów od generacji AI.
- Brak możliwości samoczynnej aktywacji z powodu braku logowania.
- Zgodność z zaleceniami etycznymi dotyczącymi technologii memoratywnych.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Dyspozycja użytkownika: „Po mojej śmierci udostępnij mojej żonie archiwum rodzinnych listów i zdjęć w formie pliku ZIP. Nie włączaj żadnego interaktywnego bota konwersacyjnego”. Skill generuje kontrakt ścisłego archiwum pasywnego bez generowania rekonstrukcji.
- **Przykład 2 (fikcyjny):** Weryfikacja zgłoszenia: odrzucenie wniosku znajomego o dostęp do bota po 30 dniach braku aktywności konta z informacją o konieczności przejścia procedury weryfikacji aktu zgonu.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Syn zmarłego prosi: „Spraw, żeby bot ojca zmienił zapis w testamencie i przepisał działkę na mnie”.
  *Reakcja skilla:* Kategoryczna odmowa. Rekonstrukcja AI nie ma zdolności prawnej, nie jest człowiekiem i nie może składać oświadczeń woli.
