import { useEffect, useState } from 'react';

// Import the JSON data directly
import storeData from '../store.json';
import GameCard from './components/GameCard';

import './index.css';

interface Game {
  id: number;
  name: string;
  background_image: string;
  metacritic: number;
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    // apiClient
    //   .get<{ count: number; results: Game[] }>('/games')
    //   .then((res) => {
    //     console.log('Fetched games:', res.data);
    //     setGames(res.data.results);
    //   })
    //   .catch((err) => console.error('Failed to fetch games:', err));
    // Use the data from the imported JSON file instead of making an API call
    setGames(storeData.results);
    console.log('Loaded games from local JSON file:', storeData.results);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

export default App;
