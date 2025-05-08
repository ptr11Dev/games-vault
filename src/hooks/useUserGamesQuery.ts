import { useQuery } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { GameUserStatus, UserGame } from '@/types';

export type UserGamesFilters = {
  status?: GameUserStatus;
  name?: string;
  metacriticMin?: number;
  sort?: 'name' | 'released' | 'updatedAt' | 'metacritic' | 'status';
  direction?: 'asc' | 'desc';
};

export const useUserGamesQuery = (
  userId: string | null,
  searchParams: URLSearchParams,
) => {
  return useQuery<UserGame[]>({
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
