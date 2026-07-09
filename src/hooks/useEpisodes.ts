import { Episode } from '~/types/api/episode';
import { useResourceQuery } from './useResourceQuery';
import { apiClient } from '~/lib/api-client';

interface UseEpisodesParams {
  name?: string;
  episode?: string;
}

export function useEpisodes({ name, episode }: UseEpisodesParams = {}) {
  const result = useResourceQuery<Episode, UseEpisodesParams>({
    queryKeyPrefix: 'episodes',
    filters: { name, episode },
    fetchFn: params => apiClient.episodes.getAll(params),
  });

  const { items, ...rest } = result;

  return {
    episodes: items,
    ...rest,
  };
}
