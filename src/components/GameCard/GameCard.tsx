import { UserGame } from '@/types';

import FrontSide from './components/FrontSide';

type GameCardProps = {
  game: UserGame;
};

const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className="perspective h-[200px] w-[300px] cursor-pointer">
      <div className="preserve-3d relative h-full w-full transition-transform duration-500">
        <FrontSide game={game} />
      </div>
    </div>
  );
};

export default GameCard;
