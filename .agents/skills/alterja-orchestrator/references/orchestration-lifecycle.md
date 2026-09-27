# Wytyczne orkiestracji i zarządzania etapami Alterja

## 1. Zasada minimalnego zestawu skilli
Każde zadanie powinno angażować wyłącznie skille niezbędne do rozwiązania problemu. Unikaj ładowania całego systemu instrukcji do kontekstu.

## 2. Bramki decyzyjne i cykl życia projektu
Przejście między kolejnymi etapami wymaga jednoznacznej autoryzacji użytkownika:
1. **Wyposażenie (BOOTSTRAP_ONLY):** Przygotowanie instrukcji, reguł i scenariuszy kontroli.
2. **Koncepcja i zakres:** Zdefiniowanie granic MVP i hipotez badawczych.
3. **Projekt wizualny i system tokenów:** Przygotowanie i akceptacja kierunku artystycznego oraz komponentów.
4. **Implementacja i architektura:** Kodowanie weryfikowane testami jednostkowymi i integracyjnymi.
5. **Weryfikacja jakościowa:** Audyty WCAG 2.2 AA, Core Web Vitals, testy regresji AI.
6. **Wdrożenie i produkcja:** Podgląd, staging i formalna zgoda na wydanie produkcyjne.

## 3. Prowadzenie rejestru decyzji (ADR)
Każda istotna decyzja musi zostać zapisana w `docs/agent-system/DECISIONS.md` ze wskazaniem kontekstu, alternatyw, wybranego rozwiązania i konsekwencji.
