import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useDebounce } from './useDebounce';
import { apiClient } from '~/lib/api-client';
import { PaginatedResponse } from '~/types';

type ResourceType = 'characters' | 'locations' | 'episodes';

interface UseResourceQueryOptions<F> {
  resource: ResourceType;
  filters: F;
}

export function useResourceQuery<T, F extends { name?: string }>({
  resource,
  filters,
}: UseResourceQueryOptions<F>) {
  const debouncedName = useDebounce(filters.name, 300);

  const optimizedFilters = useMemo(
    () => ({
      ...filters,
      name: debouncedName,
    }),
    [filters, debouncedName]
  );

  const queryResult = useInfiniteQuery({
    queryKey: [resource, optimizedFilters],
    queryFn: ({ pageParam = 1 }) => {
      const params: Record<string, string> = {
        page: pageParam.toString(),
      };

      Object.entries(optimizedFilters).forEach(([key, value]) => {
        if (value && value.toString().trim() !== '') {
          params[key] = value.toString();
        }
      });

      switch (resource) {
        case 'characters':
          return apiClient.characters.getAll(params) as Promise<PaginatedResponse<T>>;
        case 'locations':
          return apiClient.locations.getAll(params) as Promise<PaginatedResponse<T>>;
        case 'episodes':
          return apiClient.episodes.getAll(params) as Promise<PaginatedResponse<T>>;
        default:
          throw new Error(`Invalid resource type: ${resource}`);
      }
    },
    getNextPageParam: (lastPage: PaginatedResponse<T>) => {
      if (!lastPage.info.next) return undefined;

      try {
        const url = new URL(lastPage.info.next);
        const pageParam = url.searchParams.get('page');
        return pageParam ? Number(pageParam) : undefined;
      } catch (error) {
        console.error(`[useResourceQuery] Error parsing next page URL for ${resource}:`, error);
        return undefined;
      }
    },
    initialPageParam: 1,
    retry: (failureCount, error: any) => {
      if (error?.status === 404 || error?.status === 0) return false;
      return failureCount < 2;
    },
  });

  const items = useMemo(() => {
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
    items,
    totalCount,
    totalPages,
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    error: queryResult.error,
    isFetching: queryResult.isFetching,
    fetchNextPage: queryResult.fetchNextPage,
    hasNextPage: !!queryResult.hasNextPage,
    isFetchingNextPage: queryResult.isFetchingNextPage,
    refetch: queryResult.refetch,
    isRefetching: queryResult.isRefetching,
  };
}
