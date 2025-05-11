// TODO refactor
import { ArrowDown, ArrowUp, Gauge, RefreshCw, Search } from 'lucide-react';

import { GamesLibraryFilters } from '@/hooks/useGamesLibraryQuery';
import { GameInLibraryStatus } from '@/types';

const statusOptions: GameInLibraryStatus[] = [
  'wishlisted',
  'abandoned',
  'completed',
  'platinum',
  'playing',
];

const sortOptions: { value: GamesLibraryFilters['sort']; label: string }[] = [
  { value: 'none', label: 'Default Order' },
  { value: 'status', label: 'Status' },
  { value: 'name', label: 'Name' },
  { value: 'released', label: 'Release Date' },
  { value: 'updatedAt', label: 'Last Updated' },
  { value: 'metacritic', label: 'Metacritic' },
];

type FiltersProps = {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
};

const Filters = ({ searchParams, setSearchParams }: FiltersProps) => {
  const handleApply = (e?: React.FormEvent) => {
    e?.preventDefault();
    const newParams = new URLSearchParams(searchParams);

    const name = newParams.get('name') || '';
    const status = newParams.get('status') || '';
    const metacriticMin = newParams.get('metacriticMin') || '';
    const sort = newParams.get('sort') || 'status';
    const direction = newParams.get('direction') || 'desc';

    if (name) newParams.set('name', name);
    else newParams.delete('name');

    if (status) newParams.set('status', status);
    else newParams.delete('status');

    if (metacriticMin) newParams.set('metacriticMin', metacriticMin);
    else newParams.delete('metacriticMin');

    newParams.set('sort', sort);
    newParams.set('direction', direction);

    setSearchParams(newParams);
  };

  const handleReset = () => {
    setSearchParams(new URLSearchParams({}));
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
            value={searchParams.get('name') || ''}
            onChange={(e) => {
              const newParams = new URLSearchParams(searchParams);
              if (e.target.value) newParams.set('name', e.target.value);
              else newParams.delete('name');
              setSearchParams(newParams);
            }}
          />
        </div>
        {/* Status Select */}
        <select
          value={searchParams.get('status') || ''}
          onChange={(e) => {
            const newParams = new URLSearchParams(searchParams);
            if (e.target.value) newParams.set('status', e.target.value);
            else newParams.delete('status');
            setSearchParams(newParams);
          }}
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
            value={searchParams.get('metacriticMin') || ''}
            onChange={(e) => {
              const newParams = new URLSearchParams(searchParams);
              if (e.target.value)
                newParams.set('metacriticMin', e.target.value);
              else newParams.delete('metacriticMin');
              setSearchParams(newParams);
            }}
          />
        </div>
        {/* Sort Select */}
        <select
          value={searchParams.get('sort') || 'none'}
          onChange={(e) => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('sort', e.target.value);
            setSearchParams(newParams);
          }}
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
          onClick={() => {
            const newParams = new URLSearchParams(searchParams);
            const currentDirection = newParams.get('direction') || 'desc';
            newParams.set(
              'direction',
              currentDirection === 'asc' ? 'desc' : 'asc',
            );
            setSearchParams(newParams);
          }}
          className="h-9 cursor-pointer rounded bg-blue-600/20 px-2 text-sm text-white transition hover:bg-blue-600/30"
        >
          {searchParams.get('direction') === 'asc' ? (
            <ArrowUp size={18} />
          ) : (
            <ArrowDown size={18} />
          )}
        </button>
      </div>
      {/* Action button */}
      <button
        type="button"
        onClick={handleReset}
        className="border-border hover:bg-border/50 flex h-9 cursor-pointer items-center gap-1 rounded border px-3 text-sm text-white transition"
      >
        <RefreshCw size={18} />
        Reset
      </button>
    </form>
  );
};

export default Filters;
