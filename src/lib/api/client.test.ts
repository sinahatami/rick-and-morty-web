import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { api, ApiError } from './client';

const fetchMock = vi.fn();

const respond = (body: unknown, status = 200) =>
  ({ ok: status >= 200 && status < 300, status, json: async () => body }) as Response;

/** The URL (as text) of the n-th request. */
const requestedUrl = (call = 0) => String(fetchMock.mock.calls[call]?.[0]);

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  fetchMock.mockReset();
  vi.unstubAllGlobals();
});

describe('lists', () => {
  it('sends the filters as query parameters and skips empty ones', async () => {
    fetchMock.mockResolvedValue(respond({ info: {}, results: [] }));

    await api.characters.list({ name: 'Rick', status: '', species: undefined, page: 2 });

    const url = new URL(requestedUrl());
    expect(url.origin + url.pathname).toBe('https://rickandmortyapi.com/api/character');
    expect(Object.fromEntries(url.searchParams)).toEqual({ name: 'Rick', page: '2' });
  });

  it('treats a 404 ("no match") as an empty list, not as an error', async () => {
    fetchMock.mockResolvedValue(respond({ error: 'There is nothing here' }, 404));

    const page = await api.locations.list({ name: 'zzzz' });

    expect(page.results).toEqual([]);
    expect(page.info).toEqual({ count: 0, pages: 0, next: null, prev: null });
  });

  it('turns other HTTP errors into an ApiError with a friendly message', async () => {
    fetchMock.mockResolvedValue(respond({}, 500));

    await expect(api.episodes.list({})).rejects.toMatchObject({
      name: 'ApiError',
      status: 500,
      message: 'Something went wrong. Please try again.',
    });
  });

  it('turns network failures into an ApiError without a status', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));

    const error = await api.characters.list({}).catch((reason: unknown) => reason);

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({
      message: 'Network error occurred. Please check your connection.',
    });
    expect((error as ApiError).status).toBeUndefined();
  });

  it('passes cancellations through untouched', async () => {
    const controller = new AbortController();
    controller.abort();
    const abortError = new DOMException('The operation was aborted.', 'AbortError');
    fetchMock.mockRejectedValue(abortError);

    await expect(api.characters.list({}, controller.signal)).rejects.toBe(abortError);
  });
});

describe('single items', () => {
  it('fetches one item by id', async () => {
    fetchMock.mockResolvedValue(respond({ id: 7, name: 'Abradolf Lincler' }));

    await expect(api.characters.byId(7)).resolves.toMatchObject({ id: 7 });
    expect(requestedUrl()).toBe('https://rickandmortyapi.com/api/character/7');
  });

  it('rejects with a 404 ApiError for an unknown id', async () => {
    fetchMock.mockResolvedValue(respond({}, 404));

    await expect(api.locations.byId(99999)).rejects.toMatchObject({ status: 404 });
  });
});

describe('several items at once', () => {
  it('joins the ids into one request', async () => {
    fetchMock.mockResolvedValue(respond([{ id: 1 }, { id: 2 }, { id: 3 }]));

    await expect(api.characters.byIds([1, 2, 3])).resolves.toHaveLength(3);
    expect(requestedUrl()).toBe('https://rickandmortyapi.com/api/character/1,2,3');
  });

  it('always returns an array, although the API answers a single id with a bare object', async () => {
    fetchMock.mockResolvedValue(respond({ id: 5, name: 'Jerry' }));

    await expect(api.characters.byIds([5])).resolves.toEqual([{ id: 5, name: 'Jerry' }]);
  });

  it('does not call the API for an empty list', async () => {
    await expect(api.episodes.byIds([])).resolves.toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
