import { cn } from '@/lib/utils';
import { TEXTS } from '@/misc/texts';
import { GameApi } from '@/misc/types';

type GameCardMiniProps = {
  game: GameApi;
  onAddClick: () => void;
  isGameInLibrary: boolean;
};

const { ADD, IN_LIBRARY } = TEXTS.GAME_CARD.MINI;

const GameCardMini = ({
  game,
  onAddClick,
  isGameInLibrary,
}: GameCardMiniProps) => {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg bg-gray-900 shadow transition hover:shadow-lg">
      {/* Background */}
      <div
        className={cn(
          'h-32 w-full bg-center',
          game.background_image ? 'bg-cover' : 'bg-contain bg-no-repeat',
        )}
        style={{
          backgroundImage: `url(${game.background_image ?? '/no_image.png'})`,
        }}
      />
      {/* Card content */}
      <div className="flex flex-col gap-2 p-2 text-white">
        {/* Name */}
        <div className="truncate text-sm font-semibold">{game.name}</div>
        {/* Button */}
        {onAddClick &&
          (isGameInLibrary ? (
            <button
              disabled
              className="mt-2 cursor-not-allowed rounded bg-gray-600 px-2 py-1 text-xs font-bold text-gray-300"
            >
              {IN_LIBRARY}
            </button>
          ) : (
            <button
              onClick={onAddClick}
              className="mt-2 cursor-pointer rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white hover:bg-blue-700"
            >
              {ADD}
            </button>
          ))}
      </div>
    </div>
  );
};

export default GameCardMini;
