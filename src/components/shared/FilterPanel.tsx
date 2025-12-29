import { ChevronDown, X, ListFilter } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface FilterPanelProps {
  filters: Record<string, string | undefined>;
  filterOptions: Record<string, string[]>;
  onFilterChange: (filters: Record<string, string | undefined>) => void;
  onClose?: () => void;
}

export function FilterPanel({ filters, filterOptions, onFilterChange, onClose }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<Record<string, string>>({});
  const panelRef = useRef<HTMLDivElement>(null);

  // Initialize local filters when component mounts or filters change
  useEffect(() => {
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

    const cleanedFilters: Record<string, string | undefined> = {};
    Object.keys(filterOptions).forEach(key => {
      cleanedFilters[key] = undefined;
    });
    onFilterChange(cleanedFilters);
    setIsOpen(false);
    onClose?.();
  };

  const handleSelectChange = (key: string, value: string) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
        relative flex items-center justify-center px-6 h-14
        bg-sky-100 border transition-all duration-300
        rounded-2xl shadow-sm hover:shadow-md cursor-pointer
        w-full md:w-auto md:min-w-[240px]
        ${
          isOpen || activeCount > 0
            ? 'border-blue-600 text-blue-600 ring-4 ring-blue-50'
            : 'border-gray-200 text-gray-700 hover:border-gray-300'
        }
      `}
      >
        {/* THE ICON: Pinned to the far left edge */}
        <div className="absolute left-4 top-0 bottom-0 flex items-center">
          <ListFilter
            className={`h-5 w-5 ${activeCount > 0 ? 'fill-blue-600' : 'text-gray-400'}`}
          />
        </div>

        {/* THE TEXT: Stays in the mathematical center */}
        <span className="font-bold text-sm tracking-wide uppercase whitespace-nowrap text-sky-500">
          {activeCount > 0 ? `Filters (${activeCount})` : 'ADVANCED FILTERS'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-3 z-50 w-80 md:w-96 bg-white border border-gray-100 rounded-[2rem] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="p-7 space-y-7">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Filter Locations</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Selection Inputs - Dynamic */}
            <div className="space-y-6">
              {Object.keys(filterOptions).map(key => (
                <div key={key} className="space-y-2.5">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <div className="relative group">
                    <select
                      value={localFilters[key] || ''}
                      onChange={e => handleSelectChange(key, e.target.value)}
                      className="
                        w-full h-13 pl-5 pr-12 
                        bg-gray-50 border border-gray-100 rounded-2xl
                        text-sm font-bold text-gray-900 
                        appearance-none cursor-pointer transition-all
                        hover:bg-gray-100 hover:border-gray-200
                        focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-600
                        outline-none
                      "
                    >
                      <option value="">All {key}s</option>
                      {filterOptions[key].map(opt => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-gray-600 transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-2">
              <button
                onClick={handleReset}
                className="flex-1 py-4 text-gray-500 font-bold text-sm hover:text-red-500 transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className="flex-[2] py-4 bg-sky-50 hover:bg-sky-100 text-blue-500 rounded-2xl font-black text-sm shadow-xl shadow-blue-100 transition-all active:scale-95 cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
