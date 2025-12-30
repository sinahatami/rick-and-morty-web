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
