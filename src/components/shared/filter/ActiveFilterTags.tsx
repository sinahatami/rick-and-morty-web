import { X } from 'lucide-react';
import { ActiveFilterTagsProps } from '~/types';
import { getThemeStyles } from '~/lib/theme';

export function ActiveFilterTags({
  filters,
  onRemove,
  onClearAll,
  searchQuery,
  onClearSearch,
  theme,
}: ActiveFilterTagsProps) {
  const styles = getThemeStyles(theme);

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
          className={`
            group flex items-center gap-2 pl-3 pr-1.5 py-1.5 
            border rounded-lg transition-colors
            ${styles.lightBg} 
            ${styles.lightBorder}
            hover:border-opacity-100
          `}
        >
          <span
            className="text-[10px] font-bold uppercase opacity-70"
            style={{ color: styles.primary }}
          >
            {key}:
          </span>
          <span
            className="text-sm font-black"
            style={{ color: styles.secondary || styles.primary }}
          >
            {value}
          </span>

          <button
            onClick={() => {
              if (key === 'name' && onClearSearch) {
                onClearSearch();
              } else {
                onRemove(key);
              }
            }}
            className="p-1 rounded-md transition-colors cursor-pointer"
            style={{ color: styles.primary }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = styles.primary;
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = styles.primary;
            }}
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
