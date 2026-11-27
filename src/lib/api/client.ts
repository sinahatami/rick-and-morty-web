import { type Character, type Episode, type Location, type Paginated } from './types';

const API_URL = 'https://rickandmortyapi.com/api';

export type Params = Record<string, string | number | undefined>;

export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const EMPTY_PAGE: Paginated<never> = {
  info: { count: 0, pages: 0, next: null, prev: null },
  results: [],
};

async function request<T>(path: string, params: Params = {}, signal?: AbortSignal): Promise<T> {
  const url = new URL(`${API_URL}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && String(value).trim() !== '')
      url.searchParams.set(key, String(value));
  }

  let response: Response;
  try {
    response = await fetch(url, { signal });
  } catch (error) {
    // Cancelled requests are handled by the caller (React Query); everything else is a network failure.
    if (signal?.aborted) throw error;
    throw new ApiError('Network error occurred. Please check your connection.');
  }

  if (response.status === 404) throw new ApiError('Nothing found.', 404);
  if (!response.ok) throw new ApiError('Something went wrong. Please try again.', response.status);

  return (await response.json()) as T;
}

/** The API answers "no match" with a 404; for a list that simply means an empty result. */
async function list<T>(resource: string, params: Params, signal?: AbortSignal) {
  try {
    return await request<Paginated<T>>(`/${resource}`, params, signal);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return EMPTY_PAGE;
    throw error;
  }
}

/** Fetches several items at once. The API returns a bare object (not an array) for a single id. */
async function byIds<T>(resource: string, ids: number[], signal?: AbortSignal): Promise<T[]> {
  if (ids.length === 0) return [];
  const data = await request<T | T[]>(`/${resource}/${ids.join(',')}`, {}, signal);
  return Array.isArray(data) ? data : [data];
}

export const api = {
  characters: {
    list: (params: Params, signal?: AbortSignal) => list<Character>('character', params, signal),
    byId: (id: number) => request<Character>(`/character/${id}`),
    byIds: (ids: number[], signal?: AbortSignal) => byIds<Character>('character', ids, signal),
  },
  locations: {
    list: (params: Params, signal?: AbortSignal) => list<Location>('location', params, signal),
    byId: (id: number) => request<Location>(`/location/${id}`),
    byIds: (ids: number[], signal?: AbortSignal) => byIds<Location>('location', ids, signal),
  },
  episodes: {
    list: (params: Params, signal?: AbortSignal) => list<Episode>('episode', params, signal),
    byId: (id: number) => request<Episode>(`/episode/${id}`),
    byIds: (ids: number[], signal?: AbortSignal) => byIds<Episode>('episode', ids, signal),
  },
};
