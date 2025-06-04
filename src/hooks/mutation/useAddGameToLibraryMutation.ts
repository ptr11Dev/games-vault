import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { GameApi } from '@/misc/types';

type AddGameToLibraryPayload = GameApi;

export const useAddGameToLibraryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddGameToLibraryPayload) => {
      const { data } = await axiosInstance.post('/user-games', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGames'] });
    },
  });
};
