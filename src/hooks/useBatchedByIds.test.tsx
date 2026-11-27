import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { type ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useBatchedByIds } from './useBatchedByIds';

type Item = { id: number };

const ids = Array.from({ length: 30 }, (_, index) => index + 1);
const itemsOf = (wanted: number[]): Item[] => wanted.map(id => ({ id }));

let client: QueryClient;

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

beforeEach(() => {
  client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
});

describe('useBatchedByIds', () => {
  it('starts with the batch that was rendered by the server and does not refetch it', () => {
    const fetchByIds = vi.fn();

    const { result } = renderHook(
      () =>
        useBatchedByIds<Item>({
          queryKey: ['test', 'start'],
          ids,
          initialItems: itemsOf(ids.slice(0, 12)),
          fetchByIds,
        }),
      { wrapper },
    );

    expect(result.current.items).toHaveLength(12);
    expect(result.current.total).toBe(30);
    expect(result.current.hasMore).toBe(true);
    expect(fetchByIds).not.toHaveBeenCalled();
  });

  it('loads the following ids batch by batch until the list is complete', async () => {
    const fetchByIds = vi.fn(async (wanted: number[]) => itemsOf(wanted));

    const { result } = renderHook(
      () =>
        useBatchedByIds<Item>({
          queryKey: ['test', 'batches'],
          ids,
          initialItems: itemsOf(ids.slice(0, 12)),
          fetchByIds,
        }),
      { wrapper },
    );

    await act(() => result.current.loadMore());
    await waitFor(() => expect(result.current.items).toHaveLength(24));
    expect(fetchByIds.mock.calls[0]?.[0]).toEqual(ids.slice(12, 24));
    expect(result.current.hasMore).toBe(true);

    await act(() => result.current.loadMore());
    await waitFor(() => expect(result.current.items).toHaveLength(30));
    expect(fetchByIds.mock.calls[1]?.[0]).toEqual(ids.slice(24, 30));
    expect(result.current.hasMore).toBe(false);
  });

  it('has nothing more to load when everything was rendered up front', () => {
    const { result } = renderHook(
      () =>
        useBatchedByIds<Item>({
          queryKey: ['test', 'complete'],
          ids: [1, 2, 3],
          initialItems: itemsOf([1, 2, 3]),
          fetchByIds: vi.fn(),
        }),
      { wrapper },
    );

    expect(result.current.hasMore).toBe(false);
  });

  it('reports a failed batch and keeps what is already on screen', async () => {
    const fetchByIds = vi.fn().mockRejectedValue(new Error('boom'));

    const { result } = renderHook(
      () =>
        useBatchedByIds<Item>({
          queryKey: ['test', 'error'],
          ids,
          initialItems: itemsOf(ids.slice(0, 12)),
          fetchByIds,
        }),
      { wrapper },
    );

    await act(() => result.current.loadMore());
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.items).toHaveLength(12);
  });
});
