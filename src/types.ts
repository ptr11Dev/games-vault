type GameUserStatus =
  | 'wishlisted'
  | 'purchased'
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

export type GameAPI = {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  backgroundImage: string;
  rawgRating: number;
  rawgRatingsCount: number;
  metacritic: number | null;
  updated: string;
  platforms: AvailablePlatforms[];
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
