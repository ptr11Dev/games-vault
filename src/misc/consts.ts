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
