import { useState, useEffect, useCallback } from 'react';

import { ResourcePageLayout } from '../shared/ResourcePageLayout';
import { FilterPanel } from '../shared/filter/FilterPanel';
import { SearchBar } from '../shared/SearchBar';
import { ActiveFilterTags } from '../shared/filter/ActiveFilterTags';
import { SimpleBanner } from '../shared/SimpleBanner';
import { LocationCard } from './LocationCard';
import { PageSubtitle } from '../shared/PageSubtitle';
import { useLocations } from '~/hooks/useLocations';
import { useUrlSync } from '~/hooks/useUrlSync';
import { LocationFilterOptions, LocationFilters } from '~/types';
import { extractLocationOptions } from '../../utils/location-utils';

import banner from '~/public/images/location-banner.jpg';

// --- Utilities ---
const getInitialFiltersFromUrl = (searchParams: URLSearchParams): LocationFilters => {
  return {
    name: searchParams.get('name') || undefined,
    type: searchParams.get('type') || undefined,
    dimension: searchParams.get('dimension') || undefined,
  };
};

// --- Main Component ---
export function LocationList() {
  const [filterOptions, setFilterOptions] = useState<LocationFilterOptions>({
    type: [],
    dimension: [],
  });

  const { filters, setFilters, searchQuery, setSearchQuery, debouncedSearch } =
    useUrlSync<LocationFilters>(getInitialFiltersFromUrl);

  const { locations, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, totalCount } =
    useLocations({
      name: debouncedSearch || undefined,
      type: filters.type,
      dimension: filters.dimension,
    });

  const [initialOptions, setInitialOptions] = useState<LocationFilterOptions | null>(null);

  const hasActiveFilters = Boolean(searchQuery.trim() || filters.type || filters.dimension);

  useEffect(() => {
    if (locations.length > 0) {
      const newOptions = extractLocationOptions(locations);

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

  // DEFINE THEME ONCE
  const PAGE_THEME = 'location';

  return (
    <ResourcePageLayout
      items={locations}
      isLoading={isLoading}
      totalCount={totalCount}
      title="Multiverse Locations"
      theme={PAGE_THEME}
      headerExtra={<SimpleBanner src={banner} />}
      subtitle={
        <PageSubtitle
          theme={PAGE_THEME}
          prefix="Cataloging"
          highlight={totalCount.toLocaleString()}
          suffix="dimensional nodes"
        />
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
              theme="location"
              filters={filters as Record<string, string | undefined>}
              filterOptions={displayOptions as unknown as Record<string, string[]>}
              onFilterChange={newFilters => setFilters(newFilters as LocationFilters)}
            />
          </div>
        </div>
      }
      activeFilters={
        <ActiveFilterTags
          theme={PAGE_THEME}
          filters={filters as Record<string, string | undefined>}
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
