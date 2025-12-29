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
          transition-all duration-300
          rounded-2xl shadow-sm hover:shadow-md cursor-pointer
          w-full md:w-auto md:min-w-[200px] border
          ${
            isOpen || activeCount > 0
              ? 'bg-[#00B5CC]/5 border-[#00B5CC] text-[#00B5CC] ring-4 ring-[#00B5CC]/10'
              : 'bg-white border-gray-200 text-gray-600 hover:border-[#00B5CC]/50 hover:text-[#00B5CC]'
          }
        `}
      >
        <div className="absolute left-5 top-0 bottom-0 flex items-center">
          <ListFilter
            className={`h-5 w-5 transition-colors ${
              activeCount > 0 ? 'fill-[#00B5CC] text-[#00B5CC]' : 'text-gray-400'
            }`}
          />
        </div>

        <span className="font-bold text-sm tracking-widest uppercase pl-4">
          {activeCount > 0 ? `Filters (${activeCount})` : 'Filter'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-3 z-50 w-full md:w-96 bg-white border border-gray-100 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
          {/* Decorative Top Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#00B5CC] to-[#B8E986]" />

          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-lg font-black text-gray-900 tracking-tight">Refine Search</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-5">
              {Object.keys(filterOptions).map(key => (
                <div key={key} className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <div className="relative group">
                    <select
                      value={localFilters[key] || ''}
                      onChange={e => handleSelectChange(key, e.target.value)}
                      className="
                        w-full h-12 pl-4 pr-10
                        bg-gray-50 border border-gray-200 rounded-xl
                        text-sm font-bold text-gray-700 
                        appearance-none cursor-pointer transition-all
                        hover:bg-white hover:border-[#00B5CC]/50
                        focus:bg-white focus:ring-4 focus:ring-[#00B5CC]/10 focus:border-[#00B5CC]
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
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-[#00B5CC] transition-colors">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleReset}
                className="flex-1 py-3.5 text-gray-500 font-bold text-xs uppercase tracking-wide hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className="flex-[2] py-3.5 bg-[#00B5CC] hover:bg-[#0091A3] text-white rounded-xl font-black text-xs uppercase tracking-wide shadow-lg shadow-[#00B5CC]/20 transition-all active:scale-95 cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
