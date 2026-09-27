# Rejestr znanych blokad i zależności zewnętrznych (KNOWN_BLOCKERS)

> **Zasada naczelna:** Obiektywna blokada zewnętrzna nie wstrzymuje budowy aplikacji. Zależna funkcja pozostaje bezpiecznie oznaczona lub korzysta z deterministycznego trybu demonstracyjnego/syntetycznego, a pozostała część systemu jest w pełni budowana i wdrażana.

## 1. Stan poświadczeń zewnętrznych

| Poświadczenie / Usługa | Wymagane do | Stan wykryty | Rozwiązanie / Stan awaryjny |
| :--- | :--- | :--- | :--- |
| **Vercel CLI** | Wdrożenie preview i produkcyjne | Zalogowano (`jandomaniewski-3164`) | Bezpośrednie wdrożenie przez CLI (`vercel deploy`) |
| **GitHub Remote** | Wersjonowanie kodu | Połączono i wypchnięto | Ciągła synchronizacja przez `git push origin main` |
| **Supabase URL & Keys** | Zdalna baza PostgreSQL & Auth w chmurze | Brak bezpośredniego env w sesji | Przygotowano pełny zestaw migracji SQL (`supabase/migrations/`) oraz hybrydowy klient DB z wbudowanym silnikiem pamięci podręcznej/symulacji dla testów i podglądu |
| **GEMINI_API_KEY** | Rzeczywista inferencja modeli Gemini | Brak env w bieżącej sesji | Serwerowy adapter Gemini z pełną obsługą formatów oraz deterministycznym silnikiem testów syntetycznych, gdy klucz nie jest zdefiniowany |
| **DNS domeny alterja.pl** | Skierowanie domeny na serwery Vercel | Do sprawdzenia w Vercel Domains | Podpięcie domeny w projekcie Vercel; w razie oczekiwania na propagację DNS aplikacja dostępna pod domeną Vercel (`*.vercel.app`) |
