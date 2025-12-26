import { useState, useEffect, useCallback, memo } from 'react';
import { Loader2, Search, X, ChevronUp, AlertCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterPanel } from './FilterPanel';
import { CharacterCard } from './CharacterCard';
import { useDebounce } from '../hooks/useDebounce';
import { useSimplifiedCharacters } from '../hooks/useSimplifiedCharacters';
import { Character } from '../types';

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

// Extract unique values from characters array
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

// Get initial filters from URL
const getInitialFiltersFromUrl = (searchParams: URLSearchParams): URLFilters => {
  const filters: URLFilters = {};

  const name = searchParams.get('name');
  const status = searchParams.get('status');
  const species = searchParams.get('species');
  const gender = searchParams.get('gender');

  if (name) filters.name = name;
  if (status) filters.status = status;
  if (species) filters.species = species;
  if (gender) filters.gender = gender;

  return filters;
};

// Update URL with filters
const updateUrlWithFilters = (
  router: ReturnType<typeof useRouter>,
  filters: URLFilters,
  searchParams: URLSearchParams
) => {
  const params = new URLSearchParams(searchParams.toString());

  // Clear existing filter params
  ['name', 'status', 'species', 'gender'].forEach(key => {
    params.delete(key);
  });

  // Add new filter params
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value.trim() !== '') {
      params.set(key, value.toString());
    }
  });

  const queryString = params.toString();
  router.push(queryString ? `?${queryString}` : '', { scroll: false });
};

// Memoized loading component
const LoadingState = memo(() => (
  <div className="flex flex-col justify-center items-center py-16 space-y-4">
    <div className="relative">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent blur-lg" />
    </div>
    <div className="text-text-secondary text-lg font-medium">Loading characters...</div>
    <p className="text-text-tertiary text-sm text-center max-w-md">
      Exploring the multiverse for Rick, Morty, and all their friends
    </p>
  </div>
));

LoadingState.displayName = 'LoadingState';

// Memoized error component
const ErrorState = memo(({ error, onRetry }: { error: Error; onRetry: () => void }) => (
  <div className="text-center py-16 space-y-6">
    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 border-2 border-red-100 mb-2">
      <AlertCircle className="h-10 w-10 text-red-500" />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-text-primary">Failed to load characters</h3>
      <div className="text-text-secondary text-sm max-w-md mx-auto">
        {error.message || 'An unexpected error occurred while fetching characters.'}
      </div>
    </div>
    <div className="pt-4">
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        Try Again
      </button>
    </div>
  </div>
));

ErrorState.displayName = 'ErrorState';

// Memoized empty state component
const EmptyState = memo(({ onClearFilters }: { onClearFilters: () => void }) => (
  <div className="text-center py-16 space-y-6">
    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 border-2 border-gray-100 mb-2">
      <Search className="h-10 w-10 text-gray-400" />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-text-primary">No characters found</h3>
      <p className="text-text-tertiary text-sm max-w-md mx-auto">
        No characters match your search criteria. Try adjusting your filters or search term.
      </p>
    </div>
    <div className="pt-4">
      <button
        onClick={onClearFilters}
        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-lg hover:shadow-xl"
      >
        Clear All Filters
      </button>
    </div>
  </div>
));

EmptyState.displayName = 'EmptyState';

