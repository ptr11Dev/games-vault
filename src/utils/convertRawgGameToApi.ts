import { RawgGame } from '@/misc/RawgTypes';
import { AvailablePlatforms, GameApi } from '@/misc/types';

export const convertRawgGameToApi = (game: RawgGame): GameApi => {
  return {
    id: game.id,
    slug: game.slug,
    name: game.name,
    released: game.released,
    tba: game.tba,
    background_image: game.background_image ?? null,
    meta_url: null,
    metacritic: game.metacritic ?? null,
    updated: game.updated,
    platforms:
      game.parent_platforms?.map(
        (platform) => platform.platform.slug as AvailablePlatforms,
      ) ?? null,
  };
};
