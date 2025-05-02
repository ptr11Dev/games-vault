import { useEffect, useState } from 'react';

import { BurnCanvas } from '@/effects/BurnCardEffect';
import { useGamesStore } from '@/store/store';
import { GameUserStatus, UserGame } from '@/types';

import MetascoreBadge from './MetascoreBadge';

type GameCardProps = {
  game: UserGame;
};

const GameCard = ({ game }: GameCardProps) => {
  const updateGameStatus = useGamesStore((state) => state.updateGameStatus);
  const [effectType, setEffectType] = useState<'burn' | 'unburn' | null>(
    game.userStatus === 'abandoned' ? 'burn' : null,
  );
  const [showBadge, setShowBadge] = useState<GameUserStatus | 'none'>('none');

  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(game.userStatus), 100);
    return () => clearTimeout(timer);
  }, [game.userStatus]);

  const isReleased =
    new Date(game.released ?? '9999-12-31') <= new Date() && !game.tba;

  const handleCompleteClick = () => {
    if (game.userStatus === 'wishlisted') {
      updateGameStatus(game.id, 'completed');
      setShowBadge('completed');
    } else if (game.userStatus === 'abandoned') {
      updateGameStatus(game.id, 'wishlisted');
      setEffectType('unburn');
      setShowBadge('none');
    } else if (game.userStatus === 'completed') {
      updateGameStatus(game.id, 'platinum');
      setShowBadge('platinum');
    }
  };

  const handleAbandonClick = () => {
    if (game.userStatus === 'wishlisted') {
      updateGameStatus(game.id, 'abandoned');
      setEffectType('burn');
      setShowBadge('abandoned');
    }
  };

  return (
    <div className="group relative flex h-[200px] w-[300px] cursor-pointer flex-col justify-around overflow-hidden rounded-xl">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-3000"
          style={{ backgroundImage: `url(${game.background_image})` }}
        />
        {effectType && (
          <div className="absolute inset-0 z-20 bg-transparent">
            <BurnCanvas type={effectType} />
          </div>
        )}
      </div>

      {/* Green Right Action (Complete) */}
      {game.userStatus !== 'platinum' && (
        <div
          onClick={handleCompleteClick}
          className="absolute top-0 right-0 z-50 flex h-full w-0 translate-x-5 cursor-pointer items-center justify-center overflow-hidden bg-green-500/80 transition-all duration-300 group-hover:w-8 group-hover:translate-x-0 group-hover:opacity-100"
        />
      )}

      {/* Red Left Action (Abandon) */}
      {game.userStatus === 'wishlisted' && (
        <div
          onClick={handleAbandonClick}
          className="absolute top-0 left-0 z-50 flex h-full w-0 -translate-x-5 cursor-pointer items-center justify-center overflow-hidden bg-red-500/80 transition-all duration-300 group-hover:w-8 group-hover:translate-x-0 group-hover:opacity-100"
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
              ? 'opacity-100'
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
                ? 'opacity-100'
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
      <p className="w-full truncate bg-black/70 p-2 text-sm font-bold text-white">
        {game.name}
      </p>
    </div>
  );
};

export default GameCard;
