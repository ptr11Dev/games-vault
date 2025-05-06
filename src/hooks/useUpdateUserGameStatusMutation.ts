import { useMutation } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';
import { GameUserStatus } from '@/types';

type UpdateStatusPayload = {
  userId: string;
  gameId: number;
  userStatus: GameUserStatus;
};

export const useUpdateUserGameStatusMutation = () => {
  return useMutation({
    mutationFn: async ({ userId, gameId, userStatus }: UpdateStatusPayload) => {
      const { data } = await axiosInstance.patch(
        `/user-games/${userId}/${gameId}/status/${userStatus}`,
      );
      return data;
    },
  });
};
