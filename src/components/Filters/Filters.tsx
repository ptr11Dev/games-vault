import { GamesLibraryFilters } from '@/misc/types';

import DirectionToggle from './components/DirectionToggle';
import MetacriticInput from './components/MetacriticInput';
import ResetButton from './components/ResetButton';
import SearchInput from './components/SearchInput';
import SortSelect from './components/SortSelect';
import StatusSelect from './components/StatusSelect';

type FiltersProps = {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
};

const Filters = ({ searchParams, setSearchParams }: FiltersProps) => {
  const updateParam = <K extends keyof GamesLibraryFilters>(
    key: K,
    value: GamesLibraryFilters[K] | '',
  ) => {
    const newParams = new URLSearchParams(searchParams);

    if (value !== '' && value !== undefined && value !== null) {
      newParams.set(key, String(value));
    } else {
      newParams.delete(key);
    }

    if (key === 'sort' && !searchParams.has('direction')) {
      newParams.set('direction', 'desc');
    }

    setSearchParams(newParams);
  };

  const handleApply = (e?: React.FormEvent) => {
    e?.preventDefault();
    const newParams = new URLSearchParams(searchParams);
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
        <SearchInput
          value={searchParams.get('name') || ''}
          onChange={(val) => updateParam('name', val)}
        />
        <StatusSelect
          value={
            (searchParams.get('status') as GamesLibraryFilters['status']) || ''
          }
          onChange={(val) => updateParam('status', val)}
        />
        <MetacriticInput
          value={
            searchParams.get('metacriticMin')
              ? Number(searchParams.get('metacriticMin'))
              : ''
          }
          onChange={(val) => updateParam('metacriticMin', val)}
        />
        <SortSelect
          value={
            (searchParams.get('sort') as GamesLibraryFilters['sort']) || ''
          }
          onChange={(val) => updateParam('sort', val)}
        />
        <DirectionToggle
          value={
            (searchParams.get(
              'direction',
            ) as GamesLibraryFilters['direction']) || ''
          }
          onChange={(val) => updateParam('direction', val)}
        />
      </div>

      <ResetButton onClick={handleReset} />
    </form>
  );
};

export default Filters;
