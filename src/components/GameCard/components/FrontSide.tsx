import { UserGame } from '@/types';

import MetascoreBadge from './MetascoreBadge';

type FrontSideProps = {
  game: UserGame;
};

// TODO do zrobienia te statusy
/* 
moze jakies filtrowanie na samym poczatku
wyszarzenie jak juz jest platyna
proste ikony
*/
// const statusIconMap: Record<UserGame['userStatus'], string> = {
//   platinum: '🏆',
//   completed: '✔️',
//   wishlisted: '💖',
//   abandoned: '💀',
//   purchased: '🛒',
// };

const FrontSide = ({ game }: FrontSideProps) => {
  const isReleased = new Date(game.released) <= new Date() && !game.tba;
  const gameAtLeastPlayed =
    game.userStatus !== 'wishlisted' && game.userStatus !== 'purchased';

  console.log(`Game: ${game.name} status ${game.userStatus}`);

  return (
    <div className="group absolute h-full w-full overflow-hidden rounded-xl backface-hidden">
      <div
        className={`absolute inset-0 transition duration-500 ${gameAtLeastPlayed && 'grayscale group-hover:grayscale-0'}`}
        style={{
          backgroundImage: `url(${game.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="relative h-full">
        <div className="absolute top-0 right-0">
          <MetascoreBadge score={game.metacritic} />
        </div>
        {!isReleased && (
          <p className="absolute top-0 left-0 rounded bg-white px-2 py-1 text-xs font-bold text-black">
            Coming: {game.released ?? 'TBA'}
          </p>
        )}
        <p className="absolute bottom-0 w-full truncate bg-black/70 p-2 text-sm font-bold text-white">
          {game.name}
        </p>
      </div>
    </div>
  );
};
export default FrontSide;
