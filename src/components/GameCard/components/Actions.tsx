import { GameInLibraryStatus } from '@/misc/types';

type ActionsProps = {
  status: GameInLibraryStatus;
  onComplete: () => void;
  onAbandon: () => void;
};

const Actions = ({ status, onComplete, onAbandon }: ActionsProps) => {
  return (
    <>
      {/* Move to the next status */}
      {status !== 'platinum' && (
        <div
          onClick={onComplete}
          className="absolute top-1/2 right-0 z-50 flex h-1/2 w-0 translate-x-5 translate-y-[-50%] cursor-pointer items-center justify-center overflow-hidden rounded-l-full bg-green-500/80 transition-all duration-300 group-hover:w-8 group-hover:translate-x-0 group-hover:opacity-100"
        />
      )}
      {/* Abandon game */}
      {(status === 'wishlisted' || status === 'playing') && (
        <div
          onClick={onAbandon}
          className="absolute top-1/2 left-0 z-50 flex h-1/2 w-0 -translate-x-5 translate-y-[-50%] cursor-pointer items-center justify-center overflow-hidden rounded-r-full bg-red-500/80 transition-all duration-300 group-hover:w-8 group-hover:translate-x-0 group-hover:opacity-100"
        />
      )}
    </>
  );
};

export default Actions;
