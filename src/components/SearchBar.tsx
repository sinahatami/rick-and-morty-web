import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export function SearchBar({
  onSearch,
  placeholder = 'Search characters by name...',
  initialValue = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="block w-full pl-10 pr-10 py-3 bg-surface border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base"
          placeholder={placeholder}
          style={{
            color: '#ffffff',
            backgroundColor: '#2D2D2D',
            borderColor: '#404040',
          }}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-white" />
          </button>
        )}
      </div>
      <div className="mt-2 text-sm text-gray-500">
        <p>
          Try searching for: <span className="text-gray-400">Rick, Morty, Summer, Beth</span>
        </p>
      </div>
    </form>
  );
}
