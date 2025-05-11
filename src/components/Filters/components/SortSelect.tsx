import { SORTING_OPTIONS } from '@/misc/consts';
import { GamesLibraryFilters } from '@/misc/types';

type SortSelectProps = {
  value: GamesLibraryFilters['sort'] | '';
  onChange: (value: GamesLibraryFilters['sort']) => void;
};

const SortSelect = ({ value, onChange }: SortSelectProps) => (
  <select
    value={value || 'none'}
    onChange={(e) => onChange(e.target.value as GamesLibraryFilters['sort'])}
    className="custom-select border-border/40 bg-primary h-9 w-36 appearance-none rounded border bg-[url('/icons/chevron-down.svg')] bg-[length:16px_16px] bg-[right_0.75rem_center] bg-no-repeat px-2 pr-8 text-sm text-white focus:ring-1 focus:ring-blue-600 focus:outline-none"
  >
    {SORTING_OPTIONS.map((sort) => (
      <option key={sort.value} value={sort.value}>
        {sort.label}
      </option>
    ))}
  </select>
);

export default SortSelect;
