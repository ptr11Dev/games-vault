import { GameInLibrary, GameInLibraryStatus } from '@/misc/types';

export const groupGamesByStatus = (
  games: GameInLibrary[],
): Record<GameInLibraryStatus, GameInLibrary[]> => {
  return games.reduce<Record<GameInLibraryStatus, GameInLibrary[]>>(
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
};
