import { useCallback } from 'react';

import { EpisodeCard } from './EpisodeCard';
import { SearchBar } from '../shared/SearchBar';
import { ActiveFilterTags } from '../shared/filter/ActiveFilterTags';
import { FilterPanel } from '../shared/filter/FilterPanel';
import { SimpleBanner } from '../shared/SimpleBanner';
import { PageSubtitle } from '../shared/page-item/PageSubtitle';
import { useUrlSync } from '~/hooks/useUrlSync';
import { useEpisodes } from '~/hooks/useEpisodes';
import { ResourcePageLayout } from '../shared/page-item/ResourcePageLayout';
import { createFilterParser } from '~/utils/url-helper';
import { Episode, EpisodeFilters, SEASON_OPTIONS, EPISODE_CODE_OPTIONS } from '~/types';

import banner from '~/public/images/episode-banner.png';

// --- Static Options ---
const STATIC_FILTER_OPTIONS = {
  season: [...SEASON_OPTIONS],
  episode: [...EPISODE_CODE_OPTIONS],
};

// --- Utilities ---
const getInitialFiltersFromUrl = createFilterParser<EpisodeFilters>({
  name: true,
  season: SEASON_OPTIONS,
  episode: EPISODE_CODE_OPTIONS,
});

// --- Main Component ---
export function EpisodeList() {
  const { filters, setFilters, searchQuery, setSearchQuery, debouncedSearch } =
    useUrlSync<EpisodeFilters>(getInitialFiltersFromUrl);

  const apiEpisodeFilter = `${filters.season || ''}${filters.episode || ''}`;

  const { episodes, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, totalCount } =
    useEpisodes({
      name: debouncedSearch || undefined,
      episode: apiEpisodeFilter || undefined,
    });

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setFilters({});
  }, [setSearchQuery, setFilters]);

  const hasActiveFilters = Boolean(searchQuery.trim() || filters.season || filters.episode);

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
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full group">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Name (e.g. Pilot) or Code (e.g. S01)..."
            />
          </div>

          <div className="w-full md:w-auto">
            <FilterPanel
              theme={PAGE_THEME}
              filters={filters}
              filterOptions={STATIC_FILTER_OPTIONS}
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
      renderItem={(episode: Episode) => <EpisodeCard key={episode.id} episode={episode} />}
    />
  );
}
