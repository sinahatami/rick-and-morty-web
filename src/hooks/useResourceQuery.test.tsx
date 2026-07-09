import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

import { useResourceQuery } from './useResourceQuery';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Turn off retries for tests
      },
    },
  });

describe('useResourceQuery', () => {
  let queryClient: QueryClient;
  let wrapper: ({ children }: { children: ReactNode }) => ReactNode;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  });

  it('fetches data successfully with initial parameters', async () => {
    const mockFetchFn = jest.fn().mockResolvedValue({
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 1, name: 'Rick Sanchez' }],
    });

    const { result } = renderHook(
      () =>
        useResourceQuery<{ id: number; name: string }, { name?: string }>({
          queryKeyPrefix: 'characters-test',
          filters: { name: 'Rick' },
          fetchFn: mockFetchFn,
        }),
      { wrapper }
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.items.length).toBe(1);
    });

    expect(result.current.items[0].name).toBe('Rick Sanchez');
    expect(result.current.totalCount).toBe(1);
    expect(result.current.totalPages).toBe(1);

    // Check if fetchFn was called with the right params
    expect(mockFetchFn).toHaveBeenCalledWith({
      page: '1',
      name: 'Rick',
    });
  });

  it('computes next page parameters correctly', async () => {
    const mockFetchFn = jest.fn().mockResolvedValue({
      info: {
        count: 40,
        pages: 2,
        next: 'https://rickandmortyapi.com/api/character/?page=2',
        prev: null,
      },
      results: [{ id: 1, name: 'Rick' }],
    });

    const { result } = renderHook(
      () =>
        useResourceQuery<{ id: number; name: string }, { name?: string }>({
          queryKeyPrefix: 'characters-test-next',
          filters: {},
          fetchFn: mockFetchFn,
        }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.hasNextPage).toBe(true);
    });

    // Mock next page fetch
    mockFetchFn.mockResolvedValueOnce({
      info: {
        count: 40,
        pages: 2,
        next: null,
        prev: 'https://rickandmortyapi.com/api/character/?page=1',
      },
      results: [{ id: 2, name: 'Morty' }],
    });

    await result.current.fetchNextPage();

    await waitFor(() => {
      expect(result.current.items.length).toBe(2);
    });

    expect(result.current.items[1].name).toBe('Morty');
    expect(result.current.hasNextPage).toBe(false);
  });
});
