import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { GameInLibrary } from '@/misc/types';

export const useGamesLibraryQuery = () => {
  return useQuery<GameInLibrary[]>({
    queryKey: ['userGames'],
    queryFn: async () => {
      const url = `/user-games`;
      const { data } = await axiosInstance.get(url);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};
