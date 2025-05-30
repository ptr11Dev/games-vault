export type RawgGame = {
  id: number;
  slug: string;
  name: string;
  name_original?: string;
  description_raw?: string;
  description?: string;
  metacritic?: number | null;
  metacritic_platforms?: MetacriticPlatform[];
  released: string | null;
  tba: boolean;
  updated: string;
  background_image?: string;
  background_image_additional?: string;
  website?: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  reactions?: Record<string, number>;
  added: number;
  added_by_status?: AddedByStatus;
  playtime: number;
  screenshots_count?: number;
  movies_count?: number;
  creators_count?: number;
  achievements_count?: number;
  parent_achievements_count?: number;
  reddit_url?: string;
  reddit_name?: string;
  reddit_description?: string;
  reddit_logo?: string;
  reddit_count?: number;
  twitch_count?: number;
  youtube_count?: number;
  reviews_text_count?: number;
  ratings_count: number;
  suggestions_count: number;
  alternative_names?: string[];
  metacritic_url?: string;
  parents_count?: number;
  additions_count?: number;
  game_series_count?: number;
  esrb_rating?: EsrbRating;
  short_screenshots?: ShortScreenshot[] | null;
  parent_platforms?: ParentPlatform[];
  platforms?: PlatformInfo[];
  stores?: StoreInfo[];
  developers?: Developer[];
  publishers?: Publisher[];
  genres?: Genre[];
  tags?: Tag[];
  screenshots?: Screenshot[];
  movies?: Movie[];
  description_top?: string;
  background_image_tags?: Tag[];
  clip?: Clip | null;
  series?: RawgGame[];
  user_game?: unknown;
  reviews_count?: number | null;
  community_rating?: number | null;
  saturated_color?: string | null;
  dominant_color?: string | null;
};

type MetacriticPlatform = {
  metascore: number;
  url: string;
  platform: {
    platform: {
      id: number;
      name: string;
      slug: string;
    };
  };
};

type Rating = {
  id: number;
  title: string;
  count: number;
  percent: number;
};

type AddedByStatus = {
  yet?: number;
  owned?: number;
  beaten?: number;
  toplay?: number;
  dropped?: number;
  playing?: number;
};

type EsrbRating = {
  id: number;
  slug: string;
  name: string;
};

type ParentPlatform = {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
};

type PlatformInfo = {
  platform: {
    id: number;
    name: string;
    slug: string;
    image?: string | null;
    year_end?: number | null;
    year_start?: number | null;
    games_count?: number | null;
    image_background?: string | null;
  };
  released_at?: string | null;
  requirements?: {
    minimum?: string;
    recommended?: string;
  } | null;
  requirements_en?: {
    minimum?: string;
    recommended?: string;
  } | null;
  requirements_ru?: {
    minimum?: string;
    recommended?: string;
  } | null;
};

type StoreInfo = {
  id: number;
  url?: string;
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count?: number | null;
    image_background?: string | null;
  };
};

type Developer = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
};

type Publisher = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
};

type Genre = {
  id: number;
  name: string;
  slug: string;
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

type Screenshot = {
  id: number;
  image: string;
};

type Movie = {
  id: number;
  name: string;
  preview: string;
  data: {
    480: string;
    max: string;
  };
};

type Clip = {
  clip: string;
  clips: {
    320: string;
    640: string;
    full: string;
  };
  preview: string;
};

type ShortScreenshot = {
  id: number;
  image: string;
};
