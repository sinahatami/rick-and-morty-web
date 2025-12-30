import { useCallback } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '~/lib/api-client';
import { useUrlSync } from '~/hooks/useUrlSync';

import { EpisodeCard } from './EpisodeCard';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ResourcePageLayout } from '../shared/ResourcePageLayout';
import { SearchBar } from '../shared/SearchBar';
import { ActiveFilterTags } from '../shared/ActiveFilterTags';
import { SimpleBanner } from '../shared/SimpleBanner';

import banner from '~/public/images/episode-banner.jpg';

// --- Utilities ---

const getInitialFilters = (params: URLSearchParams) => ({
  name: params.get('name') || undefined,
});

// --- Main Component ---
export function EpisodeList() {
  const { searchQuery, setSearchQuery, debouncedSearch } = useUrlSync(getInitialFilters);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['episodes', { name: debouncedSearch }],
    queryFn: ({ pageParam = 1 }) => {
      const params: Record<string, string> = {
        page: pageParam.toString(),
      };

      if (debouncedSearch) {
        params.name = debouncedSearch;
      }

      return apiClient.episodes.getAll(params);
    },
    getNextPageParam: lastPage => {
      if (!lastPage.info.next) return undefined;
      try {
        const url = new URL(lastPage.info.next);
        const pageParam = url.searchParams.get('page');
        return pageParam ? Number(pageParam) : undefined;
      } catch (error) {
        console.error('[EpisodeList] Error parsing next page URL:', error);
        return undefined;
      }
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });

  const episodes = data?.pages.flatMap(page => page.results) || [];
  const totalCount = data?.pages?.[0]?.info?.count || 0;

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  if (isLoading && episodes.length === 0)
    return <LoadingSpinner message="Scanning the multiverse for episodes..." />;

  return (
    <ResourcePageLayout
      items={episodes}
      isLoading={isLoading}
      totalCount={totalCount}
      title="Episodes"
      headerExtra={<SimpleBanner src={banner} />}
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
      // The Search Bar
      controls={
        <div className="relative">
          <div className="relative flex-1 w-full group">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Name or episode (ex.S01E01)..."
            />
          </div>
        </div>
      }
      activeFilters={
        <ActiveFilterTags
          filters={{}}
          searchQuery={searchQuery}
          onRemove={() => {}}
          onClearAll={handleClearSearch}
          onClearSearch={handleClearSearch}
        />
      }
      onClearFilters={handleClearSearch}
      onLoadMore={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      renderItem={episode => <EpisodeCard key={episode.id} episode={episode} />}
    />
  );
}
