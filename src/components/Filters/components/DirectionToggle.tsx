import { ArrowDown, ArrowUp } from 'lucide-react';

import { GamesLibraryFilters } from '@/misc/types';

type DirectionToggleProps = {
  value: GamesLibraryFilters['direction'] | '';
  onChange: (value: GamesLibraryFilters['direction']) => void;
};

const DirectionToggle = ({ value, onChange }: DirectionToggleProps) => {
  const next = value === 'asc' ? 'desc' : 'asc';

  return (
    <button
      type="button"
      onClick={() => onChange(next)}
      className="h-9 cursor-pointer rounded bg-blue-600/20 px-2 text-sm text-white transition hover:bg-blue-600/30"
    >
      {value === 'asc' ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
    </button>
  );
};

export default DirectionToggle;
