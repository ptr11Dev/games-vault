type PlatinumBadgeProps = {
  visible: boolean;
};

const PlatinumBadge = ({ visible }: PlatinumBadgeProps) => {
  return (
    <div
      className={`absolute top-6 left-26 z-30 flex items-center justify-center transition-all duration-500 ${
        visible
          ? 'opacity-100 group-hover:top-[-25px] group-hover:left-[-5px] group-hover:scale-40'
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
          className="shine-wrapper absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 rounded bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-1.5 text-sm font-bold tracking-[5px] text-white uppercase shadow-md ring-1 ring-white/30"
          style={{ fontFamily: '"Staatliches", sans-serif' }}
        >
          Platinum
        </span>
      </div>
    </div>
  );
};

export default PlatinumBadge;
