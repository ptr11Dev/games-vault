import { useState } from 'react';

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

const directionOptions: {
  value: UserGamesFilters['direction'];
  label: string;
}[] = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
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

  const handleApply = () => {
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
    onChange({
      sort: 'status',
      direction: 'desc',
    });
  };

  return (
    <div className="bg-primary-lighter flex flex-wrap gap-4 rounded-xl p-4 shadow-md">
      <input
        type="text"
        placeholder="Search by name"
        className="bg-primary border-border w-60 rounded-md border px-4 py-2 text-white"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className="bg-primary border-border rounded-md border px-3 py-2 text-white"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All statuses</option>
        {statusOptions.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Metacritic ≥"
        className="bg-primary border-border w-36 rounded-md border px-4 py-2 text-white"
        value={metacriticMin}
        onChange={(e) => setMetacriticMin(e.target.value)}
      />

      <select
        className="bg-primary border-border rounded-md border px-3 py-2 text-white"
        value={sort}
        onChange={(e) => setSort(e.target.value as UserGamesFilters['sort'])}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            Sort by {option.label}
          </option>
        ))}
      </select>

      <select
        className="bg-primary border-border rounded-md border px-3 py-2 text-white"
        value={direction}
        onChange={(e) =>
          setDirection(e.target.value as UserGamesFilters['direction'])
        }
      >
        {directionOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleApply}
        className="bg-accent hover:bg-accent-lighter cursor-pointer rounded-md px-6 py-2 font-semibold text-white transition"
      >
        Apply Filters
      </button>
      <button
        onClick={handleReset}
        className="bg-border hover:bg-border/80 cursor-pointer rounded-md px-6 py-2 font-semibold text-white transition"
      >
        Reset Filters
      </button>
    </div>
  );
};
