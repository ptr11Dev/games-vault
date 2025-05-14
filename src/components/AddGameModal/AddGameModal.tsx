import { useState } from 'react';

import { CircleX } from 'lucide-react';

import { useAddGameToLibraryMutation } from '@/hooks/useAddGameToLibraryMutation';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useDebounce } from '@/hooks/useDebounce';
import { useGamesLibraryQuery } from '@/hooks/useGamesLibraryQuery';
import { useSearchGamesInRawgQuery } from '@/hooks/useSearchGamesInRawgQuery';
import { TEXTS } from '@/misc/texts';
import { GameApi } from '@/misc/types';
import { useUserStore } from '@/store/userStore';

import Loader from '../Loader';
import GameCardMini from './GameCardMini';

type AddGameModalProps = {
  onClose: () => void;
};

const { INPUT_PLACEHOLDER, TITLE } = TEXTS.ADD_GAME_MODAL;

const AddGameModal = ({ onClose }: AddGameModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 600);
  const user = useUserStore((state) => state.user);
  const modalRef = useClickOutside(onClose);

  const { data: searchedGames, isLoading: isSearching } =
    useSearchGamesInRawgQuery(debouncedSearch);
  const { data: userGames } = useGamesLibraryQuery(
    user!.id,
    new URLSearchParams(),
  );
  const { mutate: addUserGame, isPending: isAdding } =
    useAddGameToLibraryMutation();

  const isGameInLibrary = (game: GameApi) =>
    userGames?.some((userGame) => userGame.id === game.id) ?? false;

  const handleAdd = (game: GameApi) => {
    addUserGame({
      ...game,
      userId: user?.id ?? '',
    });
  };

  return (
    /* Modal overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      {/* Modal container */}
      <div
        ref={modalRef}
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg bg-gray-900 p-6 text-white"
      >
        {/* Loader */}
        {isAdding && (
          <div className="absolute inset-0 z-50 bg-gray-900/50 backdrop-blur-sm">
            <Loader size="medium" className="h-full" />
          </div>
        )}
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{TITLE}</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-white"
          >
            <CircleX />
          </button>
        </div>
        {/* Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={INPUT_PLACEHOLDER}
          className="mb-4 w-full rounded border border-gray-600 bg-gray-800 p-2 text-white placeholder-gray-400"
        />
        {/* Games list */}
        {isSearching ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <Loader size="medium" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {searchedGames?.map((game) => (
              <GameCardMini
                key={game.id}
                game={game}
                onAddClick={() => handleAdd(game)}
                isGameInLibrary={isGameInLibrary(game)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddGameModal;
