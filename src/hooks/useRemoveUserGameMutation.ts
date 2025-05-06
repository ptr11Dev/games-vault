import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';

type RemoveUserGamePayload = {
  userId: string;
  gameId: number;
};

export const useRemoveUserGameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, gameId }: RemoveUserGamePayload) => {
      const { data } = await axiosInstance.delete(
        `/user-games/${userId}/${gameId}`,
      );
      return data;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['userGames', userId] });
    },
  });
};
