import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface FilterPanelProps {
  filters: {
    status?: string;
    species?: string;
    gender?: string;
  };
  filterOptions: {
    species: string[];
    gender: string[];
    status: string[];
  };
  onFilterChange: (filters: { status?: string; species?: string; gender?: string }) => void;
  onClose?: () => void;
}

export function FilterPanel({ filters, filterOptions, onFilterChange, onClose }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleApply = () => {
    onFilterChange(localFilters);
    setIsOpen(false);
    onClose?.();
  };

  const handleReset = () => {
    const resetFilters = { status: '', species: '', gender: '' };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
    setIsOpen(false);
    onClose?.();
  };

  const handleSelectChange = (type: 'status' | 'species' | 'gender', value: string) => {
    setLocalFilters(prev => ({ ...prev, [type]: value || '' }));
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

  const activeCount = [filters.status, filters.species, filters.gender].filter(Boolean).length;

  return (
    <div className="relative" ref={panelRef}>
      {/* Main Toggle Button - h-14 for search bar alignment */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center gap-2 px-6 h-14
          bg-white border transition-all duration-300
          rounded-2xl shadow-sm hover:shadow-md cursor-pointer
          w-full md:w-auto md:min-w-[180px]
          ${
            isOpen || activeCount > 0
              ? 'border-blue-600 text-blue-600 ring-4 ring-blue-50'
              : 'border-gray-200 text-gray-700 hover:border-gray-300'
          }
        `}
      >
        <Filter className={`h-5 w-5 ${activeCount > 0 ? 'fill-blue-600' : 'text-gray-400'}`} />
        <span className="font-bold text-sm tracking-wide uppercase">
          {activeCount > 0 ? `Filters (${activeCount})` : 'Filters'}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-3 z-50 w-80 md:w-96 bg-white border border-gray-100 rounded-[2rem] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="p-7 space-y-7">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Filter Characters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Selection Inputs */}
            <div className="space-y-6">
              {[
                { id: 'species', label: 'Species', options: filterOptions.species },
                { id: 'gender', label: 'Gender', options: filterOptions.gender },
                { id: 'status', label: 'Status', options: filterOptions.status },
              ].map(group => (
                <div key={group.id} className="space-y-2.5">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                    {group.label}
                  </label>
                  <div className="relative group">
                    <select
                      value={(localFilters as any)[group.id] || ''}
                      onChange={e => handleSelectChange(group.id as any, e.target.value)}
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
                      <option value="">All {group.label}s</option>
                      {group.options.map(opt => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {/* Visual Chevron replacement for native appearance */}
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
                className="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 transition-all active:scale-95 cursor-pointer"
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
