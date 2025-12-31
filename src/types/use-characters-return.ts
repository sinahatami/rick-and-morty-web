import { Character } from "./api";

export interface UseCharactersReturn {
  characters: Character[];
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