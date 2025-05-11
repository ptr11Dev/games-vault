import { Search } from 'lucide-react';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="relative w-48">
      <Search className="pointer-events-none absolute top-2 left-2 h-5 w-5 text-blue-600" />
      <input
        type="text"
        placeholder="Search..."
        className="border-border/40 bg-primary h-9 w-full rounded border pr-2 pl-9 text-sm text-white placeholder:text-gray-500 focus:ring-1 focus:ring-blue-600 focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
