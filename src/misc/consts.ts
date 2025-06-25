import { TEXTS } from './texts';
import { GameInLibraryStatus, GamesLibraryFilters } from './types';

const { DEFAULT, LAST_UPDATED, METACRITIC, NAME, RELEASE_DATE, STATUS } =
  TEXTS.FILTERS.SORT_BY;

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
  { value: 'none', label: DEFAULT },
  { value: 'status', label: STATUS },
  { value: 'name', label: NAME },
  { value: 'released', label: RELEASE_DATE },
  { value: 'updatedAt', label: LAST_UPDATED },
  { value: 'metacritic', label: METACRITIC },
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

export const STATUS_ORDER: GameInLibraryStatus[] = [
  'playing',
  'wishlisted',
  'completed',
  'platinum',
  'abandoned',
];

export const STATUS_LABELS: Record<GameInLibraryStatus, string> = {
  playing: 'Currently Playing',
  wishlisted: 'Wishlisted',
  completed: 'Completed',
  platinum: 'Platinum',
  abandoned: 'Abandoned',
};
