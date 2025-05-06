import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserStore = {
  user: User | null;
  session: Omit<Session, 'user'> | null;

  setUser: (user: User | null) => void;
  clearUser: () => void;
  setSession: (session: Omit<Session, 'user'> | null) => void;
};

export const useUserStore = create<UserStore>()(
  devtools((set) => ({
    user: null,
    session: null,

    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    setSession: (session) => set({ session }),
  })),
);
