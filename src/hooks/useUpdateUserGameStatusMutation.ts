import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { GameInLibraryStatus } from '@/types';

type UpdateStatusPayload = {
  userId: string;
  gameId: number;
  userStatus: GameInLibraryStatus;
};

export const useUpdateUserGameStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, gameId, userStatus }: UpdateStatusPayload) => {
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
