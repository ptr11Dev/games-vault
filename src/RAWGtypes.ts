export type RAWGGame = {
  id: number;
  slug: string;
  name: string;
  released: string | null;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: Record<string, number>;
  metacritic: number | null;
  playtime: number;
  suggestions_count: number;
  updated: string;
  user_game: null;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  platforms: PlatformInfo[];
  parent_platforms: { platform: PlatformBase }[];
  genres: Genre[];
  stores: StoreInfo[];
  clip: null;
  tags: Tag[];
  esrb_rating: ESRBRating;
  short_screenshots: Screenshot[];
};

type Rating = {
  id: number;
  title: string;
  count: number;
  percent: number;
};

type PlatformBase = {
  id: number;
  name: string;
  slug: string;
};

type PlatformFull = PlatformBase & {
  image: string | null;
  year_end: number | null;
  year_start: number | null;
  games_count: number;
  image_background: string;
};

type PlatformInfo = {
  platform: PlatformFull;
  released_at: string;
  requirements_en: Requirements | null;
  requirements_ru: Requirements | null;
};

type Requirements = {
  minimum: string;
  recommended: string;
};

type Genre = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
};

type StoreInfo = {
  id: number;
  store: Store;
};

type Store = {
  id: number;
  name: string;
  slug: string;
  domain: string;
  games_count: number;
  image_background: string;
};

type Tag = {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
};

type ESRBRating = {
  id: number;
  name: string;
  slug: string;
};

type Screenshot = {
  id: number;
  image: string;
};
