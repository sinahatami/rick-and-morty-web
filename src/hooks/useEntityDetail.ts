import { useQuery } from '@tanstack/react-query';
import { UseEntityDetailResult } from '~/types';

export function useEntityDetail<T>(
  queryKeyPrefix: string,
  fetchFn: (id: string) => Promise<T>,
  id: string,
  errorMessage = 'Failed to load data'
): UseEntityDetailResult<T> {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeyPrefix, id],
    queryFn: () => fetchFn(id),
    enabled: !!id,
    retry: (failureCount, error: any) => {
      if (error?.status === 404 || error?.status === 0) return false;
      return failureCount < 2;
    },
  });

  return {
    data: data || null,
    loading: isLoading,
    error: isError ? errorMessage : null,
  };
}
