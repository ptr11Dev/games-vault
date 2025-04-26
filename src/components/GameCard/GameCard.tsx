import { UserGame } from '@/types';

import MetascoreBadge from './components/MetascoreBadge';

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
  const isReleased = new Date(game.released) <= new Date() && !game.tba;

  console.log(`game: ${game.name}, status: ${game.userStatus}`);

  return (
    <div className="group relative flex h-[200px] w-[300px] cursor-pointer flex-col justify-around overflow-hidden rounded-xl">
      <div className="absolute top-0 left-0 -z-10 h-full w-full overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transition duration-500 ${statusStyle[game.userStatus].img}`}
          style={{
            backgroundImage: `url(${game.backgroundImage})`,
          }}
        />

        <div
          className={`absolute inset-0 transition duration-500 ${statusStyle[game.userStatus].overlay}`}
        />
      </div>

      <div className="flex justify-between">
        {!isReleased && (
          <p className="flex h-1/2 items-center rounded bg-white px-2 py-1 text-xs font-bold text-black">
            Coming: {game.released ?? 'TBA'}
          </p>
        )}
        <MetascoreBadge score={game.metacritic} />
      </div>
      <div className="flex h-full items-center justify-center">
        {game.userStatus === 'abandoned' && (
          <p className="absolute top-1/2 right-[-25%] left-[-25%] z-10 -translate-y-1/2 rotate-30 bg-red-600/80 py-2 text-center text-sm font-semibold tracking-wider text-white">
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
          <>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-1/2 right-[-25%] left-[-25%] -translate-y-1/2 rotate-[30deg] bg-green-600/80 py-2 text-center shadow-lg">
              <p className="text-sm font-semibold tracking-wider text-white uppercase">
                Completed
              </p>
            </div>
          </>
        )}
      </div>

      <p className="w-full truncate bg-black/70 p-2 text-sm font-bold text-white">
        {game.name}
      </p>
    </div>
  );
};

export default GameCard;
