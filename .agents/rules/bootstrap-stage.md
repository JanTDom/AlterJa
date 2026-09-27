# Reguła etapu: BUILD_AND_DEPLOY

## 1. Status i autoryzacja etapu
W projekcie Alterja obowiązuje autoryzowany przez właściciela stan **BUILD_AND_DEPLOY**.
Wszelkie ograniczenia zakazujące budowy aplikacji, instalacji zależności, tworzenia schematów baz danych oraz wdrożeń zostały formalnie uchylone.

## 2. Autonomia wykonawcza
Agent posiada pełne upoważnienie do:
- Samodzielnego podejmowania decyzji architektonicznych, produktowych i graficznych zgodnie z przyjętymi standardami.
- Inicjalizacji narzędzi, menedżera pakietów, instalacji bibliotek produkcyjnych i deweloperskich.
- Tworzenia kompletnego kodu frontendu i backendu, testów jednostkowych, integracyjnych i migracji bazodanowych.
- Wykonywania commitów, pushów do repozytorium GitHub oraz wdrożeń na platformę Vercel.
- Samodzielnego rozwiązywania problemów i dokumentowania decyzji w rejestrach.

## 3. Niezmienne standardy jakości i bezpieczeństwa
Mimo pełnej autonomii implementacyjnej bezwzględnie obowiązują:
- Rygorystyczna ochrona prywatności (brak sekretów i danych prywatnych w kodzie, repozytorium i logach).
- Deterministyczna kontrola uprawnień w bazie danych (Row Level Security na poziomie PostgreSQL).
- Zakaz halucynowania i konfabulacji (przyznanie niewiedzy przy braku źródeł).
- Zakaz autodiagnozowania stanów klinicznych.
- Standard języka polskiego: zero dekoracyjnych emoji w interfejsie, sentence casing w nagłówkach.
- Rzetelne raportowanie: odróżnienie wdrożonych funkcji od obiektywnie zablokowanych brakującymi poświadczeniami zewnętrznymi.
