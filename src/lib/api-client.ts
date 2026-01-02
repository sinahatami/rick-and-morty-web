import { Character, Episode, PaginatedResponse, ApiResponse } from '~/types';

import { Location } from '~/types';

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
class ApiClient {
  private baseUrl = 'https://rickandmortyapi.com/api';

  private async request<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value && value.trim() !== '') {
          url.searchParams.append(key, value);
        }
      });
    }

    try {
      const response = await fetch(url.toString());

      // Handle 404 specifically for "no results found"
      if (response.status === 404) {
        throw new ApiError('No characters found matching your search criteria.', 404);
      }

      if (!response.ok) {
        throw new ApiError(`Something went wrong. Please try again.`, response.status);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred. Please check your connection.');
    }
  }

  // Character endpoints
  characters = {
    getAll: (params?: Record<string, string>): Promise<PaginatedResponse<Character>> =>
      this.request<PaginatedResponse<Character>>('/character', params),

    getById: (id: string) => this.request<Character>(`/character/${id}`),

    getMultiple: (ids: number[]) => {
      if (ids.length === 0) return Promise.resolve([]);
      if (ids.length === 1) {
        // Handle single ID as an array
        return this.request<Character[]>(`/character/${ids[0]}`).then(res => [res]);
      }
      return this.request<Character[]>(`/character/${ids.join(',')}`);
    },
  };

  // Location endpoints
  locations = {
    getAll: (params?: Record<string, string>) =>
      this.request<ApiResponse<Location>>('/location', params),

    getById: (id: string) => this.request<Location>(`/location/${id}`),
  };

  // Episode endpoints
  episodes = {
    getAll: (params?: Record<string, string>) =>
      this.request<ApiResponse<Episode>>('/episode', params),

    getById: (id: string) => this.request<Episode>(`/episode/${id}`),
  };
}

export const apiClient = new ApiClient();
