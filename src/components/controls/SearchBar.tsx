import { Search, X } from 'lucide-react';

import { cn } from '~/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  className,
}: SearchBarProps) {
  return (
    <div className={cn('group relative', className)}>
      <Search
        className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors duration-300 group-focus-within:text-theme-ink"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-14 w-full rounded-2xl border border-gray-200 bg-white pr-12 pl-14 font-bold text-gray-900 shadow-sm transition-all duration-300 ease-out placeholder:font-medium placeholder:text-gray-500 focus:border-theme-ink focus:ring-4 focus:ring-theme/20 focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="group/clear absolute top-1/2 right-4 -translate-y-1/2 rounded-xl p-1.5 transition-colors hover:bg-red-50"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-gray-500 transition-colors group-hover/clear:text-red-600" />
        </button>
      )}
    </div>
  );
}
