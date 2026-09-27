# Wytyczne przetwarzania głosu i multimodalności w Alterja

## 1. Architektura syntezy i transkrypcji mowy
- **Standardy jakościowe głosu:**
  - Kategoryczny zakaz używania domyślnego syntezatora systemowego przeglądarki (`window.speechSynthesis`) ze względu na sztuczność i brak powtarzalności.
  - Zastosowanie profesjonalnego, neuronowego silnika mowy (np. ElevenLabs z modelem wielojęzycznym v2) z automatycznym mechanizmem przełączania awaryjnego (np. OpenAI TTS-1-HD).
- **Transkrypcja i diarization:**
  - Rozpoznawanie wielu mówców (diarization): wypowiedzi rozmówców muszą być odseparowane od głosu właściciela.
  - Polska fonetyka i poprawna wymowa nazwisk, dat i skrótowców.

## 2. Granice etyczne klonowania głosu
- Klon głosu właściciela wymaga odrębnej, jednoznacznej i weryfikowalnej zgody biometrycznej.
- Bezwzględny zakaz wykorzystywania klonu głosu do procedur uwierzytelniania bankowego, weryfikacji tożsamości czy wprowadzania w błąd osób trzecich.
- Każda wygenerowana wypowiedź głosowa musi zawierać metadane i znak wodny wskazujący na treść syntetyczną.
