import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { GameUserStatus, UserGame } from '@/types';

type GamesStore = {
  games: UserGame[];

  updateGames: (games: UserGame[]) => void;
  updateGameStatus: (gameId: number, newStatus: GameUserStatus) => void;
};

export const useGamesStore = create<GamesStore>()(
  devtools((set) => ({
    games: [],

    updateGames: (games) => set({ games }),
    updateGameStatus: (gameId, newStatus) =>
      set((state) => ({
        games: state.games.map((game) =>
          game.id === gameId
            ? {
                ...game,
                userStatus: newStatus,
                updatedAt: new Date().toISOString(),
              }
            : game,
        ),
      })),
  })),
);
