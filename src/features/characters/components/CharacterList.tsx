'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import banner from '~/assets/images/character-banner.webp';
import { FilterPanel } from '~/components/controls/FilterPanel';
import { SearchBar } from '~/components/controls/SearchBar';
import { PageSubtitle } from '~/components/layout/PageSubtitle';
import { ResourcePageLayout } from '~/components/layout/ResourcePageLayout';
import { useUrlFilters } from '~/hooks/useUrlFilters';
import { type Character, type Paginated } from '~/lib/api/types';

import { CHARACTER_FILTER_OPTIONS, parseCharacterFilters } from '../filters';
import { characterListQuery } from '../queries';
import { CharacterCard } from './CharacterCard';

const ActiveFilterTags = dynamic(
  () => import('~/components/controls/ActiveFilterTags').then(module => module.ActiveFilterTags),
  { ssr: false },
);

/** How many cards are visible without scrolling, so their images are preloaded. */
const PRIORITY_CARDS = 4;

export function CharacterList({ initialPage }: { initialPage: Paginated<Character> }) {
  const { filters, setFilters, searchQuery, setSearchQuery, reset } =
    useUrlFilters(parseCharacterFilters);
  const query = useInfiniteQuery(characterListQuery(filters, initialPage));

  const characters = useMemo(
    () => query.data?.pages.flatMap(page => page.results) ?? [],
    [query.data],
  );
  const totalCount = query.data?.pages[0]?.info.count ?? 0;
  const hasActiveFilters = Boolean(
    searchQuery.trim() || filters.status || filters.species || filters.gender,
  );

  return (
    <ResourcePageLayout
      title="Characters"
      banner={banner}
      subtitle={
        <PageSubtitle
          prefix="Exploring"
          highlight={totalCount.toLocaleString()}
          suffix="souls across the cosmos"
        />
      }
      controls={
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Filter by name..."
            className="w-full flex-1"
          />
          <div className="w-full md:w-auto">
            <FilterPanel
              filters={filters}
              filterOptions={CHARACTER_FILTER_OPTIONS}
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
      items={characters}
      getKey={character => character.id}
      renderItem={(character, index) => (
        <CharacterCard character={character} priority={index < PRIORITY_CARDS} />
      )}
      isLoading={query.isLoading}
      isRefetching={query.isFetching && !query.isLoading && !query.isFetchingNextPage}
      error={query.error}
      onRetry={() => void query.refetch()}
      onClearFilters={reset}
      hasNextPage={query.hasNextPage}
      isFetchingNextPage={query.isFetchingNextPage}
      onLoadMore={() => void query.fetchNextPage()}
      emptyTitle="Character Not Found"
    />
  );
}
