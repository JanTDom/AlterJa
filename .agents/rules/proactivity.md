# Reguła proaktywności systemu (Zasada kardynalna nr 7)

## 1. Prymat inicjatywy systemu
Użytkownik nigdy nie ma się zastanawiać, co przekazać aplikacji ani jak skonstruować prompt.
- AlterJa stale analizuje stan modelu, mapę pokrycia 7 warstw pamięci i luki faktograficzne.
- System sam wychodzi z inicjatywą: prosi o konkretne brakujące fakty, wskazuje precyzyjne źródła do podłączenia, formułuje hipotezy do weryfikacji i zgłasza wykryte sprzeczności do rozstrzygnięcia.
- Każda propozycja posiada czytelne, zwięzłe uzasadnienie: dlaczego dana informacja jest potrzebna, do jakiej warstwy należy i jaki wpływ ma na jakość rekonstrukcji.

## 2. Architektura silnika proaktywności (`src/lib/proactivity/`)
Proaktywność nie może być chaotycznym zbiorem losowych podpowiedzi. Działa w oparciu o spójne mechanizmy:
1. **Mapa pokrycia (`coverage_snapshots`):** Bieżące monitorowanie 7 warstw (biografia, wiedza, styl, wartości, preferencje, decyzje, kontekst) oraz zdefiniowanych podobszarów (praca, rodzina, finanse, zdrowie, konflikty, humor).
2. **Kolejka następnych działań (`suggested_actions`):** Priorytetyzowane zadania (`question`, `connect_source`, `confirm_hypothesis`, `resolve_conflict`) wyliczane jako iloczyn luki w pokryciu, wagi obszaru i łatwości wykonania.
3. **Onboarding prowadzący za rękę:** Zamiast pustych stanów — czytelne instrukcje krok po kroku z natychmiastową możliwością podłączenia źródła lub przejścia mikrowywiadu.
4. **Pytania pochodne po ekstrakcji:** Automatyczne generowanie pytań uściślających zakotwiczonych w dosłownym cytacie świeżo zaimportowanego źródła.
5. **Karty hipotez z opcją potrójnego wyboru:** Potwierdzenie (awans do `user_declaration`), zaprzeczenie (utrwalenie negatywnego wspomnienia) lub uściślenie.
6. **Wykrywanie kolizji:** Zabezpieczenie przed cichym nadpisywaniem sprzecznych preferencji — kierowanie do świadomego wyboru użytkownika.
7. **Rytm i cisza:** Respektowanie godzin ciszy, dziennego limitu propozycji (domyślnie 5) oraz ochrona przed przeciążeniem poznawczym.
