import { FilterParams, GameInLibraryStatus } from '@/misc/types';

export const parseFiltersFromParams = (
  params?: URLSearchParams,
): FilterParams => {
  if (!params) return {};

  const metacriticMinParam = params.get('metacriticMin');
  const metacriticMin = metacriticMinParam
    ? parseInt(metacriticMinParam, 10)
    : undefined;

  return {
    name: params.get('name')?.toLowerCase().trim() || undefined,
    status: (params.get('status') as GameInLibraryStatus) || undefined,
    metacriticMin:
      metacriticMin && !isNaN(metacriticMin) ? metacriticMin : undefined,
    direction: (params.get('direction') as 'asc' | 'desc') || 'desc',
  };
};
