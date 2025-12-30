import { Character } from "./api";

export interface useCharactersReturn {
  characters: Character[];
  totalCount: number;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  refetch: () => void;
}