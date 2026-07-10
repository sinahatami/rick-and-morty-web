import { X, ListFilter } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { FilterPanelProps } from '~/types';
import { FilterSelect } from './FilterSelect';
import { getThemeStyles } from '~/lib/theme';
import { Button } from '../Button';

export function FilterPanel({
  filters,
  filterOptions,
  onFilterChange,
  onClose,
  theme,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<Record<string, string>>({});

  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const styles = getThemeStyles(theme);

  useEffect(() => {
    if (!isOpen) return;
    const initialFilters: Record<string, string> = {};
    Object.keys(filterOptions).forEach(key => {
      initialFilters[key] = filters[key] || '';
    });
    setLocalFilters(initialFilters);
  }, [filters, filterOptions, isOpen]);

  const handleApply = () => {
    const cleanedFilters: Record<string, string | undefined> = {};
    Object.entries(localFilters).forEach(([key, value]) => {
      cleanedFilters[key] = value || undefined;
    });
    onFilterChange(cleanedFilters);
    setIsOpen(false);
    onClose?.();
  };

  const handleReset = () => {
    const resetFilters: Record<string, string> = {};
    Object.keys(filterOptions).forEach(key => {
      resetFilters[key] = '';
    });
    setLocalFilters(resetFilters);
    onFilterChange(
      Object.keys(filterOptions).reduce((acc, key) => ({ ...acc, [key]: undefined }), {})
    );
    onClose?.();
  };

  const handleSelectChange = (key: string, value: string) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Check if click is inside the main button OR the portal content
      const clickedInsideTrigger = panelRef.current?.contains(target);
      const clickedInsideContent = contentRef.current?.contains(target);

      if (!clickedInsideTrigger && !clickedInsideContent) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const activeCount = Object.values(filters).filter(Boolean).length;
  const hasActiveFilters = Object.values(localFilters).some(val => val !== '');

  const FilterContent = (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h2 className="text-lg font-black text-gray-900 tracking-tight">Refine Search</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close filters"
        >
          <X className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      <div className="space-y-5">
        {Object.keys(filterOptions).map(key => (
          <FilterSelect
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={localFilters[key] || ''}
            options={filterOptions[key]}
            onChange={val => handleSelectChange(key, val)}
            theme={theme}
          />
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          onClick={handleReset}
          theme={theme}
          disabled={!hasActiveFilters}
          className="flex-1 py-3 text-xs tracking-widest uppercase bg-transparent border-none text-gray-400 hover:bg-red-50 hover:text-red-500 shadow-none"
          style={{ backgroundColor: 'transparent', color: undefined }}
        >
          Reset
        </Button>

        <Button
          onClick={handleApply}
          theme={theme}
          className="flex-[2] py-3 text-xs tracking-widest uppercase shadow-md"
        >
          Apply
        </Button>
      </div>
    </div>
  );

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative flex items-center justify-center px-6 h-14
          transition-all duration-300
          rounded-2xl shadow-sm hover:shadow-md cursor-pointer
          w-full md:w-auto md:min-w-[200px] border
          ${
            isOpen || activeCount > 0
              ? `${styles.lightBg} ${styles.lightBorder} ring-4`
              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
          }
        `}
        style={{
          color: isOpen || activeCount > 0 ? styles.primary : undefined,
          boxShadow: isOpen || activeCount > 0 ? `0 0 0 4px ${styles.primary}20` : undefined,
          borderColor: isOpen || activeCount > 0 ? styles.primary : undefined,
        }}
      >
        <div className="absolute left-5 top-0 bottom-0 flex items-center">
          <ListFilter
            className="h-5 w-5 transition-colors"
            style={{
              color: activeCount > 0 ? styles.primary : '#9CA3AF',
              fill: activeCount > 0 ? `${styles.primary}40` : 'none',
            }}
          />
        </div>
        <span className="font-bold text-sm tracking-widest uppercase pl-4">
          {activeCount > 0 ? `Filters (${activeCount})` : 'Filter'}
        </span>
      </button>

      {/* DESKTOP DROPDOWN */}
      {isOpen && (
        <div
          ref={contentRef}
          className="hidden md:block absolute top-full right-0 mt-3 z-50 w-full md:w-96 bg-white border border-gray-100 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
        >
          <div className={`h-1.5 w-full bg-gradient-to-r ${styles.gradient}`} />
          {FilterContent}
        </div>
      )}

      {/* MOBILE MODAL */}
      {typeof document !== 'undefined' &&
        isOpen &&
        createPortal(
          <div className="md:hidden fixed inset-0 z-[100] flex items-end justify-center">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
              onClick={() => setIsOpen(false)}
            />
            <div
              ref={contentRef}
              className="relative w-full bg-white rounded-t-[2.5rem] shadow-2xl animate-in slide-in-from-bottom duration-300 overflow-hidden"
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${styles.gradient}`} />
              {FilterContent}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
