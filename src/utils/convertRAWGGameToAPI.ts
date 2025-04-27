import { RAWGGame } from '@/RAWGtypes';
import { AvailablePlatforms, GameAPI } from '@/types';

export const convertRAWGGameToAPI = (game: RAWGGame): GameAPI => {
  return {
    id: game.id,
    slug: game.slug,
    name: game.name,
    released: game.released,
    tba: game.tba,
    background_image: game.background_image ?? null,
    rawg_rating: game.rating,
    rawg_ratings_count: game.ratings_count,
    metacritic: game.metacritic ?? null,
    updated: game.updated,
    platforms:
      game.parent_platforms?.map(
        (platform) => platform.platform.slug as AvailablePlatforms,
      ) ?? null,
  };
};
