import { GameApi } from '@/types';

type GameCardMiniProps = {
  game: GameApi;
  onAddClick: () => void;
  isGameInLibrary: boolean;
};

const GameCardMini = ({
  game,
  onAddClick,
  isGameInLibrary,
}: GameCardMiniProps) => {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg bg-gray-900 shadow transition hover:shadow-lg">
      {/* Background */}
      <div
        className="h-32 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${game.background_image})` }}
      />

      {/* Content */}
      <div className="flex flex-col gap-2 p-2 text-white">
        <div className="truncate text-sm font-semibold">{game.name}</div>
        {onAddClick &&
          (isGameInLibrary ? (
            <button
              disabled
              className="mt-2 cursor-not-allowed rounded bg-gray-600 px-2 py-1 text-xs font-bold text-gray-300"
            >
              In Library
            </button>
          ) : (
            <button
              onClick={onAddClick}
              className="mt-2 cursor-pointer rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white hover:bg-blue-700"
            >
              Add
            </button>
          ))}
      </div>
    </div>
  );
};

export default GameCardMini;
