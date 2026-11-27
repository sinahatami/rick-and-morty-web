import { infiniteQueryOptions } from '@tanstack/react-query';

import { type Params } from '~/lib/api/client';
import { type Paginated } from '~/lib/api/types';

export type Filters = Record<string, string | undefined>;

/**
 * Query options for an infinite, filterable list. `initialPage` is the server-rendered first page:
 * it is only used for the unfiltered list.
 */
export function paginatedQuery<T, F extends Filters>(
  resource: string,
  fetchPage: (params: Params, signal: AbortSignal) => Promise<Paginated<T>>,
  filters: F,
  initialPage?: Paginated<T>,
) {
  const isUnfiltered = Object.values(filters).every(value => !value);

  return infiniteQueryOptions({
    queryKey: [resource, 'list', filters] as const,
    queryFn: ({ pageParam, signal }) => fetchPage({ ...filters, page: pageParam }, signal),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _pages, lastPageParam) =>
      lastPageParam < lastPage.info.pages ? lastPageParam + 1 : undefined,
    initialData:
      initialPage && isUnfiltered ? { pages: [initialPage], pageParams: [1] } : undefined,
  });
}
