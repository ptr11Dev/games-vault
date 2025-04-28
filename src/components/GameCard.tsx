import { useGamesStore } from '@/store/store';
import { UserGame } from '@/types';

import MetascoreBadge from './MetascoreBadge';

type GameCardProps = {
  game: UserGame;
};

const statusStyle: Record<
  UserGame['userStatus'],
  { img: string; overlay: string }
> = {
  platinum: {
    img: 'grayscale',
    overlay: 'bg-black/40',
  },
  completed: {
    img: 'grayscale',
    overlay: 'bg-black/40',
  },
  wishlisted: {
    img: '',
    overlay: '',
  },
  abandoned: {
    img: 'grayscale',
    overlay: 'bg-black/40',
  },
};

const GameCard = ({ game }: GameCardProps) => {
  const updateGameStatus = useGamesStore((state) => state.updateGameStatus);

  const isReleased =
    new Date(game.released ?? '9999-12-31') <= new Date() && !game.tba;

  const handleCompleteClick = () => {
    if (game.userStatus === 'wishlisted' || game.userStatus === 'abandoned') {
      updateGameStatus(game.id, 'completed');
    }
  };

  const handleAbandonClick = () => {
    if (game.userStatus === 'wishlisted') {
      updateGameStatus(game.id, 'abandoned');
    }
  };

  return (
    <div className="group relative flex h-[200px] w-[300px] cursor-pointer flex-col justify-around overflow-hidden rounded-xl">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transition duration-500 ${statusStyle[game.userStatus]?.img}`}
          style={{
            backgroundImage: `url(${game.background_image})`,
          }}
        />
        {statusStyle[game.userStatus]?.overlay && (
          <div
            className={`absolute inset-0 z-10 transition duration-500 ${statusStyle[game.userStatus].overlay}`}
          />
        )}
      </div>

      {/* Green Right Action (Complete) */}
      {game.userStatus !== 'platinum' && (
        <div
          onClick={handleCompleteClick}
          className="absolute top-0 right-0 z-50 flex h-full w-0 translate-x-5 cursor-pointer items-center justify-center overflow-hidden bg-green-500/80 transition-all duration-300 group-hover:w-16 group-hover:translate-x-0 group-hover:opacity-100"
        />
      )}

      {/* Red Left Action (Abandon) */}
      {game.userStatus === 'wishlisted' && (
        <div
          onClick={handleAbandonClick}
          className="absolute top-0 left-0 z-50 flex h-full w-0 -translate-x-5 cursor-pointer items-center justify-center overflow-hidden bg-red-500/80 transition-all duration-300 group-hover:w-16 group-hover:translate-x-0 group-hover:opacity-100"
        />
      )}

      {/* Top Bar */}
      <div className="flex justify-between p-2">
        {!isReleased && (
          <p className="flex h-1/2 items-center rounded bg-white px-2 py-1 text-xs font-bold text-black">
            Coming: {game.released ?? 'TBA'}
          </p>
        )}
        <MetascoreBadge score={game.metacritic} />
      </div>

      {/* Center - Big statuses */}
      <div className="relative flex h-full items-center justify-center">
        {game.userStatus === 'abandoned' && (
          <p className="absolute top-1/2 right-[-25%] left-[-25%] z-10 -translate-y-1/2 rotate-[30deg] bg-red-600/80 py-2 text-center text-sm font-semibold tracking-wider text-white">
            ABANDONED
          </p>
        )}
        {game.userStatus === 'platinum' && (
          <img
            src="/ps-trophy.png"
            alt="PlayStation platinum trophy icon"
            className="z-30 h-24"
          />
        )}
        {(game.userStatus === 'completed' ||
          game.userStatus === 'platinum') && (
          <div className="absolute top-1/2 right-[-25%] left-[-25%] -translate-y-1/2 rotate-[30deg] bg-green-600/80 py-2 text-center shadow-lg">
            <p className="text-sm font-semibold tracking-wider text-white uppercase">
              Completed
            </p>
          </div>
        )}
      </div>

      {/* Bottom - Title */}
      <p className="w-full truncate bg-black/70 p-2 text-sm font-bold text-white">
        {game.name}
      </p>
    </div>
  );
};

export default GameCard;
