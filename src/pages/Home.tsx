import Filters from '@/components/Filters';
import GameCard from '@/components/GameCard';
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import { useDebounceSearchParams } from '@/hooks/useDebounceSearchParams';
import { useGamesLibraryQuery } from '@/hooks/useGamesLibraryQuery';
import { useUserStore } from '@/store/userStore';
import { filterGamesInLibrary } from '@/utils/filterGamesInLibrary';

const Home = () => {
  const { searchParams, setSearchParams, debouncedParams } =
    useDebounceSearchParams(400);
  const userId = useUserStore((state) => state.user?.id ?? null);

  const {
    data: games,
    isLoading,
    error,
  } = useGamesLibraryQuery(userId, debouncedParams);

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
          <p className="text-red-500">Failed to load games</p>
        </div>
      );

    if (!games?.length)
      return (
        <div className="mt-6 flex min-h-[400px] items-center justify-center">
          <p className="text-text-secondary">No games found</p>
        </div>
      );

    return (
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filterGamesInLibrary(games).map((game) => (
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
