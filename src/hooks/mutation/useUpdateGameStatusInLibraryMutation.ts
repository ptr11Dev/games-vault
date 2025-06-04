import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { GameInLibraryStatus } from '@/misc/types';

type UpdateGameStatusInLibraryPayload = {
  gameId: number;
  userStatus: GameInLibraryStatus;
};

export const useUpdateGameStatusInLibraryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      gameId,
      userStatus,
    }: UpdateGameStatusInLibraryPayload) => {
      const { data } = await axiosInstance.patch(
        `/user-games/${gameId}/status/${userStatus}`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGames'] });
    },
  });
};
