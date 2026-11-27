import { X } from 'lucide-react';

type Values = Record<string, string | undefined>;

interface ActiveFilterTagsProps {
  filters: Values;
  /** The text in the search box (it may not be applied to the URL yet). */
  searchQuery: string;
  onRemove: (key: string) => void;
  onClearAll: () => void;
}

export function ActiveFilterTags({
  filters,
  searchQuery,
  onRemove,
  onClearAll,
}: ActiveFilterTagsProps) {
  const entries = Object.entries({ ...filters, name: searchQuery || undefined }).filter(
    ([, value]) => value,
  );

  if (entries.length === 0) return null;

  return (
    <div className="flex animate-in flex-wrap items-center gap-3 pt-2 duration-300 slide-in-from-top-2">
      <span className="py-1 text-[10px] font-black tracking-widest text-gray-600 uppercase">
        Active Filters
      </span>

      {entries.map(([key, value]) => (
        <div
          key={key}
          className="flex items-center gap-2 rounded-lg border border-theme/25 bg-theme/10 py-1.5 pr-1.5 pl-3 transition-colors"
        >
          <span className="text-[10px] font-bold text-theme-ink uppercase opacity-80">{key}:</span>
          <span className="text-sm font-black text-theme-ink">{value}</span>
          <button
            type="button"
            onClick={() => onRemove(key)}
            className="rounded-md p-1 text-theme-ink transition-colors hover:bg-theme/30"
            aria-label={`Remove filter ${key}`}
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="ml-auto rounded-lg px-3 py-2 text-[10px] font-bold tracking-wider text-red-700 uppercase transition-colors hover:bg-red-50 sm:ml-0"
      >
        Clear All
      </button>
    </div>
  );
}
