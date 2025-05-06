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
  filters: UserGamesFilters = {},
) => {
  return useQuery<UserGame[]>({
    queryKey: ['userGames', userId, filters],
    queryFn: async () => {
      if (!userId) return [];
      const searchParams = new URLSearchParams();
      if (filters.status) searchParams.set('status', filters.status);
      if (filters.name) searchParams.set('name', filters.name);
      if (filters.metacriticMin)
        searchParams.set('metacriticMin', filters.metacriticMin.toString());
      if (filters.sort) searchParams.set('sort', filters.sort);
      if (filters.direction) searchParams.set('direction', filters.direction);

      const queryString = searchParams.toString();
      const url = `/user-games/${userId}${queryString ? `?${queryString}` : ''}`;

      const { data } = await axiosInstance.get(url);
      return data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
