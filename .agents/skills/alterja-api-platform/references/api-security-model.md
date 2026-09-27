# Standardy architektury API i profili udostępniania w Alterja

## 1. Zasada selektywnej reprezentacji (Selective Persona Scopes)
API nie jest bramą do pełnej tożsamości, lecz precyzyjnie wykrojonym kontraktem:
- `persona:style:apply` — przekształcenie tekstu klienta w styl właściciela bez ujawniania biografii.
- `persona:memory:query` — przeszukanie wyłącznie dozwolonych kategorii wspomnień z określonego przedziału dat.
- `persona:preference:predict` — prognoza wyboru w wąskim kontekście (np. preferencje kulinarne lub estetyczne).
- `persona:reconstruction:dialogue` — oznaczony dialog z syntetyczną rekonstrukcją w ramach określonego limitu żądań.

## 2. Standardy techniczne i bezpieczeństwo
- **Specyfikacja:** OpenAPI 3.1 (zob. [references/api-security-model.md](./references/api-security-model.md)).
- **Autoryzacja:** OAuth 2.0 z RFC 9700 (Best Current Practice).
- **Zasada Zero-Trust:** Podany identyfikator użytkownika nie daje uprawnień; uprawnienie wynika wyłącznie z kryptograficznie zweryfikowanego tokena i aktywnych zgód.
- **Idempotencja i budżet:** Nagłówki `Idempotency-Key` dla operacji mutujących oraz twarde limity budżetowe (rate-limits i token-budgets).
