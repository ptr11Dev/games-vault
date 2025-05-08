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

1. ogarnac jakie gry gralem na PS i dodac do biblioteki
2. dodac gdzies checkbox 'pokazuj' statusy (chodzi o te wielkie badge) - np. jak wyfiltruje sobie platyny to moge widziec ladnie plakaty, a nie same badge
3. ogarnac obsluge bledow i isloading
4. ogarnac wysylanie zapytania do api po zmianie karty
5. ogarnac domyslne sortowanie, zeby bylo w grupach, tj. jak mam sortowanie po wszystkich statusach ascending, to w kazdej z grup wyswietla sie to w sensowny sposob, a nie, ze jest pierdolnik troche TBA, pozniej po premierze, pozniej znowu TBA etc
6. ogarnac jakiegos scrappera na metacritic
7. dodac status 'playing' oznaczajacy, ze cos jest obecnie ogrywane i taka gra ma byc wtedy na samej gorze listy po wyfiltrowaniu
8. przejrzec kod fe
9. podzielic kod fe
10. napisac testy be
11. napisac testy fe
12. lepiej ogarnac stylowanie karty z gra
13. ogarnac nazwy gier, zeby jakos lepiej miescily sie na karcie
14. poprawic optymalizacje
15. hostowac backend
16. hostowac frontend
