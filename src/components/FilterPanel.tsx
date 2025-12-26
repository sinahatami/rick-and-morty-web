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
    const resetFilters = {
      status: '',
      species: '',
      gender: '',
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
    setIsOpen(false);
    onClose?.();
  };

  const handleSelectChange = (type: 'status' | 'species' | 'gender', value: string) => {
    const newFilters = { ...localFilters, [type]: value || '' };
    setLocalFilters(newFilters);
  };

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors group shadow-sm hover:shadow-md min-w-[200px]"
      >
        <Filter className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
        <span className="font-medium text-sm">ADVANCED FILTERS</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 ml-1 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-96 bg-white border border-gray-200 rounded-lg shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Species Filter - SELECT INPUT */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Species</label>
                <div className="relative">
                  <select
                    value={localFilters.species || ''}
                    onChange={e => handleSelectChange('species', e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                  >
                    <option value="">All Species</option>
                    {filterOptions.species.map(species => (
                      <option key={species} value={species}>
                        {species}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Gender Filter - SELECT INPUT */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Gender</label>
                <div className="relative">
                  <select
                    value={localFilters.gender || ''}
                    onChange={e => handleSelectChange('gender', e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                  >
                    <option value="">All Gender</option>
                    {filterOptions.gender.map(gender => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Status Filter - SELECT INPUT */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                <div className="relative">
                  <select
                    value={localFilters.status || ''}
                    onChange={e => handleSelectChange('status', e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                  >
                    <option value="">All Status</option>
                    {filterOptions.status.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-semibold transition-colors shadow-sm"
                >
                  Reset All
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors shadow-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
