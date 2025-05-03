import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { RawgGame } from '@/RawgTypes';
import { GameApi } from '@/types';
import { convertRawgGameToApi } from '@/utils/convertRawgGameToApi';

export const useSearchGamesQuery = (search: string) => {
  // const { mutate: addRawgBackup } = useAddConvertedGamesMutation();

  return useQuery<GameApi[]>({
    queryKey: ['games', search],
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

      console.log('convertedData', convertedData);
      // TODO to ma byc dodane dopiero jak gra zostanie dodana do biblioteki
      // addRawgBackup(convertedData);

      return convertedData;
    },
    enabled: !!search,
    placeholderData: keepPreviousData,
  });
};
