import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useDebounce } from './useDebounce';
import { apiClient } from '~/lib/api-client';
import { CharacterFilters, useCharactersReturn } from '~/types';

export function useCharacters(
  filters: CharacterFilters = {}
): useCharactersReturn {
  const debouncedName = useDebounce(filters.name, 300);

  const optimizedFilters = useMemo(() => ({
    ...filters,
    name: debouncedName,
  }), [filters, debouncedName]);

  const queryResult = useInfiniteQuery({
    queryKey: ['characters', optimizedFilters],
    queryFn: ({ pageParam = 1 }) => {
      const params: Record<string, string> = {
        page: pageParam.toString(),
      };

      Object.entries(optimizedFilters).forEach(([key, value]) => {
        if (value && value.toString().trim() !== '') {
          params[key] = value.toString();
        }
      });

      return apiClient.characters.getAll(params);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;

      try {
        const url = new URL(lastPage.info.next);
        const pageParam = url.searchParams.get('page');
        return pageParam ? Number(pageParam) : undefined;
      } catch (error) {
        console.error('[useCharacters] Error parsing next page URL:', error);
        return undefined;
      }
    },
    initialPageParam: 1,
    retry: (failureCount, error: any) => {
      // If API says 404 (Not Found), don't retry. It just means empty list.
      if (error?.status === 404 || error?.status === 0) return false;
      return failureCount < 2;
    },
  });

  const characters = useMemo(() => {
    if (!queryResult.data?.pages) return [];
    return queryResult.data.pages.flatMap(page => page.results);
  }, [queryResult.data]);

  const totalCount = useMemo(() => {
    return queryResult.data?.pages?.[0]?.info?.count || 0;
  }, [queryResult.data]);

  const totalPages = useMemo(() => {
    return queryResult.data?.pages?.[0]?.info?.pages || 0;
  }, [queryResult.data]);

  return {
    characters,
    totalCount,
    totalPages,
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    error: queryResult.error,
    fetchNextPage: queryResult.fetchNextPage,
    hasNextPage: !!queryResult.hasNextPage,
    isFetchingNextPage: queryResult.isFetchingNextPage,
    refetch: queryResult.refetch,
  };
}