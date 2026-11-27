'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import banner from '~/assets/images/location-banner.webp';
import { FilterPanel } from '~/components/controls/FilterPanel';
import { SearchBar } from '~/components/controls/SearchBar';
import { PageSubtitle } from '~/components/layout/PageSubtitle';
import { ResourcePageLayout } from '~/components/layout/ResourcePageLayout';
import { useUrlFilters } from '~/hooks/useUrlFilters';
import { type Location, type Paginated } from '~/lib/api/types';

import { LOCATION_FILTER_OPTIONS, parseLocationFilters } from '../filters';
import { locationListQuery } from '../queries';
import { LocationCard } from './LocationCard';

const ActiveFilterTags = dynamic(
  () => import('~/components/controls/ActiveFilterTags').then(module => module.ActiveFilterTags),
  { ssr: false },
);

export function LocationList({ initialPage }: { initialPage: Paginated<Location> }) {
  const { filters, setFilters, searchQuery, setSearchQuery, reset } =
    useUrlFilters(parseLocationFilters);
  const query = useInfiniteQuery(locationListQuery(filters, initialPage));

  const locations = useMemo(
    () => query.data?.pages.flatMap(page => page.results) ?? [],
    [query.data],
  );
  const totalCount = query.data?.pages[0]?.info.count ?? 0;
  const hasActiveFilters = Boolean(searchQuery.trim() || filters.type || filters.dimension);

  return (
    <ResourcePageLayout
      title="Multiverse Locations"
      banner={banner}
      subtitle={
        <PageSubtitle
          prefix="Cataloging"
          highlight={totalCount.toLocaleString()}
          suffix="dimensional nodes"
        />
      }
      controls={
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search star systems, planets, or dimensions..."
            className="w-full flex-1"
          />
          <div className="w-full md:w-auto">
            <FilterPanel
              filters={filters}
              filterOptions={LOCATION_FILTER_OPTIONS}
              onFilterChange={next => setFilters(current => ({ ...current, ...next }))}
            />
          </div>
        </div>
      }
      activeFilters={
        hasActiveFilters && (
          <ActiveFilterTags
            filters={filters}
            searchQuery={searchQuery}
            onRemove={key =>
              key === 'name'
                ? setSearchQuery('')
                : setFilters(current => ({ ...current, [key]: undefined }))
            }
            onClearAll={reset}
          />
        )
      }
      items={locations}
      getKey={location => location.id}
      renderItem={location => <LocationCard location={location} />}
      isLoading={query.isLoading}
      isRefetching={query.isFetching && !query.isLoading && !query.isFetchingNextPage}
      error={query.error}
      onRetry={() => void query.refetch()}
      onClearFilters={reset}
      hasNextPage={query.hasNextPage}
      isFetchingNextPage={query.isFetchingNextPage}
      onLoadMore={() => void query.fetchNextPage()}
      emptyTitle="Dimension Not Found"
    />
  );
}
