import { GameInLibrary, GameInLibraryStatus } from '@/misc/types';

const statusOrder: GameInLibraryStatus[] = [
  'playing',
  'wishlisted',
  'completed',
  'platinum',
  'abandoned',
];

const statusLabels: Record<GameInLibraryStatus, string> = {
  playing: 'Currently Playing',
  wishlisted: 'Wishlisted',
  completed: 'Completed',
  platinum: 'Platinum',
  abandoned: 'Abandoned',
};

export type GroupedGames = {
  status: GameInLibraryStatus;
  label: string;
  games: GameInLibrary[];
}[];

export const filterGamesInLibrary = (
  games: GameInLibrary[],
  params?: URLSearchParams,
): GroupedGames => {
  const gamesGroupedByStatus = games.reduce<
    Record<GameInLibraryStatus, GameInLibrary[]>
  >(
    (acc, game) => {
      acc[game.userStatus] = [...(acc[game.userStatus] || []), game];
      return acc;
    },
    {
      playing: [],
      wishlisted: [],
      completed: [],
      platinum: [],
      abandoned: [],
    },
  );

  const direction = params?.get('direction');

  const groupedResult: GroupedGames = statusOrder
    .map((status) => ({
      status,
      label: statusLabels[status],
      games: gamesGroupedByStatus[status] || [],
    }))
    .filter((group) => group.games.length > 0);

  if (direction === 'asc') {
    return groupedResult.reverse();
  }

  return groupedResult;
};
