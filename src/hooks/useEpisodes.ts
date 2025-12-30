import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '~/lib/api-client';
import { Episode } from '~/types';

interface UseEpisodesParams {
  name?: string;
  episode?: string;
}

export function useEpisodes({ name, episode }: UseEpisodesParams) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey: ['episodes', { name, episode }],
    queryFn: ({ pageParam = 1 }) => {
      const params: Record<string, string> = {
        page: pageParam.toString(),
      };

      if (name) params.name = name;
      if (episode) params.episode = episode;

      return apiClient.episodes.getAll(params);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;
      try {
        const url = new URL(lastPage.info.next);
        const pageParam = url.searchParams.get('page');
        return pageParam ? Number(pageParam) : undefined;
      } catch (error) {
        return undefined;
      }
    },
    initialPageParam: 1,
  });

  const episodes = data?.pages.flatMap((page) => page.results) as Episode[] || [];
  const totalCount = data?.pages?.[0]?.info?.count || 0;

  return {
    episodes,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalCount,
    isError: !!error,
    error,
    refetch
  };
}