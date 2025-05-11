import { useEffect, useState } from 'react';

import { CircleX, RotateCcw } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import { useRemoveGameFromLibraryMutation } from '@/hooks/useRemoveGameFromLibraryMutation';
import { useUpdateGameStatusInLibraryMutation } from '@/hooks/useUpdateGameStatusInLibraryMutation';
import { cn } from '@/lib/utils';
import { ABANDON_STATUS_MAP, NEXT_STATUS_MAP } from '@/misc/consts';
import { GameInLibrary, GameInLibraryStatus } from '@/misc/types';
import { useUserStore } from '@/store/userStore';

import Loader from '../Loader';
import MetascoreBadge from '../MetascoreBadge';

type GameCardProps = {
  game: GameInLibrary;
};

const GameCard = ({ game }: GameCardProps) => {
  const [showBadge, setShowBadge] = useState<GameInLibraryStatus | 'none'>(
    'none',
  );
  const user = useUserStore((state) => state.user);
  const [searchParams] = useSearchParams();
  const currentStatusFilter = searchParams.get('status');

  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateGameStatusInLibraryMutation();
  const { mutate: removeUserGame, isPending: isRemoving } =
    useRemoveGameFromLibraryMutation();

  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(game.userStatus), 100);
    return () => clearTimeout(timer);
  }, [game.userStatus]);

  const isReleased =
    new Date(game.released ?? '9999-12-31') <= new Date() && !game.tba;

  const handleCompleteClick = () => {
    const nextStatus = NEXT_STATUS_MAP[game.userStatus];
    if (!nextStatus) return;

    setShowBadge(nextStatus === 'wishlisted' ? 'none' : nextStatus);
    updateStatus({
      userId: user?.id ?? '',
      gameId: game.id,
      userStatus: nextStatus,
    });
  };

  const handleAbandonClick = () => {
    const nextStatus = ABANDON_STATUS_MAP[game.userStatus];
    if (!nextStatus) return;

    setShowBadge(nextStatus);
    updateStatus({
      userId: user?.id ?? '',
      gameId: game.id,
      userStatus: nextStatus,
    });
  };

  const handleReset = () => {
    setShowBadge('none');
    updateStatus({
      userId: user?.id ?? '',
      gameId: game.id,
      userStatus: 'wishlisted',
    });
  };

  const handleDelete = () => {
    removeUserGame({ userId: user!.id, gameId: game.id });
  };

  return (
    <div
      className={cn(
        'group relative flex h-[200px] w-[300px] flex-col justify-around overflow-hidden rounded-xl transition-shadow duration-500',
        game.userStatus === 'playing' && showBadge === 'playing'
          ? 'glow-card'
          : '',
      )}
    >
      {(isUpdating || isRemoving) && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <Loader size="small" className="h-full" />
        </div>
      )}

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${game.background_image})`,
            transform: 'translateZ(0)',
          }}
        />
        {!currentStatusFilter &&
          game.userStatus !== 'wishlisted' &&
          game.userStatus !== 'playing' && (
            <div className="absolute inset-0 z-10 bg-black/60 transition-[background] duration-1000 will-change-transform group-hover:bg-transparent" />
          )}
      </div>

      {game.userStatus !== 'platinum' && (
        <div
          onClick={handleCompleteClick}
          className="absolute top-1/2 right-0 z-50 flex h-1/2 w-0 translate-x-5 translate-y-[-50%] cursor-pointer items-center justify-center overflow-hidden rounded-l-full bg-green-500/80 transition-all duration-300 group-hover:w-8 group-hover:translate-x-0 group-hover:opacity-100"
        />
      )}

      {(game.userStatus === 'wishlisted' || game.userStatus === 'playing') && (
        <div
          onClick={handleAbandonClick}
          className="absolute top-1/2 left-0 z-50 flex h-1/2 w-0 -translate-x-5 translate-y-[-50%] cursor-pointer items-center justify-center overflow-hidden rounded-r-full bg-red-500/80 transition-all duration-300 group-hover:w-8 group-hover:translate-x-0 group-hover:opacity-100"
        />
      )}

      <div className="flex justify-between p-2">
        {!isReleased && (
          <p className="flex h-1/2 items-center rounded bg-white px-2 py-1 text-xs font-bold text-black">
            Coming: {game.released ?? 'TBA'}
          </p>
        )}
        <MetascoreBadge score={game.metacritic} />
      </div>

      {currentStatusFilter !== 'abandoned' &&
        game.userStatus === 'abandoned' && (
          <span
            className={cn(
              'absolute top-18 left-24 z-10 rotate-[-15deg] rounded bg-red-700/90 px-4 py-1 text-base tracking-[5px] text-white shadow-md ring-2 ring-red-900 transition-all duration-500',
              game.userStatus === 'abandoned' && showBadge === 'abandoned'
                ? 'opacity-100 group-hover:top-0 group-hover:left-[-20px] group-hover:scale-60 group-hover:rotate-0'
                : 'opacity-0',
            )}
            style={{ fontFamily: '"Staatliches", sans-serif' }}
          >
            ABANDONED
          </span>
        )}

      {currentStatusFilter !== 'playing' && game.userStatus === 'playing' && (
        <span
          className={cn(
            'absolute top-18 left-22 z-10 rounded bg-blue-600/90 px-4 py-1 text-base tracking-[4px] text-white shadow-lg ring-2 ring-sky-300 transition-all duration-500',
            game.userStatus === 'playing' && showBadge === 'playing'
              ? 'animate-wiggle opacity-100 group-hover:top-0 group-hover:left-[-15px] group-hover:scale-60 group-hover:animate-none'
              : 'opacity-0',
          )}
          style={{ fontFamily: '"Staatliches", sans-serif' }}
        >
          PLAYING
        </span>
      )}

      {currentStatusFilter !== 'completed' &&
        game.userStatus === 'completed' && (
          <span
            className={cn(
              'absolute top-14 left-22 z-10 rotate-[2deg] rounded bg-yellow-500/90 px-4 py-1 text-base tracking-[6px] text-white shadow-md ring-2 ring-yellow-700 transition-all duration-500',
              (game.userStatus === 'completed' ||
                game.userStatus === 'platinum') &&
                showBadge === 'completed'
                ? 'opacity-100 group-hover:top-0 group-hover:left-[-20px] group-hover:scale-60 group-hover:rotate-0'
                : 'opacity-0',
            )}
            style={{ fontFamily: '"Staatliches", sans-serif' }}
          >
            COMPLETED
          </span>
        )}

      {currentStatusFilter !== 'platinum' && game.userStatus === 'platinum' && (
        <div
          className={cn(
            'absolute top-6 left-26 z-30 flex items-center justify-center transition-all duration-500',
            game.userStatus === 'platinum' && showBadge === 'platinum'
              ? 'opacity-100 group-hover:top-[-25px] group-hover:left-[-5px] group-hover:scale-40'
              : 'opacity-0',
          )}
        >
          <div className="relative">
            <img
              src="/ps-trophy.png"
              alt="Platinum Trophy"
              className="h-24 drop-shadow-[0_0_12px_rgba(173,216,230,0.6)]"
            />
            <span
              className="shine-wrapper absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 rounded bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-1.5 text-sm font-bold tracking-[8px] text-white uppercase shadow-md ring-1 ring-white/30"
              style={{ fontFamily: '"Staatliches", sans-serif' }}
            >
              Platinum
            </span>
          </div>
        </div>
      )}

      <div className="mt-auto flex w-full items-center justify-between gap-3 bg-black/70 p-2">
        <p
          title={game.name}
          className="max-w-[250px] truncate text-sm font-bold text-white"
        >
          {game.name}
        </p>
        <button
          onClick={handleReset}
          className="ml-auto cursor-pointer rounded-full p-1 transition-all duration-300 hover:bg-white/40"
        >
          <RotateCcw className="h-4 w-4 text-white" />
        </button>
        <button
          onClick={handleDelete}
          className="cursor-pointer rounded-full p-1 transition-all duration-300 hover:bg-white/40"
        >
          <CircleX className="h-4 w-4 text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default GameCard;
