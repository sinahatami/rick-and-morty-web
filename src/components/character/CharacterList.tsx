import { useState, useEffect, useCallback } from 'react';

import { ResourcePageLayout } from '../shared/ResourcePageLayout';
import { FilterPanel } from '../shared/filter/FilterPanel';
import { SearchBar } from '../shared/SearchBar';
import { ActiveFilterTags } from '../shared/filter/ActiveFilterTags';
import { CharacterCard } from './CharacterCard';
import { SimpleBanner } from '../shared/SimpleBanner';
import { PageSubtitle } from '../shared/PageSubtitle';

import { useUrlSync } from '~/hooks/useUrlSync';
import { useCharacters } from '~/hooks/useCharacters';
import { Character, FilterOptionsCharacter, URLFiltersCharacter } from '~/types';

import banner from '~/public/images/character-banner.jpg';

// --- Utilities ---
const extractFilterOptions = (characters: Character[]): FilterOptionsCharacter => {
  const speciesSet = new Set<string>();
  const genderSet = new Set<string>();
  const statusSet = new Set<string>();

  characters.forEach(character => {
    if (character.species) speciesSet.add(character.species);
    if (character.gender) genderSet.add(character.gender);
    if (character.status) statusSet.add(character.status);
  });

  return {
    species: Array.from(speciesSet).sort(),
    gender: Array.from(genderSet).sort(),
    status: Array.from(statusSet).sort(),
  };
};

const getInitialFiltersFromUrl = (searchParams: URLSearchParams): URLFiltersCharacter => {
  return {
    name: searchParams.get('name') || undefined,
    status: searchParams.get('status') || undefined,
    species: searchParams.get('species') || undefined,
    gender: searchParams.get('gender') || undefined,
  };
};

// --- Main Component ---
export function CharacterList() {
  const { filters, setFilters, searchQuery, setSearchQuery, debouncedSearch } =
    useUrlSync(getInitialFiltersFromUrl);

  const [filterOptions, setFilterOptions] = useState<FilterOptionsCharacter>({
    species: [],
    gender: [],
    status: [],
  });

  const { characters, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, totalCount } =
    useCharacters({
      name: debouncedSearch || undefined,
      status: filters.status,
      species: filters.species,
      gender: filters.gender,
    });

  const [initialOptions, setInitialOptions] = useState<FilterOptionsCharacter | null>(null);

  const hasActiveFilters = Boolean(
    searchQuery.trim() || filters.status || filters.species || filters.gender
  );

  // Extract filters from dynamic data
  useEffect(() => {
    if (characters.length > 0) {
      const newOptions = extractFilterOptions(characters);
      if (!hasActiveFilters && !initialOptions) {
        setInitialOptions(newOptions);
      }
      setFilterOptions(newOptions);
    }
  }, [characters, hasActiveFilters, initialOptions]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setFilters({});
  }, [setSearchQuery, setFilters]);

  const displayOptions = hasActiveFilters && initialOptions ? initialOptions : filterOptions;

  // DEFINE THEME ONCE
  const PAGE_THEME = 'portal';

  return (
    <ResourcePageLayout
      items={characters}
      isLoading={isLoading}
      totalCount={totalCount}
      title="Characters"
      theme={PAGE_THEME}
      headerExtra={<SimpleBanner src={banner} />}
      subtitle={
        <PageSubtitle
          theme={PAGE_THEME}
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
              filterOptions={displayOptions}
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
              key === 'name'
                ? setSearchQuery('')
                : setFilters(prev => ({ ...prev, [key]: undefined }));
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
      emptyTitle="Character Not Found"
      renderItem={character => <CharacterCard key={character.id} character={character} />}
    />
  );
}
