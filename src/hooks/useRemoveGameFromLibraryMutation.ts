import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';

type RemoveGameFromLibraryPayload = {
  userId: string;
  gameId: number;
};

export const useRemoveGameFromLibraryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, gameId }: RemoveGameFromLibraryPayload) => {
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
