import Filters from '@/components/Filters/Filters';
import GameCard from '@/components/GameCard/GameCard';
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import { useGamesLibraryQuery } from '@/hooks/query/useGamesLibraryQuery';
import { useGamesQuery } from '@/hooks/query/useGamesQuery';
import { useDebounceSearchParams } from '@/hooks/useDebounceSearchParams';
import { TEXTS } from '@/misc/texts';
import { filterGamesInLibrary } from '@/utils/filterGamesInLibrary';

const { ERROR, NO_GAMES } = TEXTS.HOME;

const Home = () => {
  const { searchParams, setSearchParams, debouncedParams } =
    useDebounceSearchParams(400);

  const {
    data: games,
    isLoading,
    error,
  } = useGamesLibraryQuery(debouncedParams);

  const { data } = useGamesQuery();

  console.log('data', data);

  const renderGamesLibrary = () => {
    if (isLoading)
      return (
        <div className="mt-6 min-h-[400px]">
          <Loader size="large" />
        </div>
      );

    if (error)
      return (
        <div className="mt-6 flex min-h-[400px] items-center justify-center">
          <p className="text-red-500">{ERROR}</p>
        </div>
      );

    if (!games?.length)
      return (
        <div className="mt-6 flex min-h-[400px] items-center justify-center">
          <p className="text-text-secondary">{NO_GAMES}</p>
        </div>
      );

    return (
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {(searchParams.get('sort') === 'none' || !searchParams.get('sort')
          ? filterGamesInLibrary(games, searchParams)
          : games
        ).map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      <Nav />
      <Filters searchParams={searchParams} setSearchParams={setSearchParams} />
      {renderGamesLibrary()}
    </div>
  );
};

export default Home;
