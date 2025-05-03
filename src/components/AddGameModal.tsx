import { useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import { useSearchGamesQuery } from '@/hooks/useSearchGamesQuery';

import CloseIcon from '../icons/close.svg?react';
import GameCardMini from './GameCardMini';

type AddGameModalProps = {
  onClose: () => void;
};

const AddGameModal = ({ onClose }: AddGameModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 600);

  const { data: games, isLoading } = useSearchGamesQuery(debouncedSearch);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg bg-gray-900 p-6 text-white">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Search Game</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-white"
          >
            <CloseIcon />
          </button>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type game title..."
          className="mb-4 w-full rounded border border-gray-600 bg-gray-800 p-2 text-white placeholder-gray-400"
        />

        {isLoading && (
          <div className="text-center text-gray-300">Loading...</div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {games?.map((game) => (
            <GameCardMini
              key={game.id}
              game={game}
              onAddClick={() => console.log('Add game', game)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddGameModal;
