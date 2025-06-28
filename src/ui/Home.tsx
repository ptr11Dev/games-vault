import Filters from '@/components/Filters/Filters';
import GameCard from '@/components/GameCard/GameCard';
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import { useGamesLibraryQuery } from '@/hooks/query/useGamesLibraryQuery';
import { useDebounceSearchParams } from '@/hooks/useDebounceSearchParams';
import { TEXTS } from '@/misc/texts';
import { filterGamesInLibrary } from '@/utils/filterGamesInLibrary';

const { ERROR, NO_GAMES } = TEXTS.HOME;

const Home = () => {
  const { searchParams, setSearchParams } = useDebounceSearchParams(400);

  const { data: games, isLoading, error } = useGamesLibraryQuery();

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

    const shouldUseGroupedDisplay =
      searchParams.get('sort') === 'none' || !searchParams.get('sort');

    if (shouldUseGroupedDisplay) {
      const groupedGames = filterGamesInLibrary(games, searchParams);

      return (
        <div className="mt-6 space-y-8">
          {groupedGames.map((group) => (
            <div key={group.status} className="space-y-4">
              <h2 className="text-text-primary border-border border-b pb-2 text-2xl font-bold">
                {group.label}
              </h2>
              <div
                className="grid justify-start gap-6"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, 300px)',
                }}
              >
                {group.games.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        className="mt-6 grid justify-center gap-6"
        style={{ gridTemplateColumns: 'repeat(auto-fit, 300px)' }}
      >
        {games.map((game) => (
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
