import { RAWGGame } from '@/RAWGtypes';
import { GameAPI } from '@/types';

export const convertRAWGGameToAPI = (game: RAWGGame): GameAPI => {
  return {
    id: game.id,
    slug: game.slug,
    name: game.name,
    released: game.released,
    tba: game.tba,
    backgroundImage: game.background_image,
    rawgRating: game.rating,
    rawgRatingsCount: game.ratings_count,
    metacritic: game.metacritic,
    updated: game.updated,
    platforms: game.parent_platforms.map((platform) => platform.platform.slug),
  };
};
