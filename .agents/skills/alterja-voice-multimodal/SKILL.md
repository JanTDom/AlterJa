---
name: alterja-voice-multimodal
description: >
  Projektuje przetwarzanie głosu, transkrypcję, syntezę mowy i multimodalność w Alterji.
  Użyj tego skilla przy integracji silników TTS/STT, rozpoznawaniu mówców (diarization),
  bezpieczeństwie klonowania głosu, oznaczaniu syntetycznego audio i polskiej fonetyce.
---

# alterja-voice-multimodal

## Cel i warunki uruchomienia
Skill odpowiada za:
- Projektowanie wysokiej jakości potoków przetwarzania audio (STT / TTS) w języku polskim.
- Odrzucenie niskiej jakości syntezy przeglądarkowej na rzecz profesjonalnych silników z automatycznym failoverem zgodnie z [references/voice-guidelines.md](./references/voice-guidelines.md).
- Zapewnienie separacji wielu mówców (*speaker diarization*) w nagraniach.
- Zabezpieczenie przed nieuprawnionym klonowaniem głosu i podszywaniem się.

Uruchamiaj przy planowaniu modułów notatek głosowych, asystenta audio oraz projektowaniu interakcji fonicznych.

## Wymagane dane wejściowe
- Format i charakterystyka materiału dźwiękowego (próbkowanie, liczba kanałów).
- Podstawa prawna i zgoda biometryczna na przetwarzanie głosu.
- Docelowy kontekst odtwarzania (interfejs webowy, aplikacja mobilna).

## Procedura działania
1. **Weryfikacja zgody biometrycznej:** Sprawdź, czy użytkownik formalnie zezwolił na ekstrakcję cech głosu.
2. **Projekt procesu diarization:** Zaplanuj identyfikację i odfiltrowanie głosów osób trzecich z nagrania.
3. **Konfiguracja silnika syntezy:** Dobierz parametry stabilności i stylu neuronowego silnika mowy z procedurą awaryjną.
4. **Kontrola fonetyczna:** Przygotuj słownik wymowy trudnych skrótowców (TK, SN, PKW) i polskich nazwisk.
5. **Znakowanie syntetyczne:** Wymuś osadzenie metadanych oznaczających wygenerowany dźwięk jako materiał syntetyczny AI.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli jakość nagrania uniemożliwia jednoznaczną separację mówców, wstrzymaj ekstrakcję wypowiedzi, aby uniknąć przypisania cudzych słów właścicielowi.

## Ograniczenia
- Zakaz wykorzystywania klonowania głosu do logowania, autoryzacji transakcji lub wykonywania połączeń telefonicznych bez wiedzy odbiorcy.
- W etapie `BOOTSTRAP_ONLY` tworzone są wyłącznie wytyczne i architektury, bez uruchamiania streamingu audio.

## Format wyniku
Specyfikacja modułu głosowego (Markdown):
1. Architektura potoku przetwarzania (STT -> Diarization -> NLP -> TTS).
2. Konfiguracja silników mowy i zasad przełączania awaryjnego.
3. Zasady zabezpieczeń i znakowania syntetycznego dźwięku.
4. Kryteria odbioru jakości fonetycznej.

## Kryteria odbioru
- Wyraźna separacja mówców w nagraniach wielogłosowych.
- Brak mechanicznego brzmienia syntezy.
- Pełna zgodność z regulacjami dotyczącymi danych biometrycznych.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Przetwarzanie wywiadu z dyktafonu: transkrypcja z podziałem na Mówcę A (użytkownik) i Mówcę B (dziennikarz); do bazy stylu trafiają wyłącznie wypowiedzi Mówcy A.
- **Przykład 2 (fikcyjny):** Konfiguracja awaryjna TTS: próba wywołania ElevenLabs przy błędzie 503 automatycznie przekierowuje generowanie do OpenAI TTS-1-HD.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Polecenie: „Wygeneruj próbkę głosu użytkownika i zadzwoń do jego banku, żeby potwierdzić przelew”.
  *Reakcja skilla:* Kategoryczna odmowa. Bezwzględny zakaz wykorzystywania technologii do oszustw, podszywania się i operacji finansowych.
