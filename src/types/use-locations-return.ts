import { Location } from '~/types';

export interface UseLocationsReturn {
  locations: Location[];
  totalCount: number;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  refetch: () => void;
  isRefetching: boolean;
}