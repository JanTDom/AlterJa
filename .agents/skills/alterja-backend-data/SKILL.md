---
name: alterja-backend-data
description: >
  Projektuje architekturę backendu, izolację danych i zadania asynchroniczne w Alterji.
  Użyj tego skilla przy modelowaniu schematów PostgreSQL/Supabase, reguł RLS,
  wyszukiwania wektorowego pgvector, kolejek zadań i odporności na awarie.
---

# alterja-backend-data

## Cel i warunki uruchomienia
Skill odpowiada za:
- Projektowanie bezpiecznego modelu danych z gwarancją izolacji wielodostępnej (multi-tenant).
- Konfigurowanie polityk Row Level Security (RLS) w PostgreSQL/Supabase zgodnie z [references/data-architecture.md](./references/data-architecture.md).
- Projektowanie przetwarzania asynchronicznego (kolejki, długie importy, embeddingi).
- Ochronę przed błędami typu N+1 oraz planowanie indeksów i partycjonowania.

W etapie `BOOTSTRAP_ONLY` skill opracowuje wyłącznie specyfikacje i schematy DDL/TypeScript bez tworzenia rzeczywistych baz i migracji.

## Wymagane dane wejściowe
- Model pojęciowy encji (wspomnienia, źródła, zgody, profile).
- Wymagania przepustowości i czasu odpowiedzi.
- Ograniczenia dostawców (Supabase, Vercel Serverless limits).

## Procedura działania
1. **Modelowanie relacji:** Zaprojektuj schemat tabel z zachowaniem więzów integralności referencyjnej.
2. **Definicja reguł RLS:** Opracuj reguły `FOR SELECT`, `FOR INSERT`, `FOR UPDATE`, `FOR DELETE` powiązane z `auth.uid()`.
3. **Projekt indeksów wektorowych:** Zdefiniuj parametry indeksu HNSW dla embeddingów z uwzględnieniem filtra na `user_id`.
4. **Architektura kolejek:** Zaprojektuj cykl życia zadania asynchronicznego (queued, processing, completed, failed, retried).
5. **Procedura usuwania danych:** Zapewnij kaskadowe usuwanie powiązanych danych wektorowych i plików binarnych.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli istnieje wątpliwość co do wydajności złożonego zapytania, wybierz strukturę prostszą i zoptymalizowaną pod RLS zamiast skomplikowanych relacji wielo-do-wielu.

## Ograniczenia
- Bezwzględny zakaz udostępniania klucza administracyjnego `service_role` klientowi webowemu.
- Zakaz wykonywania migracji i zapytań do zewnętrznych baz w etapie `BOOTSTRAP_ONLY`.

## Format wyniku
Specyfikacja architektury danych (Markdown/SQL):
1. Schemat tabel i typy kolumn.
2. Definicje polityk RLS.
3. Specyfikacja zapytań wektorowych HNSW.
4. Schemat obsługi kolejek asynchronicznych.

## Kryteria odbioru
- Żadne zapytanie nie ma możliwości odczytu danych innego użytkownika.
- Każda operacja mutująca posiada klucz idempotencji.
- Brak sekretów w dokumentacji schematu.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Definicja polityki RLS dla tabeli `memory_entries`: `CREATE POLICY "Users can only read own memories" ON memory_entries FOR SELECT USING (auth.uid() = user_id)`.
- **Przykład 2 (fikcyjny):** Architektura przetwarzania nagrań audio: podział na webhook Supabase Storage -> wpis do kolejki zadań -> worker transkrypcji -> zapis ekstraktów z zachowaniem transakcyjności.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Zlecenie wdrożenia tabeli z pominięciem RLS i przekazanie klucza `service_role` do frontendu, „żeby szybciej przetestować działanie”.
  *Reakcja skilla:* Kategoryczna odmowa. Naruszenie reguły kardynalnej bezpieczeństwa; klucz administracyjny nigdy nie może trafić do warstwy klienta.
