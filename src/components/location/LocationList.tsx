import { useCallback } from 'react';

import { FilterPanel } from '../shared/filter/FilterPanel';
import { SearchBar } from '../shared/SearchBar';
import { ActiveFilterTags } from '../shared/filter/ActiveFilterTags';
import { SimpleBanner } from '../shared/SimpleBanner';
import { LocationCard } from './LocationCard';
import { PageSubtitle } from '../shared/page-item/PageSubtitle';
import { useLocations } from '~/hooks/useLocations';
import { useUrlSync } from '~/hooks/useUrlSync';
import { LocationFilters, TYPE_OPTIONS, DIMENSION_OPTIONS } from '~/types';
import { ResourcePageLayout } from '../shared/page-item/ResourcePageLayout';
import { createFilterParser } from '~/utils/url-helper';

import banner from '~/public/images/location-banner.png';

// --- Utilities ---

const STATIC_FILTER_OPTIONS = {
  type: [...TYPE_OPTIONS],
  dimension: [...DIMENSION_OPTIONS],
};

const getInitialFiltersFromUrl = createFilterParser<LocationFilters>({
  name: true,
  type: TYPE_OPTIONS,
  dimension: DIMENSION_OPTIONS,
});

// --- Main Component ---
export function LocationList() {
  const { filters, setFilters, searchQuery, setSearchQuery, debouncedSearch } =
    useUrlSync(getInitialFiltersFromUrl);

  const { locations, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, totalCount } =
    useLocations({
      name: debouncedSearch || undefined,
      type: filters.type,
      dimension: filters.dimension,
    });

  const hasActiveFilters = Boolean(searchQuery.trim() || filters.type || filters.dimension);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setFilters({});
  }, [setSearchQuery, setFilters]);

  const PAGE_THEME = 'rick';

  return (
    <ResourcePageLayout
      items={locations}
      isLoading={isLoading}
      totalCount={totalCount}
      title="Multiverse Locations"
      headerExtra={<SimpleBanner src={banner} />}
      subtitle={
        <PageSubtitle
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
              theme={PAGE_THEME}
              filters={filters}
              // 2. Use the static constant
              filterOptions={STATIC_FILTER_OPTIONS}
              // 3. Use the same consistent state update pattern
              onFilterChange={newFilters => setFilters(prev => ({ ...prev, ...newFilters }))}
            />
          </div>
        </div>
      }
      activeFilters={
        hasActiveFilters ? (
          <ActiveFilterTags
            theme={PAGE_THEME}
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
        ) : null
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
