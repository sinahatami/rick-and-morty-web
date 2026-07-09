import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useDebounce } from '~/hooks/useDebounce';

export function useUrlSync<T extends Record<string, any>>(
  parseFilters: (params: URLSearchParams) => T,
  delay = 500
) {
  const router = useRouter();

  // Initialize state lazily
  const [filters, setFilters] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return parseFilters(params);
    }
    return {} as T;
  });

  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync URL to State on initial load
  useEffect(() => {
    if (router.isReady) {
      const params = new URLSearchParams(window.location.search);
      const parsed = parseFilters(params);
      setFilters(parsed);

      if ((parsed as any).name) {
        setSearchQuery((parsed as any).name);
      }
    }
  }, [router.isReady, parseFilters]);

  const debouncedSearch = useDebounce(searchQuery, delay);

  // Sync State -> URL
  useEffect(() => {
    if (!router.isReady) return;

    const params = new URLSearchParams();

    // 1. Handle Search
    if (debouncedSearch) {
      params.set('name', debouncedSearch);
    }

    // 2. Handle Filters
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'name') return;

      if (value !== undefined && value !== null && value !== '' && value !== 'undefined') {
        params.set(key, String(value));
      }
    });

    const queryString = params.toString();
    const newPath = queryString ? `${router.pathname}?${queryString}` : router.pathname;

    // Only push if the URL actually changed
    if (newPath !== router.asPath.split('#')[0]) {
      router.push({ pathname: router.pathname, query: queryString }, undefined, {
        shallow: true,
        scroll: false,
      });
    }
  }, [
    debouncedSearch,
    filters,
    router,
    router.isReady,
    router.pathname,
    router.asPath,
    router.push,
  ]);

  return {
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    debouncedSearch,
  };
}
