import { useMutation } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { GameApi } from '@/types';

type AddUserGamePayload = GameApi & {
  userId: string;
};

export const useAddUserGameMutation = () => {
  return useMutation({
    mutationFn: async (payload: AddUserGamePayload) => {
      const { data } = await axiosInstance.post('/user-games', payload);
      return data;
    },
  });
};
