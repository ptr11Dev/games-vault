import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';

type GameName = { name: string };

export const useGamesQuery = () => {
  return useQuery<GameName[]>({
    queryKey: ['games'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/games');
      return data;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};
