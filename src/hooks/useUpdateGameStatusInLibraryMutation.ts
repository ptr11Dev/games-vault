import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { GameInLibraryStatus } from '@/types';

type UpdateGameStatusInLibraryPayload = {
  userId: string;
  gameId: number;
  userStatus: GameInLibraryStatus;
};

export const useUpdateGameStatusInLibraryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      gameId,
      userStatus,
    }: UpdateGameStatusInLibraryPayload) => {
      const { data } = await axiosInstance.patch(
        `/user-games/${userId}/${gameId}/status/${userStatus}`,
      );
      return data;
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['userGames', userId] });
    },
  });
};
