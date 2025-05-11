import { useQuery } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { GameInLibrary } from '@/misc/types';

export const useGamesLibraryQuery = (
  userId: string | null,
  searchParams: URLSearchParams,
) => {
  return useQuery<GameInLibrary[]>({
    queryKey: ['userGames', userId, Object.fromEntries(searchParams)],
    queryFn: async () => {
      if (!userId) return [];
      const url = `/user-games/${userId}${
        searchParams.toString() ? `?${searchParams.toString()}` : ''
      }`;

      const { data } = await axiosInstance.get(url);
      return data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
