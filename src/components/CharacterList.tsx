import { useState, useEffect, useCallback, memo } from 'react';
import { Loader2, Search, X, ChevronUp, AlertCircle, FilterX, LayoutGrid } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { FilterPanel } from './FilterPanel';
import { CharacterCard } from './CharacterCard';
import { Character } from '~/types';
import { useDebounce } from '~/hooks/useDebounce';
import { useSimplifiedCharacters } from '~/hooks/useSimplifiedCharacters';

// --- Types ---

interface FilterOptions {
  species: string[];
  gender: string[];
  status: string[];
}

interface URLFilters {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
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

// --- Sub-components ---

const LoadingState = memo(() => (
  <div className="flex flex-col justify-center items-center py-24 space-y-6">
    <div className="relative flex items-center justify-center">
      <div className="absolute h-20 w-20 bg-primary/10 rounded-full animate-ping" />
      <Loader2 className="h-12 w-12 animate-spin text-primary relative z-10" />
    </div>
    <div className="text-center space-y-2">
      <div className="text-gray-900 text-xl font-bold italic">Wubba Lubba Dub Dub!</div>
      <p className="text-gray-500 text-sm font-medium">Scanning the multiverse for characters...</p>
    </div>
  </div>
));

const EmptyState = memo(({ onClearFilters }: { onClearFilters: () => void }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-200">
    <div className="p-4 bg-white rounded-full shadow-sm mb-4">
      <FilterX className="h-10 w-10 text-gray-400" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">Dimension Not Found</h3>
    <p className="text-gray-500 max-w-xs mb-8">
      No characters match those specific criteria in this timeline.
    </p>
    <button
      onClick={onClearFilters}
      className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all active:scale-95 shadow-lg cursor-pointer"
    >
      Clear All Filters
    </button>
  </div>
));

// --- Main Component ---

export function CharacterList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<URLFilters>(() => getInitialFiltersFromUrl(searchParams));
  const [searchQuery, setSearchQuery] = useState(filters.name || '');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    species: [],
    gender: [],
    status: [],
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 500);

  const {
    characters,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    totalCount,
  } = useSimplifiedCharacters({
    name: debouncedSearch || undefined,
    status: filters.status,
    species: filters.species,
    gender: filters.gender,
  });

  // URL Synchronization
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('name', debouncedSearch);
    if (filters.status) params.set('status', filters.status);
    if (filters.species) params.set('species', filters.species);
    if (filters.gender) params.set('gender', filters.gender);

    const query = params.toString();
    router.push(query ? `?${query}` : '', { scroll: false });
  }, [debouncedSearch, filters, router]);

  // Extract filters from dynamic data
  useEffect(() => {
    if (characters.length > 0) {
      setFilterOptions(extractFilterOptions(characters));
    }
  }, [characters]);

  // Scroll visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setFilters({});
  }, []);

  const hasActiveFilters = Boolean(
    searchQuery.trim() || filters.status || filters.species || filters.gender
  );

  if (isLoading && characters.length === 0) return <LoadingState />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header & Search */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-5xl font-black text-gray-900 tracking-tight">Characters</h1>
            <p className="text-gray-400 font-medium text-lg">
              Exploring{' '}
              <span className="text-gray-900 font-black text-xl italic tracking-tighter decoration-primary/30 underline underline-offset-4">
                {totalCount.toLocaleString()}
              </span>
              <span className="ml-1 tracking-widest uppercase text-[13px] font-bold text-gray-400">
                souls across the cosmos
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-2xl shadow-sm">
            <LayoutGrid className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-gray-700">{characters.length} Visible</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input Container */}
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
              className="
        w-full h-14 /* Exactly matches Filter button height */
        pl-12 pr-12
        bg-white border border-gray-200 rounded-2xl 
        shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary 
        transition-all text-gray-900 font-medium placeholder:text-gray-400
      "
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Filter Button Wrapper */}
          <div className="w-full md:w-auto">
            <FilterPanel
              filters={filters}
              filterOptions={filterOptions}
              onFilterChange={newFilters => setFilters(prev => ({ ...prev, ...newFilters }))}
            />
          </div>
        </div>
        {/* Active Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Active Filters
            </span>
            {Object.entries({ ...filters, name: searchQuery }).map(([key, value]) => {
              if (!value) return null;
              return (
                <div
                  key={key}
                  className="flex items-center gap-2 pl-3 pr-1.5 py-2 bg-primary/5 border border-primary/10 rounded-xl"
                >
                  <span className="text-xs font-bold text-primary/60 uppercase">{key}:</span>
                  <span className="text-sm font-black text-primary">{value}</span>
                  <button
                    onClick={() =>
                      key === 'name'
                        ? setSearchQuery('')
                        : setFilters(p => ({ ...p, [key]: undefined }))
                    }
                    className="p-1 hover:bg-primary/10 rounded-lg text-primary transition-colors cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
            <button
              onClick={handleClearFilters}
              className="text-sm font-bold text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </section>

      {/* Grid Content */}
      <section>
        {characters.length === 0 ? (
          <EmptyState onClearFilters={handleClearFilters} />
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {characters.map(character => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            {hasNextPage && (
              <div className="flex flex-col items-center gap-6 py-10">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="group relative px-12 py-4 bg-white border-2 border-gray-900 rounded-2xl font-black text-gray-900 hover:bg-gray-900 hover:text-white transition-all active:scale-95 disabled:opacity-50 cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center gap-3"
                >
                  {isFetchingNextPage ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      LOAD MORE
                      <ChevronUp className="h-5 w-5 rotate-180 group-hover:translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Floaties */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-10 right-10 p-4 bg-gray-900 text-white rounded-2xl shadow-2xl hover:bg-primary transition-all hover:-translate-y-2 cursor-pointer z-50 border-4 border-white"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
