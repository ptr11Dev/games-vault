import { GameInLibraryStatus, GamesLibraryFilters } from './types';

export const STATUS_OPTIONS: GameInLibraryStatus[] = [
  'wishlisted',
  'abandoned',
  'completed',
  'platinum',
  'playing',
];

export const SORTING_OPTIONS: {
  value: GamesLibraryFilters['sort'];
  label: string;
}[] = [
  { value: 'none', label: 'Default Order' },
  { value: 'status', label: 'Status' },
  { value: 'name', label: 'Name' },
  { value: 'released', label: 'Release Date' },
  { value: 'updatedAt', label: 'Last Updated' },
  { value: 'metacritic', label: 'Metacritic' },
];

export const NEXT_STATUS_MAP: Record<
  GameInLibraryStatus,
  GameInLibraryStatus | null
> = {
  playing: 'completed',
  completed: 'platinum',
  abandoned: 'wishlisted',
  wishlisted: 'playing',
  platinum: null,
};

export const ABANDON_STATUS_MAP: Record<
  GameInLibraryStatus,
  GameInLibraryStatus | null
> = {
  playing: 'abandoned',
  wishlisted: 'abandoned',
  completed: null,
  platinum: null,
  abandoned: null,
};
