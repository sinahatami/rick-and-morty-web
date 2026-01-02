import { Episode } from '~/types/api/episode';
import { useResourceQuery } from './useResourceQuery';

interface UseEpisodesParams {
  name?: string;
  episode?: string;
}

export function useEpisodes({ name, episode }: UseEpisodesParams = {}) {
  const result = useResourceQuery<Episode, UseEpisodesParams>({
    resource: 'episodes',
    filters: { name, episode },
  });

  const { items, ...rest } = result;

  return {
    episodes: items,
    ...rest,
  };
}
