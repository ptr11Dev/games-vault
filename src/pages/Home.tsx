import { useState } from 'react';

import { LogOut } from 'lucide-react';

import AddGameButton from '@/components/AddGameButton';
import { Filters } from '@/components/Filters';
import GameCard from '@/components/GameCard';
import { UserGamesFilters, useUserGamesQuery } from '@/hooks/useUserGamesQuery';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/userStore';

const Home = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setSession = useUserStore((state) => state.setSession);

  const [filters, setFilters] = useState<UserGamesFilters>({
    sort: 'status',
    direction: 'desc',
  });

  const { data: games } = useUserGamesQuery(user?.id ?? null, filters);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <div className="p-4">
      <header className="mb-8 rounded-lg bg-gray-800/50 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-600 px-3 py-1.5 text-sm text-gray-400 transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
            >
              <span>Sign out</span>
              <LogOut size={16} />
            </button>
            <span className="animated-username animate-glow bg-gradient-to-r from-blue-300 to-red-400 bg-clip-text text-lg font-medium tracking-widest text-transparent">
              {user?.email?.toUpperCase().replace(/@.*$/, '')}
            </span>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-px bg-gray-700"></div>
            <AddGameButton />
          </div>
        </div>
      </header>

      {/* 🔍 Filtry */}
      <Filters onChange={setFilters} />

      {/* 🕹️ Gry */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {games?.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  );
};

export default Home;
