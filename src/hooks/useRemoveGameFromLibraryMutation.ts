import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosInstance } from '@/lib/axios';

type RemoveGameFromLibraryPayload = {
  gameId: number;
};

export const useRemoveGameFromLibraryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ gameId }: RemoveGameFromLibraryPayload) => {
      const { data } = await axiosInstance.delete(`/user-games/${gameId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGames'] });
    },
  });
};
