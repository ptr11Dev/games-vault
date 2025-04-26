type RawgRatingBadgeProps = {
  rating?: number | null;
};

const RawgRatingBadge = ({ rating }: RawgRatingBadgeProps) => {
  return (
    <div className="inline-flex h-8 items-center gap-2 rounded border border-white px-2 py-1 text-sm font-semibold text-white">
      <span
        className="font-[600] tracking-wide"
        style={{ fontFamily: 'sans-serif', letterSpacing: '0.05em' }}
      >
        RAWG
      </span>
      <span>
        {rating !== null && rating !== undefined ? rating.toFixed(1) : 'tbd'}
      </span>
    </div>
  );
};

export default RawgRatingBadge;
