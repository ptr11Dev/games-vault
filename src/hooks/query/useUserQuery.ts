import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return null;
      return { session };
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
