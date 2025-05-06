import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { GameApi } from '@/types';

type AddUserGamePayload = GameApi & {
  userId: string;
};

export const useAddUserGameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddUserGamePayload) => {
      const { data } = await axiosInstance.post('/user-games', payload);
      return data;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['userGames', userId] });
    },
  });
};
