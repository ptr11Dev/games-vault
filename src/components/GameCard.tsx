import { useState } from 'react';

import { UserGame } from '@/types';

type GameCardProps = {
  game: UserGame;
};

const GameCard = ({ game }: GameCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  return (
    <div
      className="perspective h-[200px] w-[300px] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`preserve-3d relative h-full w-full transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side */}
        <div
          className="absolute h-full w-full overflow-hidden rounded-xl backface-hidden"
          style={{
            backgroundImage: `url(${game.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="bg-opacity-70 absolute bottom-0 w-full bg-black p-2">
            <h3 className="truncate font-bold text-white">{game.name}</h3>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute flex h-full w-full rotate-y-180 flex-col items-center justify-center rounded-xl bg-gray-800 p-4 text-white backface-hidden">
          <h3 className="mb-2 text-xl font-bold">{game.name}</h3>
          <p className="text-2xl font-bold">
            Metascore: {game.metacritic || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
