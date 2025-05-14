import { Gauge } from 'lucide-react';

import { TEXTS } from '@/misc/texts';
import { GamesLibraryFilters } from '@/misc/types';

type MetacriticInputProps = {
  value: GamesLibraryFilters['metacriticMin'] | '';
  onChange: (value: GamesLibraryFilters['metacriticMin'] | '') => void;
};

const { PLACEHOLDER } = TEXTS.FILTERS.METACRITIC;

const MetacriticInput = ({ value, onChange }: MetacriticInputProps) => (
  <div className="relative w-32">
    <Gauge className="pointer-events-none absolute top-2 left-2 h-5 w-5 text-blue-600" />
    <input
      type="number"
      min="0"
      max="100"
      placeholder={PLACEHOLDER}
      className="custom-number-input border-border/40 bg-primary h-9 w-full appearance-none rounded border pr-2 pl-9 text-sm text-white placeholder:text-gray-500 focus:ring-1 focus:ring-blue-600 focus:outline-none"
      value={value === '' ? '' : String(value)}
      onChange={(e) => onChange(e.target.value ? Number(e.target.value) : '')}
    />
  </div>
);

export default MetacriticInput;
