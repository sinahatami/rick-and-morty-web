import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '~/hooks/useDebounce';

export function useUrlSync<T extends Record<string, any>>(
  parseFilters: (params: URLSearchParams) => T,
  delay = 500
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValues = useMemo(() => parseFilters(searchParams), [searchParams, parseFilters]);

  const [filters, setFilters] = useState<T>(initialValues);

  const [searchQuery, setSearchQuery] = useState<string>((initialValues as any).name || '');

  const debouncedSearch = useDebounce(searchQuery, delay);

  // 2. Sync State -> URL
  useEffect(() => {
    const params = new URLSearchParams();

    // Set Search Param
    if (debouncedSearch) {
      params.set('name', debouncedSearch);
    }

    // Set Other Filters
    Object.entries(filters).forEach(([key, value]) => {
      // Skip 'name' since we handled it with debouncedSearch
      if (key === 'name') return;

      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    });

    const query = params.toString();
    router.push(query ? `?${query}` : '', { scroll: false });
  }, [debouncedSearch, filters, router]);

  return {
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    debouncedSearch,
  };
}
