APIs:
https://api.rawg.io/docs/?format=openapi

- currently used: https://rawg.io/apidocs
- https://api.rawg.io/docs/
- to check in the future: https://www.freetogame.com/api-doc
- to check in the future: https://www.igdb.com/api

API Key:
https://rawg.io/@kaczmar11/apikey

# Do projektowania strony

- [nie-free] Relume – wpisujesz opis strony, a dostajesz gotowy wireframe + komponenty w stylu Tailwind.

- Uizard – generuje UI z opisu tekstowego lub szkicu, idealne do szybkiego prototypowania.
- Framer AI – generuje cały layout strony (hostowanej w Framerze) z opisu promptem.
- TeleportHQ – AI + no-code builder, eksport do React/Next.js.
- Vercel v0 – wpisujesz prompt, a otrzymujesz gotowy komponent React (Tailwind + shadcn/ui). Bardzo fajne dla devów.

  5. Raz na jakiś czas (dziennie? tygodniowo?) aktualizowane są dane z RAWG co do wszystkich gier, które są w bazie

--- ogarnac zmiany configu z pliku tailwind.config.js na css
tailwindscss.com/blog/tailwindcss-v4

1. ogarnac jakiegos scrappera na metacritic
2. lepiej ogarnac stylowanie karty z gra - glownie chodzi tutaj o przyciski resetowania stanu i usuwania karty z biblioteki
3. ogarnac jakie gry gralem na PS i dodac do biblioteki
4. napisac testy be
5. napisac testy fe
6. hostowac backend
7. hostowac frontend
8. ogarnac wysylanie zapytania do api po zmianie karty --- jakos tak, zeby te karty nie skakaly - nie mam pomyslu jak to powinno dzialac, ale obecnie jest to troche problematyczne :/ najlepiej wpisac w filtrach 'marvel' i zobaczyc jak to dziala jak dla jednej karty zmieniasz status
