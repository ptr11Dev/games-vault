import AddGameButton from '@/components/AddGameButton';
import GameCard from '@/components/GameCard';
import { useGamesStore } from '@/store/store';

const Dashboard = () => {
  const games = useGamesStore((state) => state.games);

  return (
    <div className="p-4">
      {/* Nagłówek z przyciskiem */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Game Library</h1>
        <AddGameButton />
      </div>

      {/* Siatka gier */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
