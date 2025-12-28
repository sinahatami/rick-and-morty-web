import { X } from 'lucide-react';

interface ActiveFilterTagsProps {
  filters: Record<string, string | undefined>;
  onRemove: (key: string) => void;
  onClearAll: () => void;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export function ActiveFilterTags({
  filters,
  onRemove,
  onClearAll,
  searchQuery,
  onClearSearch,
}: ActiveFilterTagsProps) {
  // Combine filters with search query
  const allFilters = { ...filters };
  if (searchQuery) {
    allFilters.name = searchQuery;
  }

  const activeEntries = Object.entries(allFilters).filter(([, value]) => value);

  if (activeEntries.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
        Active Filters
      </span>
      {activeEntries.map(([key, value]) => (
        <div
          key={key}
          className="flex items-center gap-2 pl-3 pr-1.5 py-2 bg-primary/5 border border-primary/10 rounded-xl"
        >
          <span className="text-xs font-bold text-primary/60 uppercase">{key}:</span>
          <span className="text-sm font-black text-primary">{value}</span>
          <button
            onClick={() => {
              if (key === 'name' && onClearSearch) {
                onClearSearch();
              } else {
                onRemove(key);
              }
            }}
            className="p-1 hover:bg-primary/10 rounded-lg text-primary transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        onClick={onClearAll}
        className="text-sm font-bold text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors cursor-pointer"
      >
        Clear All
      </button>
    </div>
  );
}
