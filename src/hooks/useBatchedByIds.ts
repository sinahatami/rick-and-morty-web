'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { RELATED_BATCH_SIZE as BATCH_SIZE } from '~/lib/constants';

interface Options<T> {
  /** Identifies the list, e.g. `['character', 1, 'episodes']`. */
  queryKey: readonly unknown[];
  /** Every id of the list, in display order. */
  ids: number[];
  /** The first batch, already rendered on the server. */
  initialItems: T[];
  fetchByIds: (ids: number[], signal: AbortSignal) => Promise<T[]>;
}

/** Shows a long list of related items (a cast, the residents of a place) one batch at a time. */
export function useBatchedByIds<T>({ queryKey, ids, initialItems, fetchByIds }: Options<T>) {
  const query = useInfiniteQuery({
    queryKey: [...queryKey, 'batches'],
    queryFn: ({ pageParam, signal }) =>
      fetchByIds(ids.slice(pageParam * BATCH_SIZE, (pageParam + 1) * BATCH_SIZE), signal),
    initialPageParam: 0,
    getNextPageParam: (_lastPage, pages) =>
      pages.length * BATCH_SIZE < ids.length ? pages.length : undefined,
    // The first batch comes from the static page and related items do not change: never refetch it.
    initialData: { pages: [initialItems], pageParams: [0] },
    staleTime: Infinity,
  });

  return {
    items: query.data.pages.flat(),
    total: ids.length,
    hasMore: query.hasNextPage,
    loadMore: query.fetchNextPage,
    isLoadingMore: query.isFetchingNextPage,
    isError: query.isError,
  };
}
