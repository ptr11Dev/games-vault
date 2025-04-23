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

# załozenia do BE

1. user pobiera liste gier z RAWG
2. be zapisuje dane do tablicy games

- id
- slug
- name
- released
- tba
- background_image
- rating - rawg_rating
- ratings_count - rawg_ratings_count
- metacritic
- updated
- parent_platforms, ale jako platforms: elt.map(platform => platform.- platform.slug)

3. po dodaniu przez uzytkownika gry do swojego boarda zostaje to zapisane w tablicy userGames w postaci

- id - generowany przez system
- userId
- gameId
- userStatus - wybrany przez usera
- createdAt
- updatedAt

4. pobieranie danych o uzytkowniku zwraca sklejone dane usera w postaci

- userId
- games - tablica gier klejona w taki sposob, ze brane sa wszystkie rekordy z tablicy userGames, w miejsce gameId wklejane sa szczegoly z tablicy games i dodawane sa informacje zalegle z userGames - w ten sposob powstaja takie obiekty

  - id - to jest id gry
  - slug
  - name
  - released
  - tba
  - background_image
  - rating
  - ratings_count
  - metacritic
  - updated
  - platforms

  - userStatus
  - createdAt
  - updatedAt
