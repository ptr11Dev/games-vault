import { useQuery } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { UserGame } from '@/types';

export const useUserGamesQuery = (userId: string | null) => {
  return useQuery<UserGame[]>({
    queryKey: ['userGames', userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data } = await axiosInstance.get(`/user-games/${userId}`);
      return data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
