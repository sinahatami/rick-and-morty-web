import { useCallback } from 'react';

import { FilterPanel } from '../shared/filter/FilterPanel';
import { SearchBar } from '../shared/SearchBar';
import dynamic from 'next/dynamic';

const ActiveFilterTags = dynamic(
  () => import('../shared/filter/ActiveFilterTags').then(mod => mod.ActiveFilterTags),
  { ssr: false }
);
import { CharacterCard } from './CharacterCard';
import { SimpleBanner } from '../shared/SimpleBanner';
import { PageSubtitle } from '../shared/page-item/PageSubtitle';
import { useUrlSync } from '~/hooks/useUrlSync';
import { useCharacters } from '~/hooks/useCharacters';
import { SPECIES_OPTIONS, GENDER_OPTIONS, STATUS_OPTIONS, CharacterFilters } from '~/types';
import { ResourcePageLayout } from '../shared/page-item/ResourcePageLayout';
import { createFilterParser } from '~/utils/url-helper';

import banner from '~/public/images/character-banner.png';

// --- Utilities ---

const STATIC_FILTER_OPTIONS = {
  species: [...SPECIES_OPTIONS],
  gender: [...GENDER_OPTIONS],
  status: [...STATUS_OPTIONS],
};

const getInitialFiltersFromUrl = createFilterParser<CharacterFilters>({
  name: true,
  status: STATUS_OPTIONS,
  species: SPECIES_OPTIONS,
  gender: GENDER_OPTIONS,
});

// --- Main Component ---
export function CharacterList() {
  const { filters, setFilters, searchQuery, setSearchQuery, debouncedSearch } =
    useUrlSync(getInitialFiltersFromUrl);

  const {
    characters,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalCount,
    error,
    isFetching,
  } = useCharacters({
    name: debouncedSearch || undefined,
    status: filters.status,
    species: filters.species,
    gender: filters.gender,
  });

  const hasActiveFilters = Boolean(
    searchQuery.trim() || filters.status || filters.species || filters.gender
  );

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setFilters({});
  }, [setSearchQuery, setFilters]);

  const isRefetching = isFetching && !isLoading && !isFetchingNextPage;

  return (
    <ResourcePageLayout
      items={characters}
      isLoading={isLoading}
      error={error}
      isRefetching={isRefetching}
      totalCount={totalCount}
      title="Characters"
      headerExtra={<SimpleBanner src={banner} />}
      subtitle={
        <PageSubtitle
          prefix="Exploring"
          highlight={totalCount.toLocaleString()}
          suffix="souls across the cosmos"
        />
      }
      controls={
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full group">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Filter by name..."
            />
          </div>
          <div className="w-full md:w-auto">
            <FilterPanel
              theme="portal"
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
            filters={filters}
            searchQuery={searchQuery}
            onRemove={key => {
              key === 'name'
                ? setSearchQuery('')
                : setFilters(prev => ({ ...prev, [key]: undefined }));
            }}
            onClearAll={handleClearFilters}
            onClearSearch={() => setSearchQuery('')}
            theme="portal"
          />
        ) : null
      }
      onClearFilters={handleClearFilters}
      onLoadMore={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      emptyTitle="Character Not Found"
      renderItem={(character, index) => (
        <CharacterCard key={character.id} character={character} priority={index < 4} />
      )}
    />
  );
}
