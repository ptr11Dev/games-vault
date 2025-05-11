export type GameInLibraryStatus =
  | 'wishlisted'
  | 'completed'
  | 'platinum'
  | 'abandoned'
  | 'playing';

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

export type GameInLibrary = GameApi & {
  userStatus: GameInLibraryStatus;
  createdAt: string;
  updatedAt: string;
};

export type UserWithGames = {
  userId: string;
  games: GameInLibrary[];
};

export type GamesLibraryFilters = {
  status?: GameInLibraryStatus;
  name?: string;
  metacriticMin?: number;
  sort?: 'name' | 'released' | 'updatedAt' | 'metacritic' | 'status' | 'none';
  direction?: 'asc' | 'desc';
};

export type PossibleFilters =
  | 'name'
  | 'status'
  | 'metacriticMin'
  | 'sort'
  | 'direction';
