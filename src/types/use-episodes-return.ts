import { Episode } from "./api";

export interface UseEpisodesReturn {
    episodes: Episode[];
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