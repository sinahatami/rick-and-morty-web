'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import banner from '~/assets/images/episode-banner.webp';
import { FilterPanel } from '~/components/controls/FilterPanel';
import { SearchBar } from '~/components/controls/SearchBar';
import { PageSubtitle } from '~/components/layout/PageSubtitle';
import { ResourcePageLayout } from '~/components/layout/ResourcePageLayout';
import { useUrlFilters } from '~/hooks/useUrlFilters';
import { type Episode, type Paginated } from '~/lib/api/types';

import { EPISODE_FILTER_OPTIONS, parseEpisodeFilters } from '../filters';
import { episodeListQuery } from '../queries';
import { EpisodeCard } from './EpisodeCard';

const ActiveFilterTags = dynamic(
  () => import('~/components/controls/ActiveFilterTags').then(module => module.ActiveFilterTags),
  { ssr: false },
);

export function EpisodeList({ initialPage }: { initialPage: Paginated<Episode> }) {
  const { filters, setFilters, searchQuery, setSearchQuery, reset } =
    useUrlFilters(parseEpisodeFilters);
  const query = useInfiniteQuery(episodeListQuery(filters, initialPage));

  const episodes = useMemo(
    () => query.data?.pages.flatMap(page => page.results) ?? [],
    [query.data],
  );
  const totalCount = query.data?.pages[0]?.info.count ?? 0;
  const hasActiveFilters = Boolean(searchQuery.trim() || filters.season || filters.episode);

  return (
    <ResourcePageLayout
      title="Episodes"
      banner={banner}
      subtitle={
        <PageSubtitle
          prefix="Archived"
          highlight={totalCount.toLocaleString()}
          suffix="adventures in the database"
        />
      }
      controls={
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Name (e.g. Pilot) or Code (e.g. S01)..."
            className="w-full flex-1"
          />
          <div className="w-full md:w-auto">
            <FilterPanel
              filters={filters}
              filterOptions={EPISODE_FILTER_OPTIONS}
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
      items={episodes}
      getKey={episode => episode.id}
      renderItem={episode => <EpisodeCard episode={episode} />}
      isLoading={query.isLoading}
      isRefetching={query.isFetching && !query.isLoading && !query.isFetchingNextPage}
      error={query.error}
      onRetry={() => void query.refetch()}
      onClearFilters={reset}
      hasNextPage={query.hasNextPage}
      isFetchingNextPage={query.isFetchingNextPage}
      onLoadMore={() => void query.fetchNextPage()}
      emptyTitle="Episode Not Found"
    />
  );
}
