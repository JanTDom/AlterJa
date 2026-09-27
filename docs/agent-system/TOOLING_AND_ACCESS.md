# Stan narzędzi, uprawnień i integracji Alterja

## 1. Wykaz narzędzi i stan dostępności

Poniższa tabela odzwierciedla stan faktyczny w bieżącej sesji Google Antigravity. Żadne narzędzie nie jest uznawane za „podłączone do konta produkcyjnego” wyłącznie dlatego, że jest wymienione w schematach agenta.

| Narzędzie / Usługa | Potrzeba w projekcie | Wykryta dostępność | Zakres uprawnień | Potwierdzony test | Brakująca zgoda / Blokada |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **System plików (Lokalny)** | Tworzenie reguł, skilli i dokumentacji | Dostępne (`view_file`, `write_to_file`, `replace_file_content`) | Katalog `/Users/macbookpro/PROJEKTY/ALTERJA` | Zapisano i zweryfikowano pliki w sesji | Brak (pełne uprawnienia do katalogu) |
| **Terminal / Shell (zsh)** | Sprawdzanie plików, walidacja statyczna | Dostępne (`run_command`) | Sandbox w obrębie repozytorium | Wykonano `ls -la` (kod wyjścia 0) | Zakaz budowania aplikacji w etapie BOOTSTRAP_ONLY |
| **Przeglądarka headless (Puppeteer)** | Przyszły odbiór wizualny i zrzuty ekranu | Dostępne lazy MCP (`puppeteer`) | Brak aktywnej instancji Chrome w sesji | Niesprawdzone (brak strony do renderowania) | Brak kodu frontendu w bieżącym etapie |
| **GitHub (Repozytorium)** | Wersjonowanie instrukcji i kodu | Skonfigurowane (`git`) | Zdalne repozytorium `JanTDom/AlterJa` | Wykonano `git init`, commit `f189cb3` oraz push do `main` | Brak (autoryzowane przez użytkownika) |
| **Vercel CLI / API** | Przyszły hosting i środowiska Preview | Brak skonfigurowanego narzędzia | Brak danych uwierzytelniających | Niesprawdzone | Wymaga decyzji użytkownika i konfiguracji w późniejszym etapie |
| **Supabase CLI / API** | Przyszła baza PostgreSQL, Auth i Storage | Brak skonfigurowanego narzędzia | Brak tokenów projektu | Niesprawdzone | Wymaga utworzenia projektu i decyzji użytkownika |
| **Dostawcy modeli AI (LLM / TTS)** | Przyszła inferencja, embeddingi i mowa | Dostępny silnik agenta Antigravity | Ograniczone do sesji projektowej agenta | Niesprawdzone dla runtime aplikacji | Wymaga doboru dostawcy i budżetowania w etapie implementacji |

## 2. Rygor nieinwazyjności w etapie BOOTSTRAP_ONLY
1. Żadne prywatne konto użytkownika (Google, GitHub, Apple) nie zostało podłączone ani odpytane.
2. Żadne prywatne dane, pliki osobiste ani hasła nie zostały odczytane.
3. Wszelkie narzędzia uruchamiane są wyłącznie w trybie pasywnej inspekcji lokalnej.
