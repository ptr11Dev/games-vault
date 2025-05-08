import { useState } from 'react';

import {
  ArrowDown,
  ArrowUp,
  Filter,
  Gauge,
  RefreshCw,
  Search,
} from 'lucide-react';

import { UserGamesFilters } from '@/hooks/useUserGamesQuery';
import { GameUserStatus } from '@/types';

const statusOptions: GameUserStatus[] = [
  'wishlisted',
  'abandoned',
  'completed',
  'platinum',
];

const sortOptions: { value: UserGamesFilters['sort']; label: string }[] = [
  { value: 'status', label: 'Status' },
  { value: 'name', label: 'Name' },
  { value: 'released', label: 'Release Date' },
  { value: 'updatedAt', label: 'Last Updated' },
  { value: 'metacritic', label: 'Metacritic' },
];

export const Filters = ({
  onChange,
}: {
  onChange: (filters: UserGamesFilters) => void;
}) => {
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [metacriticMin, setMetacriticMin] = useState('');
  const [sort, setSort] = useState<UserGamesFilters['sort']>('status');
  const [direction, setDirection] =
    useState<UserGamesFilters['direction']>('desc');

  const handleApply = (e?: React.FormEvent) => {
    e?.preventDefault();
    onChange({
      status: status as GameUserStatus,
      name,
      metacriticMin: metacriticMin ? Number(metacriticMin) : undefined,
      sort,
      direction,
    });
  };

  const handleReset = () => {
    setStatus('');
    setName('');
    setMetacriticMin('');
    setSort('status');
    setDirection('desc');
    onChange({ sort: 'status', direction: 'desc' });
  };

  return (
    <form
      onSubmit={handleApply}
      className="bg-primary-dark flex flex-wrap items-end justify-between gap-2 rounded-lg border border-blue-600/30 p-3 shadow-md"
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative w-48">
          <Search className="pointer-events-none absolute top-2 left-2 h-5 w-5 text-blue-600" />
          <input
            type="text"
            placeholder="Search..."
            className="border-border/40 bg-primary h-9 w-full rounded border pr-2 pl-9 text-sm text-white placeholder:text-gray-500 focus:ring-1 focus:ring-blue-600 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Status Select */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="custom-select border-border/40 bg-primary h-9 w-36 appearance-none rounded border bg-[url('/icons/chevron-down.svg')] bg-[length:16px_16px] bg-[right_0.75rem_center] bg-no-repeat px-2 pr-8 text-sm text-white focus:ring-1 focus:ring-blue-600 focus:outline-none"
        >
          <option value="">All Statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        {/* Metacritic */}
        <div className="relative w-32">
          <Gauge className="pointer-events-none absolute top-2 left-2 h-5 w-5 text-blue-600" />
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Metacritic"
            className="custom-number-input border-border/40 bg-primary h-9 w-full appearance-none rounded border pr-2 pl-9 text-sm text-white placeholder:text-gray-500 focus:ring-1 focus:ring-blue-600 focus:outline-none"
            value={metacriticMin}
            onChange={(e) => setMetacriticMin(e.target.value)}
          />
        </div>

        {/* Sort Select */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as UserGamesFilters['sort'])}
          className="custom-select border-border/40 bg-primary h-9 w-36 appearance-none rounded border bg-[url('/icons/chevron-down.svg')] bg-[length:16px_16px] bg-[right_0.75rem_center] bg-no-repeat px-2 pr-8 text-sm text-white focus:ring-1 focus:ring-blue-600 focus:outline-none"
        >
          {sortOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Direction toggle */}
        <button
          type="button"
          onClick={() =>
            setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
          }
          className="h-9 cursor-pointer rounded bg-blue-600/20 px-2 text-sm text-white transition hover:bg-blue-600/30"
        >
          {direction === 'asc' ? (
            <ArrowUp size={18} />
          ) : (
            <ArrowDown size={18} />
          )}
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="flex h-9 cursor-pointer items-center gap-1 rounded bg-blue-600 px-3 text-sm font-medium text-white transition hover:bg-blue-300"
        >
          <Filter size={18} />
          Apply
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="border-border hover:bg-border/50 flex h-9 cursor-pointer items-center gap-1 rounded border px-3 text-sm text-white transition"
        >
          <RefreshCw size={18} />
          Reset
        </button>
      </div>
    </form>
  );
};
