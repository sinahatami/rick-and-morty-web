// hooks/useSimplifiedCharacters.ts
import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from './useDebounce';
import { Character } from '../types';
import { apiClient } from '../lib/api-client';

interface CharacterFilters {
    name?: string;
    status?: string;
    species?: string;
    gender?: string;
}

interface SimplifiedUseCharactersReturn {
    characters: Character[];
    totalCount: number;
    totalPages: number;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    refetch: () => void;
}

export function useSimplifiedCharacters(
    filters: CharacterFilters = {}
): SimplifiedUseCharactersReturn {
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
                console.error('[useSimplifiedCharacters] Error parsing next page URL:', error);
                return undefined;
            }
        },
        initialPageParam: 1,
        staleTime: 5 * 60 * 1000,
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