import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Location } from '~/types/api';
import { LocationCard } from './LocationCard';
import { useLocations } from '~/hooks/useLocations';
import { useDebounce } from '~/hooks/useDebounce';
import { FilterPanel } from './FilterPanel';

import { LoadingSpinner } from './shared/LoadingSpinner';
import { PageHeader } from './shared/PageHeader';
import { LoadMoreButton } from './shared/LoadMoreButton';
import { SearchBar } from './shared/SearchBar';
import { ActiveFilterTags } from './shared/ActiveFilterTags';
import { SimpleBanner } from './shared/SimpleBanner';
import banner from '../img/location-banner2.png';
import { ScrollToTop } from './shared/ScrollToTop';
import { EmptyState } from './shared/EmptyState';

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<URLFilters>(() => getInitialFiltersFromUrl(searchParams));
  const [searchQuery, setSearchQuery] = useState(filters.name || '');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    type: [],
    dimension: [],
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { locations, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, totalCount } =
    useLocations({
      name: debouncedSearch || undefined,
      type: filters.type,
      dimension: filters.dimension,
    });

  // URL Synchronization
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('name', debouncedSearch);
    if (filters.type) params.set('type', filters.type);
    if (filters.dimension) params.set('dimension', filters.dimension);

    const query = params.toString();
    router.push(query ? `?${query}` : '', { scroll: false });
  }, [debouncedSearch, filters, router]);

  const [initialOptions, setInitialOptions] = useState<FilterOptions | null>(null);
  // Extract filters from dynamic data
  useEffect(() => {
    if (locations.length > 0) {
      const newOptions = extractFilterOptions(locations);

      // Store initial options when we have unfiltered data
      if (!hasActiveFilters && !initialOptions) {
        setInitialOptions(newOptions);
      }

      // Always update current options
      setFilterOptions(newOptions);
    }
  }, [locations]);

  // Scroll visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setFilters({});
  }, []);

  const hasActiveFilters = Boolean(searchQuery.trim() || filters.type || filters.dimension);

  const displayOptions = hasActiveFilters && initialOptions ? initialOptions : filterOptions;

  if (isLoading && locations.length === 0)
    return <LoadingSpinner message="Scanning the multiverse for locations..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SimpleBanner src={banner} />

      {/* Header & Search */}
      <section className="space-y-6">
        <PageHeader
          title="Locations"
          totalCount={totalCount}
          visibleCount={locations.length}
          subtitle={
            <p className="text-gray-400 font-medium text-lg">
              Exploring{' '}
              <span className="text-gray-900 font-black text-xl italic tracking-tighter decoration-primary/30 underline underline-offset-4">
                {totalCount.toLocaleString()}
              </span>
              <span className="ml-1 tracking-widest uppercase text-[13px] font-bold text-gray-400">
                souls across the cosmos
              </span>
            </p>
          }
        />

        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input Container */}
          <div className="relative flex-1 w-full group">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by location..."
            />
          </div>

          {/* Filter Button Wrapper */}
          <div className="w-full md:w-auto">
            <FilterPanel
              filters={filters}
              filterOptions={displayOptions}
              onFilterChange={newFilters => setFilters(newFilters)}
            />
          </div>
        </div>

        {/* Active Tags */}
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
      </section>

      {/* Grid Content */}
      <section>
        {locations.length === 0 && !isLoading ? (
          <EmptyState
            title="Location Not Found"
            description="No locations match those specific criteria in this timeline."
            onClearFilters={handleClearFilters}
          />
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {locations.map(location => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>

            {hasNextPage && (
              <LoadMoreButton
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            )}
          </div>
        )}
      </section>

      {/* Floaties */}
      {showScrollTop && <ScrollToTop />}
    </div>
  );
}
