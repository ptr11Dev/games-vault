import { STATUS_OPTIONS } from '@/misc/consts';
import { TEXTS } from '@/misc/texts';
import { GamesLibraryFilters } from '@/misc/types';

type StatusSelectProps = {
  value: GamesLibraryFilters['status'] | '';
  onChange: (value: GamesLibraryFilters['status'] | '') => void;
};

const { ALL } = TEXTS.FILTERS.STATUSES;

const StatusSelect = ({ value, onChange }: StatusSelectProps) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value as GamesLibraryFilters['status'])}
    className="custom-select border-theme bg-lighter text-primary h-9 w-36 appearance-none rounded border bg-[url('/icons/chevron-down.svg')] bg-[length:16px_16px] bg-[right_0.75rem_center] bg-no-repeat px-2 pr-8 text-sm focus:ring-1 focus:ring-blue-600 focus:outline-none"
  >
    <option value="">{ALL}</option>
    {STATUS_OPTIONS.map((s) => (
      <option key={s} value={s}>
        {s.charAt(0).toUpperCase() + s.slice(1)}
      </option>
    ))}
  </select>
);

export default StatusSelect;