// Main CharacterList component
export function CharacterList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for filters
  const [filters, setFilters] = useState<URLFilters>(() => getInitialFiltersFromUrl(searchParams));
  const [searchQuery, setSearchQuery] = useState(filters.name || '');
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    species: [],
    gender: [],
    status: [],
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Debounce search query
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Use the simplified characters hook
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

  // Update URL when filters change
  useEffect(() => {
    updateUrlWithFilters(
      router,
      {
        name: debouncedSearch,
        status: filters.status,
        species: filters.species,
        gender: filters.gender,
      },
      searchParams
    );
  }, [debouncedSearch, filters, router, searchParams]);

  // Extract filter options from characters
  useEffect(() => {
    if (characters.length > 0) {
      const options = extractFilterOptions(characters);
      setFilterOptions(options);
    }
  }, [characters]);

  // Handle scroll for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search input change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback(
    (newFilters: { status?: string; species?: string; gender?: string }) => {
      setFilters(prev => ({
        ...prev,
        ...newFilters,
      }));
      setShowFilters(false);
    },
    []
  );

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setFilters({});
    setShowFilters(false);

    // Also clear URL params
    const params = new URLSearchParams(searchParams.toString());
    ['name', 'status', 'species', 'gender'].forEach(key => {
      params.delete(key);
    });
    router.push(params.toString() ? `?${params.toString()}` : '', { scroll: false });
  }, [router, searchParams]);

  // Scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Check if any filters are active
  const hasActiveFilters = Boolean(
    searchQuery.trim() || filters.status || filters.species || filters.gender
  );

  // Calculate showing count
  const showingCount = characters.length;

  // Loading state
  if (isLoading && characters.length === 0) {
    return <LoadingState />;
  }

  // Error state
  if (isError && characters.length === 0) {
    return <ErrorState error={error || new Error('Unknown error')} onRetry={refetch} />;
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-text-primary">Characters</h1>
          <p className="text-text-secondary">
            Browse through all characters from the Rick and Morty universe
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-tertiary" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Filter by name..."
              className="w-full pl-10 pr-4 py-3.5 bg-white border border-border rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-3 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Search characters by name"
            />
          </div>

          {/* Filter and Clear Buttons */}
          <div className="flex items-center gap-3">
            <FilterPanel
              filters={filters}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              onClose={() => setShowFilters(false)}
            />

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gray-100 border border-border rounded-xl text-text-primary hover:bg-gray-200 transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-95"
                aria-label="Clear all filters"
              >
                <X className="h-5 w-5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="text-sm font-medium text-blue-800">Active filters:</div>

            {filters.species && (
              <div className="inline-flex items-center bg-white border border-blue-300 rounded-lg px-3 py-2 shadow-sm">
                <span className="text-sm text-gray-700 font-medium mr-1">Species:</span>
                <span className="text-sm text-blue-700 font-semibold">{filters.species}</span>
                <button
                  onClick={() => setFilters(prev => ({ ...prev, species: undefined }))}
                  className="ml-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 p-1 rounded transition-colors"
                  aria-label="Remove species filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {filters.gender && (
              <div className="inline-flex items-center bg-white border border-blue-300 rounded-lg px-3 py-2 shadow-sm">
                <span className="text-sm text-gray-700 font-medium mr-1">Gender:</span>
                <span className="text-sm text-blue-700 font-semibold">{filters.gender}</span>
                <button
                  onClick={() => setFilters(prev => ({ ...prev, gender: undefined }))}
                  className="ml-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 p-1 rounded transition-colors"
                  aria-label="Remove gender filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {filters.status && (
              <div className="inline-flex items-center bg-white border border-blue-300 rounded-lg px-3 py-2 shadow-sm">
                <span className="text-sm text-gray-700 font-medium mr-1">Status:</span>
                <span className="text-sm text-blue-700 font-semibold">{filters.status}</span>
                <button
                  onClick={() => setFilters(prev => ({ ...prev, status: undefined }))}
                  className="ml-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 p-1 rounded transition-colors"
                  aria-label="Remove status filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            <button
              onClick={handleClearFilters}
              className="ml-auto text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 px-3 py-2 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Stats and Results Section */}
      <div className="space-y-6">
        {/* Stats Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-surface border border-border rounded-xl">
          <div className="space-y-1">
            <div className="text-sm text-text-secondary">
              {!hasActiveFilters && totalCount > 0 ? (
                <>
                  Total characters in the multiverse:{' '}
                  <span className="text-text-primary font-bold">{totalCount.toLocaleString()}</span>
                </>
              ) : (
                <>
                  Showing: <span className="text-text-primary font-bold">{showingCount}</span>{' '}
                  character{showingCount !== 1 ? 's' : ''}
                  {hasActiveFilters && ' (filtered)'}
                </>
              )}
            </div>
            {hasActiveFilters && totalCount > 0 && (
              <div className="text-xs text-text-tertiary">
                Out of {totalCount.toLocaleString()} total characters
              </div>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="self-start sm:self-center text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-1.5 px-3 py-2 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
              Clear all filters
            </button>
          )}
        </div>

        {/* Characters Grid */}
        {characters.length === 0 && !isLoading ? (
          <EmptyState onClearFilters={handleClearFilters} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {characters.map(character => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            {/* Load More Button */}
            {hasNextPage && characters.length > 0 && (
              <div className="text-center pt-8">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 min-w-72"
                  aria-label="Load more characters"
                >
                  {isFetchingNextPage ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'LOAD MORE'
                  )}
                </button>
                <p className="text-text-tertiary text-sm mt-3">
                  Showing {showingCount} of {totalCount} characters
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-white p-3.5 rounded-full shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 hover:scale-110 border border-border group"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6 text-text-primary group-hover:text-primary transition-colors" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      )}
    </div>
  );
}
