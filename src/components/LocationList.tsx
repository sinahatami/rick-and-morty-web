import { useState, useEffect, useCallback } from 'react';
import { Location } from '~/types/api';
import { useLocations } from '~/hooks/useLocations';
import { useUrlSync } from '~/hooks/useUrlSync';

import { ResourcePageLayout } from './shared/ResourcePageLayout';
import { FilterPanel } from './shared/FilterPanel';
import { SearchBar } from './shared/SearchBar';
import { ActiveFilterTags } from './shared/ActiveFilterTags';
import { LocationCard } from './LocationCard';
import { SimpleBanner } from './shared/SimpleBanner';
import banner from '../img/location-banner2.png';

// --- Types ---
interface FilterOptions {
  type: string[];
  dimension: string[];
  [key: string]: string[];
}

interface URLFilters {
  name?: string;
  type?: string;
  dimension?: string;
  [key: string]: string | undefined;
}

// --- Utilities ---
const extractFilterOptions = (locations: Location[]): FilterOptions => {
  const typeSet = new Set<string>();
  const dimensionSet = new Set<string>();

  locations.forEach(location => {
    if (location.type) typeSet.add(location.type);
    if (location.dimension) dimensionSet.add(location.dimension);
  });

  return {
    type: Array.from(typeSet).sort(),
    dimension: Array.from(dimensionSet).sort(),
  };
};

const getInitialFiltersFromUrl = (searchParams: URLSearchParams): URLFilters => {
  return {
    name: searchParams.get('name') || undefined,
    type: searchParams.get('type') || undefined,
    dimension: searchParams.get('dimension') || undefined,
  };
};

// --- Main Component ---
export function LocationList() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    type: [],
    dimension: [],
  });

  const { filters, setFilters, searchQuery, setSearchQuery, debouncedSearch } =
    useUrlSync(getInitialFiltersFromUrl);

  const { locations, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, totalCount } =
    useLocations({
      name: debouncedSearch || undefined,
      type: filters.type,
      dimension: filters.dimension,
    });

  const [initialOptions, setInitialOptions] = useState<FilterOptions | null>(null);

  const hasActiveFilters = Boolean(searchQuery.trim() || filters.type || filters.dimension);

  useEffect(() => {
    if (locations.length > 0) {
      const newOptions = extractFilterOptions(locations);
      if (!hasActiveFilters && !initialOptions) {
        setInitialOptions(newOptions);
      }
      setFilterOptions(newOptions);
    }
  }, [locations, hasActiveFilters, initialOptions]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setFilters({});
  }, [setSearchQuery, setFilters]);

  const displayOptions = hasActiveFilters && initialOptions ? initialOptions : filterOptions;

  return (
    <ResourcePageLayout
      items={locations}
      isLoading={isLoading}
      totalCount={totalCount}
      title="Multiverse Locations"
      headerExtra={<SimpleBanner src={banner} />}
      subtitle={
        <div className="flex items-center gap-2 text-gray-500 font-medium text-lg">
          <span>Cataloging</span>
          <span className="text-[#00B5CC] font-black text-2xl italic tracking-tighter decoration-[#B8E986]/50 underline underline-offset-4">
            {totalCount.toLocaleString()}
          </span>
          <span className="tracking-widest uppercase text-xs font-bold text-gray-400 pt-1">
            dimensional nodes
          </span>
        </div>
      }
      controls={
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full group">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search star systems, planets, or dimensions..."
            />
          </div>

          <div className="w-full md:w-auto">
            <FilterPanel
              filters={filters}
              filterOptions={displayOptions}
              onFilterChange={newFilters => setFilters(newFilters)}
            />
          </div>
        </div>
      }
      activeFilters={
        <ActiveFilterTags
          filters={filters}
          searchQuery={searchQuery}
          onRemove={key => {
            if (key === 'name') {
              setSearchQuery('');
            } else {
              setFilters(prev => ({ ...prev, [key]: undefined }));
            }
          }}
          onClearAll={handleClearFilters}
          onClearSearch={() => setSearchQuery('')}
        />
      }
      onClearFilters={handleClearFilters}
      onLoadMore={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      emptyTitle="Dimension Not Found"
      renderItem={location => <LocationCard key={location.id} location={location} />}
    />
  );
}
