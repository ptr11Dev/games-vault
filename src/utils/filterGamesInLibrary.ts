import { GameInLibrary } from '@/types';

const statusOrder = [
  'playing',
  'wishlisted',
  'completed',
  'platinum',
  'abandoned',
];

export const filterGamesInLibrary = (
  games: GameInLibrary[],
  params?: URLSearchParams,
) => {
  const sorted = games?.sort((a, b) => {
    const statusDiff =
      statusOrder.indexOf(a.userStatus) - statusOrder.indexOf(b.userStatus);
    if (statusDiff !== 0) return statusDiff;

    const aDate = a.released ? new Date(a.released).getTime() : Infinity;
    const bDate = b.released ? new Date(b.released).getTime() : Infinity;
    return aDate - bDate;
  });

  return params?.get('direction') === 'desc' ? sorted.reverse() : sorted;
};
