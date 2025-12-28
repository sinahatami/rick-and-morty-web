import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  InfiniteData
} from '@tanstack/react-query';
import { Character, PaginatedResponse } from '../types/api';
import { apiClient } from '../lib/api-client';

interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}

export function useCharacters(
  filters: CharacterFilters = {}
): UseInfiniteQueryResult<InfiniteData<PaginatedResponse<Character>>, Error> {
  return useInfiniteQuery<
    PaginatedResponse<Character>,
    Error,
    InfiniteData<PaginatedResponse<Character>>,
    [string, CharacterFilters],
    number
  >({
    queryKey: ['characters', filters],
    queryFn: ({ pageParam = 1 }) => {
      const params: Record<string, string> = {
        page: pageParam.toString(),
      };

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value.toString().trim() !== '') {
          params[key] = value.toString();
        }
      });

      if (process.env.NODE_ENV === 'development') {
        console.debug('[useCharacters] Fetching with params:', params);
      }

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
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 404) return false;
      return failureCount < 2;
    },
  });
}