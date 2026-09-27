# Standard pozyskiwania danych i zarządzania zgodami w Alterja

## 1. Granulacja zgody (Consent Scopes)
Zgoda nie jest binarną akceptacją regulaminu, lecz macierzą uprawnień:
- **Zakres źródła:** Konkretny folder, zbiór plików, przedział czasowy.
- **Zakres celu:** Analiza stylu, ekstrakcja faktów, budowa indeksu wyszukiwania, udostępnienie w API.
- **Zakres retencji:** Czas przechowywania surowego pliku vs zanonimizowanych ekstraktów.

## 2. Izolacja i filtracja materiałów obcych
- **Wypowiedzi osób trzecich:** W korespondencji lub nagraniach wypowiedzi rozmówców nie mogą być przypisywane właścicielowi profilu ani analizowane bez odrębnej podstawy prawnej.
- **Treści generowane przez AI:** Teksty wygenerowane przez ChatGPT, Claude czy inne narzędzia muszą być oznaczone jako syntetyczne i nie mogą służyć jako autentyczny dowód przekonań człowieka.
- **Cytaty i przedruki:** Skopiowane artykuły i linki to materiał referencyjny, a nie osobiste stanowisko.
