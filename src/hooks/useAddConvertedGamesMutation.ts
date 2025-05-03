import { useMutation } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { GameApi } from '@/types';

export const useAddConvertedGamesMutation = () => {
  return useMutation({
    mutationFn: async (games: GameApi[]) => {
      const { data } = await axiosInstance.post('/games', games);
      return data;
    },
  });
};
