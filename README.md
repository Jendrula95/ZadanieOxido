
# OpenAI HTML Article Processor

Aplikacja w Node.js do przetwarzania artykułu tekstowego, strukturyzowania go w HTML za pomocą API OpenAI, oraz generowania podglądu w formacie HTML.

## Opis działania

1. Aplikacja wczytuje treść artykułu z pliku `article.txt`.
2. Wysyła treść do API OpenAI, aby uzyskać sformatowaną wersję z odpowiednimi tagami HTML.
3. Generuje trzy pliki wyjściowe:
   - `artykul.html`: przetworzony artykuł w formacie HTML.
   - `szablon.html`: ogólny szablon HTML do użycia.
   - `podglad.html`: pełny podgląd artykułu osadzonego w szablonie.

## Instrukcja uruchomienia

1. **Zainstaluj wymagane oprogramowanie**:

   - Upewnij się, że Node.js jest zainstalowany (wersja 14 lub wyższa).
   - Zainstaluj menedżer pakietów `npm` (dołączony do Node.js).

2. **Pobierz projekt**:

   - Sklonuj repozytorium lub pobierz kod źródłowy i przejdź do katalogu projektu.

3. **Zainstaluj zależności**:

   - W terminalu wykonaj:
     npm install

   ```

   ```

4. **Dodaj klucz API OpenAI**:
   -Utwórz plik .env w katalogu głównym projektu.
   -Wpisz w nim swój klucz API:
   -API_KEY=twój-klucz-API

5. **Uruchom aplikacje**:

   - W terminalu wykonaj:
     node app.js

6. **Sprawdz pliki**:
   -Po uruchomieniu skryptu w katalogu projektu pojawią się następujące pliki:
   -artykul.html: sformatowany artykuł.
   -szablon.html: ogólny szablon HTML.
   -podglad.html: pełny podgląd artykułu osadzonego w szablonie.

   ## Problemy i rozwiązania

   **Błąd: Niewłaściwy klucz API**

   -Sprawdź, czy plik .env zawiera poprawny klucz API.

**Brak odpowiedzi z API**

-Sprawdź połączenie z internetem.
-Zweryfikuj, czy klucz API jest aktywny i ma wystarczające środki.
=======
# Oxido

