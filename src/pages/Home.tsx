import { LogOut } from 'lucide-react';

import AddGameButton from '@/components/AddGameButton';
import GameCard from '@/components/GameCard';
import { useUserGamesQuery } from '@/hooks/useUserGamesQuery';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/userStore';

// TODO - sortowanie po statusie
// TODO - filtrowanie po statusie

const Home = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setSession = useUserStore((state) => state.setSession);

  const {
    data: games,
    isLoading,
    isError,
  } = useUserGamesQuery(user?.id ?? null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  if (isLoading) return <div>Loading games...</div>;
  if (isError) return <div>Error loading games</div>;

  return (
    <div className="p-4">
      {/* Nagłówek z przyciskiem */}
      <div className="mb-6 flex items-center justify-between">
        <button
          className="cursor-pointer text-gray-400 hover:text-white"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <LogOut />
        </button>
        <AddGameButton />
      </div>

      {/* Siatka gier */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {games?.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  );
};

export default Home;
