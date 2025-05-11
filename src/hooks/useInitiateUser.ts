import { useEffect } from 'react';

import { Session } from '@supabase/supabase-js';

import { useUserStore } from '@/store/userStore';

export const useInitiateUser = (
  userInstance: {
    session: Session;
  } | null,
) => {
  const setUser = useUserStore((state) => state.setUser);
  const setSession = useUserStore((state) => state.setSession);

  useEffect(() => {
    if (userInstance?.session) {
      setUser(userInstance.session.user);
      setSession(userInstance.session);
    } else {
      setUser(null);
      setSession(null);
    }
  }, [userInstance, setUser, setSession]);
};
