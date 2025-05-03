export type GameUserStatus =
  | 'wishlisted'
  | 'completed'
  | 'platinum'
  | 'abandoned';

export type AvailablePlatforms =
  | 'pc'
  | 'playstation'
  | 'xbox'
  | 'mac'
  | 'nintendo'
  | 'linux'
  | 'android';

export type GameApi = {
  id: number;
  slug: string;
  name: string;
  released: string | null;
  tba: boolean;
  background_image: string | null;
  rawg_rating: number;
  rawg_ratings_count: number;
  metacritic: number | null;
  updated: string;
  platforms: AvailablePlatforms[] | null;
};

export type UserGames = {
  id: string;
  userId: string;
  gameId: number;
  userStatus: GameUserStatus;
  createdAt: string;
  updatedAt: string;
};

export type UserGame = GameApi & {
  userStatus: GameUserStatus;
  createdAt: string;
  updatedAt: string;
};

export type UserWithGames = {
  userId: string;
  games: UserGame[];
};
