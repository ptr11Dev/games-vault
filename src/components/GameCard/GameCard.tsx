import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { useRemoveGameFromLibraryMutation } from '@/hooks/mutation/useRemoveGameFromLibraryMutation';
import { useUpdateGameStatusInLibraryMutation } from '@/hooks/mutation/useUpdateGameStatusInLibraryMutation';
import { cn } from '@/lib/utils';
import { ABANDON_STATUS_MAP, NEXT_STATUS_MAP } from '@/misc/consts';
import { TEXTS } from '@/misc/texts';
import { GameInLibrary, GameInLibraryStatus } from '@/misc/types';

import Loader from '../Loader';
import MetascoreBadge from '../MetascoreBadge';
import Actions from './components/Actions';
import Footer from './components/Footer';
import PlatinumBadge from './components/PlatinumBadge';
import StatusBadge from './components/StatusBadge';

type GameCardProps = {
  game: GameInLibrary;
};

const { COMING, TBA } = TEXTS.METACRITIC;

const GameCard = ({ game }: GameCardProps) => {
  const [showBadge, setShowBadge] = useState<GameInLibraryStatus | 'none'>(
    'none',
  );
  const [searchParams] = useSearchParams();
  const currentStatusFilter = searchParams.get('status');

  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateGameStatusInLibraryMutation();
  const { mutate: removeUserGame, isPending: isRemoving } =
    useRemoveGameFromLibraryMutation();

  const isReleased =
    new Date(game.released ?? '9999-12-31') <= new Date() && !game.tba;

  useEffect(() => {
    if (!currentStatusFilter) {
      setShowBadge(game.userStatus);
    }
  }, []);

  const handleCompleteClick = () => {
    const nextStatus = NEXT_STATUS_MAP[game.userStatus];
    if (!nextStatus) return;

    setShowBadge(
      nextStatus === 'wishlisted' || currentStatusFilter ? 'none' : nextStatus,
    );

    updateStatus({
      gameId: game.id,
      userStatus: nextStatus,
    });
  };

  const handleAbandonClick = () => {
    const nextStatus = ABANDON_STATUS_MAP[game.userStatus];
    if (!nextStatus) return;

    setShowBadge(currentStatusFilter ? 'none' : nextStatus);

    updateStatus({
      gameId: game.id,
      userStatus: nextStatus,
    });
  };

  const handleReset = () => {
    setShowBadge('none');
    updateStatus({
      gameId: game.id,
      userStatus: 'wishlisted',
    });
  };

  const handleDelete = () => {
    removeUserGame({ gameId: game.id });
  };

  const isOverlayVisible =
    !currentStatusFilter &&
    showBadge !== 'none' &&
    showBadge !== 'wishlisted' &&
    showBadge !== 'playing';

  return (
    <div
      className={cn(
        'group relative flex h-[200px] w-[300px] flex-col justify-around overflow-hidden rounded-xl transition-shadow duration-500',
        game.userStatus === 'playing' && showBadge === 'playing' && 'glow-card',
      )}
    >
      {/* Loader */}
      {(isUpdating || isRemoving) && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <Loader size="small" className="h-full" />
        </div>
      )}
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className={cn(
            'absolute inset-0 bg-center will-change-transform',
            game.background_image ? 'bg-cover' : 'bg-contain bg-no-repeat',
          )}
          style={{
            backgroundImage: `url(${game.background_image ?? '/no_image.png'})`,
            transform: 'translateZ(0)',
          }}
        />
        {isOverlayVisible && (
          <div className="absolute inset-0 z-10 bg-black/60 transition-[background] duration-1000 will-change-transform group-hover:bg-transparent" />
        )}
      </div>
      {/* Actions */}
      <Actions
        status={game.userStatus}
        onComplete={handleCompleteClick}
        onAbandon={handleAbandonClick}
      />
      {/* Metacritic badge */}
      <div className="flex justify-between p-2">
        {!isReleased && (
          <p className="flex h-1/2 items-center rounded bg-white px-2 py-1 text-xs font-bold text-black">
            {`${COMING} ${game.released ?? TBA}`}
          </p>
        )}
        <MetascoreBadge score={game.metacritic} />
      </div>
      {/* Status badges */}
      {(['abandoned', 'playing', 'completed'] as const).map((status) =>
        currentStatusFilter !== status && game.userStatus === status ? (
          <StatusBadge
            key={status}
            status={status}
            visible={showBadge === status}
          />
        ) : null,
      )}
      {currentStatusFilter !== 'platinum' && game.userStatus === 'platinum' && (
        <PlatinumBadge visible={showBadge === 'platinum'} />
      )}
      {/* Footer */}
      <Footer name={game.name} onReset={handleReset} onDelete={handleDelete} />
    </div>
  );
};

export default GameCard;
