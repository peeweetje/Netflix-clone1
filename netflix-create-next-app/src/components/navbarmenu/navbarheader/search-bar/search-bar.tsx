import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const SearchBar = ({ onChange, value }: SearchBarProps) => {
  return (
    <div className="relative w-64">
      <Search className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" />
      <Input
        id="search"
        type="search"
        placeholder="Search for movies, shows..."
        value={value}
        onChange={onChange}
        className="h-10 w-full pl-10 pr-2 bg-black/50 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-white text-base"
      />
    </div>
  );
};
