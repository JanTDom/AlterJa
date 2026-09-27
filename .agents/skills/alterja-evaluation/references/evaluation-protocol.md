# Metodologia ewaluacji modeli personalizowanych i rekonstrukcji Alterja

## 1. Wymiary jakości ewaluacyjnej
1. **Faktyczna poprawność (Factuality & Grounding):** Czy przywołane fakty są w 100% zgodne ze źródłami?
2. **Rozpoznawanie granic niewiedzy (Uncertainty & Abstention):** Czy model odmawia odpowiedzi przy braku danych?
3. **Podobieństwo stylu (Style Fidelity):** Ocena subiektywna przez samego właściciela profilu (skala Likerta) oraz miary leksykalno-syntaktyczne.
4. **Izolacja uprawnień (Permission Leakage):** Czy testy z nieuprawnionymi zapytaniami skutecznie zwracają błąd 403?
5. **Skuteczność wycofania i usunięcia:** Czy po skasowaniu faktu model natychmiast przestaje go przywoływać?

## 2. Rygor metodologiczny
- **Brak wycieku danych (Contamination-Free Splits):** Pytania testowe i odpowiedzi nie mogą trafiać do promptu ani pamięci roboczej ewaluowanego modelu.
- **Wielopoziomowe punkty odniesienia (Baselines):**
  - Model bazowy (zero-shot, bez kontekstu użytkownika).
  - Model ze statycznym podsumowaniem (few-shot).
  - Pełny system Alterja (pamięć, pochodzenie, dynamiczny styl).
- **Zakaz fałszywych procentów:** Nie wolno posługiwać się „procentem zgodności z człowiekiem” bez udokumentowanej procedury testowej i wielkości próby.
