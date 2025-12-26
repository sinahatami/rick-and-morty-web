export const DEFAULT_QUERY_OPTIONS = {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (React Query v4.29+ uses gcTime instead of cacheTime)
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
};