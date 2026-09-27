# Architektura danych, izolacja wielodostępna i zadania asynchroniczne Alterja

## 1. Izolacja użytkowników (Multi-Tenant Isolation)
- **Supabase / PostgreSQL Row Level Security (RLS):**
  - Każda tabela zawiera `user_id uuid references auth.users not null`.
  - Polityki RLS egzekwowane na poziomie bazy: `auth.uid() = user_id`.
  - Wyszukiwanie wektorowe (pgvector) musi zawierać warunek `WHERE user_id = auth.uid()` wewnątrz funkcji bazodanowej HNSW, a nie dopiero po pobraniu sąsiadów.
- **Supabase Storage:** Ścieżki w bucketach oparte na ID użytkownika (`user_id/...`) z politykami storage RLS.

## 2. Obsługa zadań długotrwałych i kolejek
- Importy setek maili, transkrypcje audio i indeksowanie pamięci nie mogą działać w pojedynczym żądaniu HTTP.
- Zastosowanie trwałej kolejki zadań (np. PostgreSQL + pg_boss / Upstash QStash) z mechanizmem idempotencji i ponawiania z wykładniczym opóźnieniem (*exponential backoff*).
- Zabezpieczenie przed podwójnym naliczeniem kosztów API zewnętrznych dostawców.
