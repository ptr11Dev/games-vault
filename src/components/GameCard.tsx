import { useEffect, useState } from 'react';

import { CircleX, RotateCcw } from 'lucide-react';

import { BurnCanvas } from '@/effects/BurnCardEffect';
import { useRemoveUserGameMutation } from '@/hooks/useRemoveUserGameMutation';
import { useUpdateUserGameStatusMutation } from '@/hooks/useUpdateUserGameStatusMutation';
import { useUserStore } from '@/store/userStore';
import { GameUserStatus, UserGame } from '@/types';

import MetascoreBadge from './MetascoreBadge';

type GameCardProps = {
  game: UserGame;
};

const GameCard = ({ game }: GameCardProps) => {
  const [effectType, setEffectType] = useState<'burn' | 'unburn' | null>(
    game.userStatus === 'abandoned' ? 'burn' : null,
  );
  const [showBadge, setShowBadge] = useState<GameUserStatus | 'none'>('none');
  const user = useUserStore((state) => state.user);

  const { mutate: updateStatus } = useUpdateUserGameStatusMutation();
  const { mutate: removeUserGame } = useRemoveUserGameMutation();

  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(game.userStatus), 100);
    return () => clearTimeout(timer);
  }, [game.userStatus]);

  const isReleased =
    new Date(game.released ?? '9999-12-31') <= new Date() && !game.tba;

  const handleCompleteClick = () => {
    if (game.userStatus === 'wishlisted') {
      setShowBadge('completed');
      updateStatus({
        userId: user?.id ?? '',
        gameId: game.id,
        userStatus: 'completed',
      });
    } else if (game.userStatus === 'abandoned') {
      setEffectType('unburn');
      setShowBadge('none');
      updateStatus({
        userId: user?.id ?? '',
        gameId: game.id,
        userStatus: 'wishlisted',
      });
    } else if (game.userStatus === 'completed') {
      setShowBadge('platinum');
      updateStatus({
        userId: user?.id ?? '',
        gameId: game.id,
        userStatus: 'platinum',
      });
    }
  };

  const handleAbandonClick = () => {
    if (game.userStatus === 'wishlisted') {
      setEffectType('burn');
      setShowBadge('abandoned');
      updateStatus({
        userId: user?.id ?? '',
        gameId: game.id,
        userStatus: 'abandoned',
      });
    }
  };

  const handleReset = () => {
    setEffectType('unburn');
    setShowBadge('none');
    updateStatus({
      userId: user?.id ?? '',
      gameId: game.id,
      userStatus: 'wishlisted',
    });
  };

  const handleDelete = () => {
    removeUserGame({
      userId: user!.id,
      gameId: game.id,
    });
  };

  return (
    <div className="group relative flex h-[200px] w-[300px] cursor-pointer flex-col justify-around overflow-hidden rounded-xl">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${game.background_image})`,
            transform: 'translateZ(0)',
          }}
        />
        {effectType ? (
          <div className="absolute inset-0 z-20 bg-transparent will-change-transform">
            <BurnCanvas type={effectType} />
          </div>
        ) : (
          game.userStatus !== 'wishlisted' && (
            <div className="absolute inset-0 z-10 bg-black/60 transition-[background] duration-1000 will-change-transform group-hover:bg-transparent" />
          )
        )}
      </div>

      {/* Green Right Action (Complete) */}
      {game.userStatus !== 'platinum' && (
        <div
          onClick={handleCompleteClick}
          className="absolute top-1/2 right-0 z-50 flex h-1/2 w-0 translate-x-5 translate-y-[-50%] cursor-pointer items-center justify-center overflow-hidden rounded-l-full bg-green-500/80 transition-all duration-300 group-hover:w-8 group-hover:translate-x-0 group-hover:opacity-100"
        />
      )}

      {/* Red Left Action (Abandon) */}
      {game.userStatus === 'wishlisted' && (
        <div
          onClick={handleAbandonClick}
          className="absolute top-1/2 left-0 z-50 flex h-1/2 w-0 -translate-x-5 translate-y-[-50%] cursor-pointer items-center justify-center overflow-hidden rounded-r-full bg-red-500/80 transition-all duration-300 group-hover:w-8 group-hover:translate-x-0 group-hover:opacity-100"
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
        <span
          className={`absolute top-4 right-4 z-10 rotate-[-15deg] rounded bg-red-700/90 px-4 py-1 text-base tracking-[5px] text-white shadow-md ring-2 ring-red-900 transition-opacity duration-1000 ${
            game.userStatus === 'abandoned' && showBadge === 'abandoned'
              ? 'opacity-100'
              : 'opacity-0'
          }`}
          style={{
            fontFamily: '"Staatliches", sans-serif',
          }}
        >
          ABANDONED
        </span>

        <span
          className={`absolute top-4 left-1/2 z-10 -translate-x-1/2 rotate-[2deg] rounded bg-yellow-500/90 px-5 py-1.5 text-lg tracking-[6px] text-white shadow-md ring-2 ring-yellow-700 transition-opacity duration-1000 ${
            (game.userStatus === 'completed' ||
              game.userStatus === 'platinum') &&
            showBadge === 'completed'
              ? 'opacity-100 group-hover:opacity-40'
              : 'opacity-0'
          }`}
          style={{
            fontFamily: '"Staatliches", sans-serif',
          }}
        >
          COMPLETED
        </span>
        {
          <div
            className={`absolute inset-0 bottom-8 z-30 flex items-center justify-center transition-opacity duration-1000 ${
              game.userStatus === 'platinum' && showBadge === 'platinum'
                ? 'opacity-100 group-hover:opacity-40'
                : 'opacity-0'
            }`}
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
        }
      </div>

      {/* Bottom - Title */}
      <div className="flex w-full items-center justify-between gap-3 bg-black/70 p-2">
        <p className="text-sm font-bold text-white">{game.name}</p>
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
