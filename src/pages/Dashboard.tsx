import { useEffect, useState } from 'react';

import GameCard from '@/components/GameCard';
import { UserGame } from '@/types';

// Import the JSON data directly
// import rawgResponse from '../examples/rawgResponse.json';
import userGamesWithDetailsAPI from '../examples/userGamesWithDetailsAPI.json';

const Dashboard = () => {
  const [games, setGames] = useState<UserGame[]>([]);

  useEffect(() => {
    // apiClient
    //   .get<{ count: number; results: Game[] }>('/games')
    //   .then((res) => {
    //     console.log('Fetched games:', res.data);
    //     setGames(res.data.results);
    //   })
    //   .catch((err) => console.error('Failed to fetch games:', err));
    // Use the data from the imported JSON file instead of making an API call
    // setGames(rawgResponse.results);
    // console.log('Loaded games from local JSON file:', rawgResponse.results);

    setGames(userGamesWithDetailsAPI.games as UserGame[]);
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
