import { useEffect } from 'react';

import GameCard from '@/components/GameCard/GameCard';
import { useGamesStore } from '@/store/store';

// Import the JSON data directly
// import rawgResponse from '../examples/rawgResponse.json';

const Dashboard = () => {
  const games = useGamesStore((state) => state.games);

  useEffect(() => {
    // apiClient
    //   .get<{ count: number; results: RAWGGame[] }>('/games/wolverine-2022')
    //   .then((res) => {
    //     console.log('Fetched games:', res.data);
    //     // setGames(res.data.results);
    //   })
    //   .catch((err) => console.error('Failed to fetch games:', err));
    // Use the data from the imported JSON file instead of making an API call
    // setGames(rawgResponse.results);
    // console.log('Loaded games from local JSON file:', rawgResponse.results);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default Dashboard;
