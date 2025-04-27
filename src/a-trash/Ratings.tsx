import MetascoreBadge from '../components/MetascoreBadge';
import RawgRatingBadge from './RawgRatingBadge';

type RatingsProps = {
  metascore: number | null;
  rawgScore: number | null;
};

const Ratings = ({ metascore, rawgScore }: RatingsProps) => {
  return (
    <div className="mb-2 flex items-center justify-center gap-2">
      <MetascoreBadge score={metascore} />
      <RawgRatingBadge rating={rawgScore} />
    </div>
  );
};
export default Ratings;
