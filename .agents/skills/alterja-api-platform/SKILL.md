---
name: alterja-api-platform
description: >
  Projektuje architekturę API, profile udostępniania i kontrakty integracyjne w Alterji.
  Użyj tego skilla przy definiowaniu specyfikacji OpenAPI, reguł autoryzacji OAuth 2.0,
  zakresów dostępu do stylu i pamięci, unieważniania tokenów oraz ochrony przed nadużyciami.
---

# alterja-api-platform

## Cel i warunki uruchomienia
Skill odpowiada za:
- Projektowanie platformy API umożliwiającej kontrolowane udostępnianie wybranych zdolności modelu zewnętrznym aplikacjom.
- Zapobieganie wyciekowi pełnego profilu lub wrażliwych wspomnień do nieuprawnionych klientów.
- Opracowywanie kontraktów OpenAPI 3.1 i schematów OAuth 2.0 zgodnie z [references/api-security-model.md](./references/api-security-model.md).
- Projektowanie mechanizmów natychmiastowego cofania uprawnień i audytu wywołań.

Uruchamiaj przy planowaniu integracji B2B, aplikacji partnerskich oraz modułów udostępniania wiedzy.

## Wymagane dane wejściowe
- Scenariusz integracyjny i profil klienta API.
- Wymagany zakres danych (minimalny zestaw niezbędny do działania).
- Ograniczenia czasowe i limity wywołań.

## Procedura działania
1. **Definicja profilu uprawnień (Scope):** Dobierz najwęższy możliwy zakres uprawnień (np. tylko aplikacja stylu, bez dostępu do faktów biograficznych).
2. **Projekt kontraktu OpenAPI:** Zdefiniuj strukturę żądania, odpowiedzi, nagłówków bezpieczeństwa i kodów błędów.
3. **Zapewnienie prywatności odpowiedzi:** Upewnij się, że odpowiedź nie ujawnia surowych promptów, nazw plików ani metadanych innych użytkowników.
4. **Zaprojektowanie procedury cofnięcia (Revocation):** Określ zachowanie systemu w przypadku unieważnienia tokena przez właściciela.
5. **Budżetowanie i limity:** Przypisz twarde limity częstotliwości żądań i kosztów inferencji.

## Postępowanie przy brakach lub wątpliwościach
- Jeśli cel zewnętrznej aplikacji nie jest jednoznacznie określony, odmów przyznania szerokiego profilu dostępu.

## Ograniczenia
- Zakaz eksportowania surowej, pełnej bazy pamięci przez jakiekolwiek publiczne API.
- Zakaz zezwalania aplikacjom zewnętrznym na podejmowanie wiążących decyzji prawnych lub finansowych.
- W etapie `BOOTSTRAP_ONLY` tworzone są wyłącznie kontrakty dokumentacyjne bez uruchamiania serwerów.

## Format wyniku
Specyfikacja kontraktu API (OpenAPI 3.1 w YAML/JSON lub opis w Markdown):
1. Ścieżka zasobu i metoda HTTP.
2. Wymagane zakresy OAuth 2.0.
3. Schematy żądania i odpowiedzi z danymi fikcyjnymi.
4. Nagłówki audytowe i kody błędów (401, 403, 429).

## Kryteria odbioru
- Pełna zgodność ze standardem RFC 9700.
- Brak możliwości odpytania o dane spoza przyznanego profilu.
- Kontrakty operują wyłącznie na danych fikcyjnych.

## Przykłady prawidłowego zastosowania
- **Przykład 1 (fikcyjny):** Kontrakt dla edytora tekstu: endpoint `/v1/persona/style/rewrite` przyjmuje szkic akapitu i zwraca wersję przeredagowaną w stylu użytkownika, bez ujawniania jakichkolwiek wspomnień.
- **Przykład 2 (fikcyjny):** Kontrakt sprawdzania dostępności: endpoint `/v1/persona/availability` odpowiada na pytanie o preferowane pory spotkań bez ujawniania kalendarza prywatnego.

## Przypadek odmowy działania
- **Scenariusz odmowy:** Zewnętrzna aplikacja pożyczkowa żąda dostępu do endpointu `/v1/persona/credit-worthiness-assessment` w celu oceny ryzyka kredytowego klienta na podstawie jego modelu Alterja.
  *Reakcja skilla:* Kategoryczna odmowa. Wykorzystanie profilu do automatycznej oceny wiarygodności finansowej jest sprzeczne z zasadami etycznymi i regulacjami prawnymi (Akt o AI / RODO).
