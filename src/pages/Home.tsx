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
      {/* Nagłówek z przyciskiem */}
      <div className="mb-4 flex items-center justify-between">
        <button
          className="cursor-pointer text-gray-400 hover:text-white"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <LogOut />
        </button>
        <AddGameButton />
      </div>

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
