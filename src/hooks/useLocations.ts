import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '~/lib/api-client';
import { Location, PaginatedResponse } from '~/types/api';
import { useDebounce } from './useDebounce';
import { useMemo } from 'react';

interface LocationFilters {
  name?: string;
  type?: string;
  dimension?: string;
}

interface UseLocationsReturn {
  locations: Location[];
  totalCount: number;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  refetch: () => void;
  isRefetching: boolean;
}

export function useLocations(filters: LocationFilters = {}): UseLocationsReturn {
  const debouncedName = useDebounce(filters.name, 300);

  const optimizedFilters = useMemo(() => ({
    ...filters,
    name: debouncedName,
  }), [filters, debouncedName]);

  const queryResult = useInfiniteQuery({
    queryKey: ['locations', optimizedFilters],
    queryFn: async ({ pageParam = 1 }) => {
      const params: Record<string, string> = {
        page: pageParam.toString(),
      };

      Object.entries(optimizedFilters).forEach(([key, value]) => {
        if (value && value.toString().trim() !== '') {
          params[key] = value.toString();
        }
      });

      console.debug('[useLocations] Fetching with params:', params);
      return apiClient.locations.getAll(params);
    },
    getNextPageParam: (lastPage: PaginatedResponse<Location>) => {
      if (!lastPage.info.next) return undefined;

      try {
        const url = new URL(lastPage.info.next);
        const pageParam = url.searchParams.get('page');
        return pageParam ? Number(pageParam) : undefined;
      } catch (error) {
        console.error('[useLocations] Error parsing next page URL:', error);
        return undefined;
      }
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 404 || error?.status === 0) return false;
      return failureCount < 2;
    },
  });

  const locations = useMemo(() => {
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
    locations,
    totalCount,
    totalPages,
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    error: queryResult.error,
    fetchNextPage: queryResult.fetchNextPage,
    hasNextPage: !!queryResult.hasNextPage,
    isFetchingNextPage: queryResult.isFetchingNextPage,
    refetch: queryResult.refetch,
    isRefetching: queryResult.isRefetching,
  };
}