import { describe, expect, it, vi } from 'vitest';

import { type Paginated } from '~/lib/api/types';

import { paginatedQuery } from './paginated';

const page = (pages: number): Paginated<{ id: number }> => ({
  info: { count: pages * 20, pages, next: null, prev: null },
  results: [{ id: 1 }],
});

describe('paginatedQuery', () => {
  const fetchPage = vi.fn();

  it('keys the query by resource and filters', () => {
    expect(paginatedQuery('characters', fetchPage, { name: 'rick' }).queryKey).toEqual([
      'characters',
      'list',
      { name: 'rick' },
    ]);
  });

  it('asks for the next page until the last one', () => {
    const { getNextPageParam } = paginatedQuery('characters', fetchPage, {});

    expect(getNextPageParam(page(3), [], 1, [])).toBe(2);
    expect(getNextPageParam(page(3), [], 2, [])).toBe(3);
    expect(getNextPageParam(page(3), [], 3, [])).toBeUndefined();
    expect(getNextPageParam(page(0), [], 1, [])).toBeUndefined();
  });

  it('seeds the cache with the server-rendered page, but only for the unfiltered list', () => {
    const initial = page(3);

    expect(paginatedQuery('characters', fetchPage, {}, initial).initialData).toEqual({
      pages: [initial],
      pageParams: [1],
    });
    expect(
      paginatedQuery('characters', fetchPage, { name: undefined }, initial).initialData,
    ).toBeDefined();
    expect(
      paginatedQuery('characters', fetchPage, { name: 'rick' }, initial).initialData,
    ).toBeUndefined();
  });

  it('passes the filters and the page number to the fetcher', async () => {
    fetchPage.mockResolvedValue(page(1));
    const options = paginatedQuery('characters', fetchPage, { status: 'Alive' });
    const signal = new AbortController().signal;

    await (options.queryFn as (context: unknown) => Promise<unknown>)({ pageParam: 2, signal });

    expect(fetchPage).toHaveBeenCalledWith({ status: 'Alive', page: 2 }, signal);
  });
});
