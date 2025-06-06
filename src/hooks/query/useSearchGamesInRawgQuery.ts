import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { RawgGame } from '@/misc/RawgTypes';
import { GameApi } from '@/misc/types';
import { convertRawgGameToApi } from '@/utils/convertRawgGameToApi';

export const useSearchGamesInRawgQuery = (search: string) => {
  return useQuery<GameApi[]>({
    queryKey: ['rawg-games', search],
    queryFn: async () => {
      if (!search) return [];

      const { data } = await axios.get('https://api.rawg.io/api/games', {
        params: {
          key: import.meta.env.VITE_RAWG_API_KEY,
          search,
          page_size: 10,
        },
      });

      const convertedData = (data.results as RawgGame[]).map((game) =>
        convertRawgGameToApi(game),
      );

      return convertedData;
    },
    enabled: !!search,
    placeholderData: keepPreviousData,
  });
};
