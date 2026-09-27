# Model pochodzenia pamięci i rozstrzygania sprzeczności Alterja

## 1. Metadane pochodzenia (Memory Provenance Schema)
Każdy element pamięci zawiera:
- `id`: Unikalny identyfikator wpisu.
- `owner_id`: Identyfikator właściciela konta.
- `source_ref`: Odniesienie do dokumentu źródłowego i dokładnego fragmentu.
- `author`: Potwierdzony autor (właściciel vs osoba trzecia).
- `event_time`: Czas zdarzenia (jeśli znany).
- `ingest_time`: Znacznik czasu pozyskania.
- `epistemic_status`: Kategoria (fakt źródłowy, deklaracja, hipoteza, zastąpione).
- `confidence`: Opisowy poziom pewności (potwierdzone / prawdopodobne / sporne).
- `consent_id`: Identyfikator powiązanej zgody.

## 2. Zasady rozstrzygania sprzeczności
1. **Prymat nowszej korekty:** Jednoznaczna, późniejsza deklaracja użytkownika ma pierwszeństwo przed starymi mailami.
2. **Kontekst sytuacji:** Różne zachowania w różnych rolach (np. praca vs dom) nie są sprzecznością, lecz odrębnymi profilami kontekstowymi.
3. **Pamięć wersji:** Historia zmian nie może blokować prawa do bycia zapomnianym (usunięcie musi kaskadowo kasować encję, wektory i powiązania).
