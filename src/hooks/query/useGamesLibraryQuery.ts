import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { GameInLibrary } from '@/misc/types';

export const useGamesLibraryQuery = (searchParams: URLSearchParams) => {
  return useQuery<GameInLibrary[]>({
    queryKey: ['userGames', Object.fromEntries(searchParams)],
    queryFn: async () => {
      const url = `/user-games${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      const { data } = await axiosInstance.get(url);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};
