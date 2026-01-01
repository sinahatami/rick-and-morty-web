import { useCallback } from 'react';

import { EpisodeCard } from './EpisodeCard';
import { SearchBar } from '../shared/SearchBar';
import { ActiveFilterTags } from '../shared/filter/ActiveFilterTags';
import { SimpleBanner } from '../shared/SimpleBanner';
import { PageSubtitle } from '../shared/page-item/PageSubtitle';
import { useUrlSync } from '~/hooks/useUrlSync';
import { useEpisodes } from '~/hooks/useEpisodes';
import { Episode } from '~/types';
import { ResourcePageLayout } from '../shared/page-item/ResourcePageLayout';

import banner from '~/public/images/episode-banner.png';

// --- Utilities ---
const getInitialFilters = (params: URLSearchParams) => ({
  name: params.get('name') || undefined,
});

export function EpisodeList() {
  const { searchQuery, setSearchQuery, debouncedSearch } = useUrlSync(getInitialFilters);

  const { episodes, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, totalCount } =
    useEpisodes({
      name: debouncedSearch,
    });

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  const PAGE_THEME = 'morty';

  return (
    <ResourcePageLayout
      title="Episodes"
      theme={PAGE_THEME}
      items={episodes}
      isLoading={isLoading}
      totalCount={totalCount ?? 0}
      headerExtra={<SimpleBanner src={banner} />}
      subtitle={
        <PageSubtitle
          theme={PAGE_THEME}
          prefix="Archived"
          highlight={totalCount?.toLocaleString() || '0'}
          suffix="adventures in the database"
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
          theme={PAGE_THEME}
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
      renderItem={(episode: Episode) => <EpisodeCard key={episode.id} episode={episode} />}
    />
  );
}
