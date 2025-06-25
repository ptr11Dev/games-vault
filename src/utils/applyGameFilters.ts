import { FilterParams, GameInLibrary } from '@/misc/types';

export const applyGameFilters = (
  games: GameInLibrary[],
  filters: FilterParams,
): GameInLibrary[] => {
  let filteredGames = games;

  if (filters.name) {
    filteredGames = filteredGames.filter((game) =>
      game.name.toLowerCase().includes(filters.name!),
    );
  }

  if (filters.metacriticMin !== undefined) {
    filteredGames = filteredGames.filter(
      (game) =>
        game.metacritic !== null && game.metacritic >= filters.metacriticMin!,
    );
  }

  return filteredGames;
};
