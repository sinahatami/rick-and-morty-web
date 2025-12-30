import { useState, useEffect, useCallback } from 'react';

import { Character } from '~/types';
import { useSimplifiedCharacters } from '~/hooks/useSimplifiedCharacters';

import { ResourcePageLayout } from '../shared/ResourcePageLayout';
import { FilterPanel } from '../shared/FilterPanel';
import { SearchBar } from '../shared/SearchBar';
import { ActiveFilterTags } from '../shared/ActiveFilterTags';
import { CharacterCard } from './CharacterCard';
import { SimpleBanner } from '../shared/SimpleBanner';

import banner from '~/public/images/character-banner.jpg';
import { useUrlSync } from '~/hooks/useUrlSync';

// --- Types ---

interface FilterOptions {
  species: string[];
  gender: string[];
  status: string[];
  [key: string]: string[];
}

interface URLFilters {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  [key: string]: string | undefined;
}

// --- Utilities ---

const extractFilterOptions = (characters: Character[]): FilterOptions => {
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

const getInitialFiltersFromUrl = (searchParams: URLSearchParams): URLFilters => {
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

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    species: [],
    gender: [],
    status: [],
  });

  const { characters, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, totalCount } =
    useSimplifiedCharacters({
      name: debouncedSearch || undefined,
      status: filters.status,
      species: filters.species,
      gender: filters.gender,
    });

  const [initialOptions, setInitialOptions] = useState<FilterOptions | null>(null);

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

  return (
    <ResourcePageLayout
      items={characters}
      isLoading={isLoading}
      totalCount={totalCount}
      title="Characters"
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
