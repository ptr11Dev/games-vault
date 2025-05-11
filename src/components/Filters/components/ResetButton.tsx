import { RefreshCw } from 'lucide-react';

type ResetButtonProps = {
  onClick: () => void;
};

const ResetButton = ({ onClick }: ResetButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className="border-border hover:bg-border/50 flex h-9 cursor-pointer items-center gap-1 rounded border px-3 text-sm text-white transition"
  >
    <RefreshCw size={18} />
    Reset
  </button>
);

export default ResetButton;
