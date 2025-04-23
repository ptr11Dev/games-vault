type GameUserStatus =
  | 'default'
  | 'wishlisted'
  | 'purchased'
  | 'in-progress'
  | 'completed'
  | 'platinum'
  | 'abandoned';

export type GameRAWG = {
  id: number;
  name: string;
  background_image: string;
  metacritic: number;
};

export type Platforms = 'pc' | 'playstation' | 'xbox' | 'mac' | 'nintendo';

export type GameAPI = {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  ratings_count: number;
  metacritic: number;
  updated: string;
  platforms: string[];
};

export type UserGames = {
  id: string;
  userId: string;
  gameId: number;
  userStatus: GameUserStatus;
  createdAt: string;
  updatedAt: string;
};

export type UserGame = GameAPI & {
  userStatus: GameUserStatus;
  createdAt: string;
  updatedAt: string;
};

export type UserWithGames = {
  userId: string;
  games: UserGame[];
};
