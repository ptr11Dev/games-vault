import { Calendar } from 'lucide-react';

import { UserGame } from '@/types';

type BackSideProps = {
  game: UserGame;
};

const BackSide = ({ game }: BackSideProps) => {
  const isReleased = new Date(game.released) <= new Date();

  return (
    <div className="relative flex h-full w-full rotate-y-180 flex-col rounded-xl bg-gray-800 p-3 text-white backface-hidden">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-y-3">
          <h3 className="text-center text-xl font-bold">{game.name}</h3>
        </div>

        <div className="flex items-center justify-center text-sm text-gray-300">
          Your status: <strong className="ml-1">{game.userStatus}</strong>
        </div>

        {isReleased && (
          <p className="flex items-center justify-end text-left text-xs text-gray-400">
            <Calendar className="mr-1 inline-block h-3 w-3" />
            Released: {game.released}
          </p>
        )}
      </div>
    </div>
  );
};

export default BackSide;
