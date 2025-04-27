import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { GameUserStatus, UserGame } from '@/types';

import userGamesWithDetailsAPI from '../examples/userGamesWithDetailsAPI.json';

type GamesStore = {
  games: UserGame[];
  updateGameStatus: (gameId: number, newStatus: GameUserStatus) => void;
};

export const useGamesStore = create<GamesStore>()(
  devtools((set) => ({
    games: userGamesWithDetailsAPI.games,
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
