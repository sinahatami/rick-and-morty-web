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
    <div className="flex flex-wrap items-center gap-3 pt-2 animate-in slide-in-from-top-2 duration-300">
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest py-1">
        Active Filters
      </span>
      {activeEntries.map(([key, value]) => (
        <div
          key={key}
          className="group flex items-center gap-2 pl-3 pr-1.5 py-1.5 bg-[#00B5CC]/10 border border-[#00B5CC]/20 rounded-lg hover:border-[#00B5CC]/40 transition-colors"
        >
          <span className="text-[10px] font-bold text-[#00B5CC] uppercase opacity-70">{key}:</span>
          <span className="text-sm font-black text-[#0091A3]">{value}</span>
          <button
            onClick={() => {
              if (key === 'name' && onClearSearch) {
                onClearSearch();
              } else {
                onRemove(key);
              }
            }}
            className="p-1 hover:bg-[#00B5CC] hover:text-white rounded-md text-[#00B5CC] transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        onClick={onClearAll}
        className="text-[10px] font-bold text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg uppercase tracking-wider transition-colors cursor-pointer ml-auto sm:ml-0"
      >
        Clear All
      </button>
    </div>
  );
}
