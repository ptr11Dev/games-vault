import { UserGame } from '@/types';

type FrontSideProps = {
  game: UserGame;
};

// TODO do zrobienia te statusy
/* 
moze jakies filtrowanie na samym poczatku
wyszarzenie jak juz jest platyna
proste ikony
*/
const statusIconMap: Record<UserGame['userStatus'], string> = {
  platinum: '🏆',
  completed: '✔️',
  wishlisted: '💖',
  abandoned: '💀',
  purchased: '🛒',
};

const FrontSide = ({ game }: FrontSideProps) => {
  const isReleased = new Date(game.released) <= new Date() && !game.tba;

  return (
    <div
      className="absolute h-full w-full overflow-hidden rounded-xl backface-hidden"
      style={{
        backgroundImage: `url(${game.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!isReleased && (
        <div className="absolute top-0 left-0 inline-block rounded bg-white px-2 py-1 text-xs font-bold text-black">
          Coming: {game.released ?? 'TBA'}
        </div>
      )}
      <div className="absolute top-2 right-2 rounded bg-black/70 px-2 py-1 text-sm text-white shadow">
        {statusIconMap[game.userStatus]}
      </div>

      <div className="absolute bottom-0 w-full bg-black/70 p-2 text-white">
        <div className="flex items-center justify-between text-sm">
          <span className="truncate font-bold">{game.name}</span>
        </div>
      </div>
    </div>
  );
};
export default FrontSide;
