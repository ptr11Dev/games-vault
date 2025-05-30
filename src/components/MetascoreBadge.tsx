import { TEXTS } from '@/misc/texts';

type MetascoreBadgeProps = {
  score: number | null;
};

const { TBA } = TEXTS.METACRITIC;

const getMetascoreColor = (score: number): string => {
  if (score >= 90) return 'bg-green-500';
  if (score >= 75) return 'bg-lime-500';
  if (score >= 50) return 'bg-yellow-400';
  if (score >= 20) return 'bg-red-500';
  return 'bg-red-700';
};

const MetascoreBadge = ({ score }: MetascoreBadgeProps) => {
  if (score === null || score === undefined) {
    return (
      <div className="z-20 ml-auto flex h-8 w-8 items-center justify-center rounded border border-gray-500 bg-white text-lg font-bold text-black shadow">
        {TBA}
      </div>
    );
  }

  return (
    <div
      className={`z-20 ml-auto flex h-8 w-8 items-center justify-center rounded text-lg font-bold text-black shadow ${getMetascoreColor(
        score,
      )}`}
      title={`Metascore: ${score}`}
    >
      {score}
    </div>
  );
};

export default MetascoreBadge;
