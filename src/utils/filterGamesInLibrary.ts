import { STATUS_LABELS, STATUS_ORDER } from '@/misc/consts';
import { GameInLibrary, GroupedGames } from '@/misc/types';

import { applyGameFilters } from './applyGameFilters';
import { groupGamesByStatus } from './groupGamesByStatus';
import { parseFiltersFromParams } from './parseFiltersFromParams';

export const filterGamesInLibrary = (
  games: GameInLibrary[],
  params?: URLSearchParams,
): GroupedGames => {
  const filters = parseFiltersFromParams(params);
  const gamesGroupedByStatus = groupGamesByStatus(games);

  const statusesToShow = filters.status
    ? STATUS_ORDER.filter((status) => status === filters.status)
    : STATUS_ORDER;

  const groupedResult: GroupedGames = statusesToShow
    .map((status) => {
      const statusGames = gamesGroupedByStatus[status] || [];
      const filteredGames = applyGameFilters(statusGames, filters);

      return {
        status,
        label: STATUS_LABELS[status],
        games: filteredGames,
      };
    })
    .filter((group) => group.games.length > 0);

  return filters.direction === 'asc' ? groupedResult.reverse() : groupedResult;
};
