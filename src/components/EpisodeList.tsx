import { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EpisodeCard } from './EpisodeCard';
import { useDebounce } from '~/hooks/useDebounce';
import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '~/lib/api-client';

import { LoadingSpinner } from './shared/LoadingSpinner';
import { PageHeader } from './shared/PageHeader';
import { LoadMoreButton } from './shared/LoadMoreButton';
import { SearchBar } from './shared/SearchBar';
import { ScrollToTop } from './shared/ScrollToTop';
import { EmptyState } from './shared/EmptyState';

// --- Main Component ---
export function EpisodeList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('name') || '');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 500);

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

  // URL Synchronization
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('name', debouncedSearch);
    const query = params.toString();
    router.push(query ? `?${query}` : '', { scroll: false });
  }, [debouncedSearch, router]);

  // Scroll visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  if (isLoading && episodes.length === 0)
    return <LoadingSpinner message="Scanning the multiverse for episodes..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header & Search */}
      <section className="space-y-6">
        <PageHeader
          title="Episodes"
          totalCount={totalCount}
          visibleCount={episodes.length}
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

        <div className="relative">
          <div className="relative flex-1 w-full group">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by location..."
            />
          </div>
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
      </section>

      {/* Grid Content */}
      <section>
        {episodes.length === 0 && !isLoading ? (
          <EmptyState
            title="Episode Not Found"
            description="No episodes match those specific criteria in this timeline."
            onClearFilters={handleClearSearch}
          />
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {episodes.map(episode => (
                <EpisodeCard key={episode.id} episode={episode} />
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
