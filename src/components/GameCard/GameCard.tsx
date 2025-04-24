import { useState } from 'react';

import { UserGame } from '@/types';

import BackSide from './components/BackSide';
import FrontSide from './components/FrontSide';

type GameCardProps = {
  game: UserGame;
};

const GameCard = ({ game }: GameCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => setIsFlipped(true);
  const handleMouseLeave = () => setIsFlipped(false);

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
        <FrontSide game={game} />
        <BackSide game={game} />
      </div>
    </div>
  );
};

export default GameCard;
