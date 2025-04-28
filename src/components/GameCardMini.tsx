import { GameAPI } from '@/types';

type GameCardMiniProps = {
  game: GameAPI;
  onAddClick: () => void;
};

const GameCardMini = ({ game, onAddClick }: GameCardMiniProps) => {
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

        {onAddClick && (
          <button
            onClick={onAddClick}
            className="mt-2 cursor-pointer rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white hover:bg-blue-700"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default GameCardMini;
