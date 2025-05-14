import { cn } from '@/lib/utils';
import { TEXTS } from '@/misc/texts';
import { GameInLibraryStatus } from '@/misc/types';

type StatusBadgeProps = {
  status: Exclude<GameInLibraryStatus, 'platinum'>;
  visible: boolean;
};

const { ABANDONED, COMPLETED, PLAYING } = TEXTS.GAME_CARD.BADGES;

const BADGE_STYLE_MAP: Partial<
  Record<GameInLibraryStatus, { text: string; className: string }>
> = {
  abandoned: {
    text: ABANDONED,
    className: 'top-18 left-22 bg-red-700/90 ring-red-900 rotate-[-15deg]',
  },
  playing: {
    text: PLAYING,
    className: 'top-18 left-22 bg-blue-600/90 ring-sky-300 animate-wiggle',
  },
  completed: {
    text: COMPLETED,
    className: 'top-18 left-22 bg-yellow-500/90 ring-yellow-700',
  },
};

const StatusBadge = ({ status, visible }: StatusBadgeProps) => {
  if (!BADGE_STYLE_MAP[status]) return null;
  const { text, className } = BADGE_STYLE_MAP[status];

  return (
    <span
      className={cn(
        'absolute z-10 rounded px-4 py-1 text-base tracking-[5px] text-white shadow-md ring-2 transition-all duration-500',
        className,
        visible
          ? 'opacity-100 group-hover:top-0 group-hover:left-[-10px] group-hover:scale-60 group-hover:rotate-0 group-hover:animate-none'
          : 'opacity-0',
      )}
      style={{ fontFamily: '"Staatliches", sans-serif' }}
    >
      {text}
    </span>
  );
};

export default StatusBadge;
