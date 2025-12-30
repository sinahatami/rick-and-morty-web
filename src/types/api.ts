export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

// Single page response
export interface PaginatedResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export type ApiResponse<T> = PaginatedResponse<T>;

// For React Query's infinite query - this wraps multiple pages
export interface InfiniteQueryResponse<T> {
  pages: PaginatedResponse<T>[];
  pageParams: number[];
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  page?: number;
}

export interface LocationFilters {
  name?: string;
  type?: string;
  dimension?: string;
  page?: number;
}

export interface EpisodeFilters {
  name?: string;
  episode?: string;
  page?: number;
}