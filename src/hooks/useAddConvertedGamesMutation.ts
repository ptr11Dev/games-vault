import { useMutation } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { GameAPI } from '@/types';

export const useAddConvertedGamesMutation = () => {
  return useMutation({
    mutationFn: async (games: GameAPI[]) => {
      const { data } = await axiosInstance.post('/games', games);
      return data;
    },
  });
};
