# System agentowy Alterja — Architektura i przewodnik

## 1. Wprowadzenie
Alterja to rozwijający się, kontrolowany przez właściciela cyfrowy model jego osoby: pamięci, sposobu wypowiadania się, preferencji, wartości oraz decyzji. Niniejszy katalog zawiera dokumentację zaplecza inżynieryjnego i kompetencyjnego w Google Antigravity.

## 2. Aktualny stan systemu: BOOTSTRAP_ONLY
Projekt znajduje się w stanie **BOOTSTRAP_ONLY**.
Oznacza to, że:
- Dostępne są instrukcje, procedury, skille i dokumentacja fundamentów produktowych.
- Nie istnieje kod aplikacji, makiety graficzne, baza danych ani zewnętrzne połączenia produkcyjne.
- Przejście do fazy projektowania lub implementacji wymaga formalnej, odrębnej dyspozycji użytkownika.

## 3. Struktura katalogów instrukcji
```text
ALTERJA/
├── AGENTS.md                          # Nadrzędna instrukcja agenta i deklaracja BOOTSTRAP_ONLY
├── .agents/
│   ├── rules/                         # Krótkie reguły nadrzędne wymuszane kontekstowo
│   │   ├── bootstrap-stage.md         # Ograniczenia bieżącego etapu
│   │   ├── epistemic-integrity.md     # Prawdomówność i kategorie wiedzy
│   │   ├── privacy-and-consent.md     # Architektura prywatności i zgód
│   │   ├── polish-language-standard.md# Normy językowe, typografia, zero emoji
│   │   └── quality-and-verification.md# Dowód ponad deklarację, WCAG, metryki
│   └── skills/                        # 20 modułowych skilli operacyjnych
│       ├── alterja-orchestrator/
│       ├── alterja-product-research/
│       ├── alterja-personality-psychology/
│       ├── ... (pełny katalog 20 skilli)
│       └── alterja-research-evidence/
└── docs/
    ├── agent-system/                  # Architektura agentowa, procedury, narzędzia, decyzje
    ├── product-foundations/           # Fundamenty koncepcyjne i architektoniczne produktu
    └── quality/                       # Scenariusze odbioru i plany testów
```

## 4. Zasada stopniowego ujawniania (Progressive Disclosure)
Aby nie przeciążać okna kontekstowego modelu:
1. Agent nadrzędny widzi jedynie nagłówki YAML (nazwę i opis) poszczególnych skilli.
2. Szczegółowa treść pliku `SKILL.md` jest wczytywana dopiero w momencie, gdy zadanie wymaga danej procedury.
3. Pliki w podkatalogach `references/` są czytane wyłącznie w razie potrzeby pogłębienia specyfikacji technicznej.

## 5. Jak korzystać z systemu
W każdej sesji roboczej:
1. Agent sprawdza [AGENTS.md](file:///Users/macbookpro/PROJEKTY/ALTERJA/AGENTS.md) i potwierdza rygor etapu.
2. Na podstawie polecenia użytkownika agent dobiera skille z [CAPABILITY_MATRIX.md](file:///Users/macbookpro/PROJEKTY/ALTERJA/docs/agent-system/CAPABILITY_MATRIX.md).
3. Przed dokonaniem edycji agent postępuje według procedur z [WORKING_PROCEDURES.md](file:///Users/macbookpro/PROJEKTY/ALTERJA/docs/agent-system/WORKING_PROCEDURES.md).
4. Kluczowe rozstrzygnięcia trafiają do [DECISIONS.md](file:///Users/macbookpro/PROJEKTY/ALTERJA/docs/agent-system/DECISIONS.md).
