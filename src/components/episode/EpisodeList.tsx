import { useCallback } from 'react';

import { EpisodeCard } from './EpisodeCard';
import { ResourcePageLayout } from '../shared/ResourcePageLayout';
import { SearchBar } from '../shared/SearchBar';
import { ActiveFilterTags } from '../shared/filter/ActiveFilterTags';
import { SimpleBanner } from '../shared/SimpleBanner';
import banner from '~/public/images/episode-banner.jpg';
import { PageSubtitle } from '../shared/PageSubtitle';
import { useUrlSync } from '~/hooks/useUrlSync';
import { useEpisodes } from '~/hooks/useEpisodes';

// --- Utilities ---
const getInitialFilters = (params: URLSearchParams) => ({
  name: params.get('name') || undefined,
});

// --- Main Component ---
export function EpisodeList() {
  const { searchQuery, setSearchQuery, debouncedSearch } = useUrlSync(getInitialFilters);

  const { episodes, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, totalCount } =
    useEpisodes({
      name: debouncedSearch,
    });

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  return (
    <ResourcePageLayout
      items={episodes}
      isLoading={isLoading}
      totalCount={totalCount}
      title="Episodes"
      headerExtra={<SimpleBanner src={banner} />}
      subtitle={
        <PageSubtitle
          prefix="Archived"
          highlight={totalCount.toLocaleString()}
          suffix="adventures in the database"
          colorClass="text-[#FF9800]"
          decorationClass="decoration-[#FF9800]/30"
        />
      }
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
