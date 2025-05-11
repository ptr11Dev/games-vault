import { CircleX, RotateCcw } from 'lucide-react';

type FooterProps = {
  name: string;
  onReset: () => void;
  onDelete: () => void;
};

const Footer = ({ name, onReset, onDelete }: FooterProps) => {
  return (
    <div className="mt-auto flex w-full items-center justify-between gap-3 bg-black/70 p-2">
      {/* Game's name */}
      <p
        title={name}
        className="max-w-[250px] truncate text-sm font-bold text-white"
      >
        {name}
      </p>
      {/* Reset status button */}
      <button
        onClick={onReset}
        className="ml-auto cursor-pointer rounded-full p-1 transition-all duration-300 hover:bg-white/40"
      >
        <RotateCcw className="h-4 w-4 text-white" />
      </button>
      {/* Delete game button */}
      <button
        onClick={onDelete}
        className="cursor-pointer rounded-full p-1 transition-all duration-300 hover:bg-white/40"
      >
        <CircleX className="h-4 w-4 text-red-500" />
      </button>
    </div>
  );
};

export default Footer;
