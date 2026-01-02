import { Location } from '../api';

export interface UseLocationsReturn {
  locations: Location[];
  totalCount: number;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
  error: any;
  fetchNextPage: () => Promise<any>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  refetch: () => Promise<any>;
  isRefetching?: boolean;
}
