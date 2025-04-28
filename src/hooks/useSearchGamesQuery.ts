import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { RAWGGame } from '@/RAWGtypes';
import { GameAPI } from '@/types';
import { convertRAWGGameToAPI } from '@/utils/convertRAWGGameToAPI';

export const useSearchGamesQuery = (search: string) => {
  // const { mutate: addRawgBackup } = useAddConvertedGamesMutation();

  return useQuery<GameAPI[]>({
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

      const convertedData = (data.results as RAWGGame[]).map((game) =>
        convertRAWGGameToAPI(game),
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
