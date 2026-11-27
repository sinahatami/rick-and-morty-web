'use client';

import { ListFilter } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';

import { cn } from '~/lib/utils';

type Values = Record<string, string | undefined>;

interface FilterPanelProps {
  /** The filters that are currently applied. */
  filters: Values;
  /** The selectable values per filter, keyed by filter name. */
  filterOptions: Record<string, readonly string[]>;
  onFilterChange: (filters: Values) => void;
}

// The form (and Radix Popover, Dialog and Select behind it) is only downloaded once it is needed.
const loadContent = () => import('./FilterPanelContent');
const FilterPanelContent = dynamic(() => loadContent().then(module => module.FilterPanelContent), {
  ssr: false,
});

export function FilterPanel({ filters, filterOptions, onFilterChange }: FilterPanelProps) {
  const keys = Object.keys(filterOptions);
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  // The panel edits a copy, so nothing changes until "Apply" is pressed.
  const [draft, setDraft] = useState<Record<string, string>>({});
  const triggerRef = useRef<HTMLButtonElement>(null);

  const activeCount = keys.filter(key => filters[key]).length;
  const hasDraft = keys.some(key => draft[key]);

  const open = () => {
    setDraft(Object.fromEntries(keys.map(key => [key, filters[key] ?? ''])));
    setHasOpened(true);
    setIsOpen(true);
  };

  const apply = () => {
    onFilterChange(Object.fromEntries(keys.map(key => [key, draft[key] || undefined])));
    setIsOpen(false);
  };

  const reset = () => {
    setDraft(Object.fromEntries(keys.map(key => [key, ''])));
    onFilterChange(Object.fromEntries(keys.map(key => [key, undefined])));
  };

  const highlighted = isOpen || activeCount > 0;

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onPointerEnter={loadContent}
        onFocus={loadContent}
        className={cn(
          'relative flex h-14 w-full items-center justify-center rounded-2xl border px-6 shadow-sm transition-all duration-300 hover:shadow-md md:w-auto md:min-w-[200px]',
          highlighted
            ? 'border-theme bg-theme/10 text-theme-ink ring-4 ring-theme/20'
            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300',
        )}
      >
        <span className="absolute top-0 bottom-0 left-5 flex items-center">
          <ListFilter
            className={cn(
              'h-5 w-5 transition-colors',
              activeCount > 0 ? 'text-theme-ink' : 'text-gray-600',
            )}
            aria-hidden="true"
          />
        </span>
        <span className="pl-4 text-sm font-bold tracking-widest uppercase">
          {activeCount > 0 ? `Filters (${activeCount})` : 'Filter'}
        </span>
      </button>

      {hasOpened && (
        <FilterPanelContent
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          filterOptions={filterOptions}
          draft={draft}
          onDraftChange={(key, value) => setDraft(current => ({ ...current, [key]: value }))}
          canReset={hasDraft || activeCount > 0}
          onApply={apply}
          onReset={reset}
          returnFocusTo={triggerRef}
        />
      )}
    </div>
  );
}
