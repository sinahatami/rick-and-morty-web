import { api } from '~/lib/api/client';
import { type Episode, type Paginated } from '~/lib/api/types';
import { paginatedQuery } from '~/lib/query/paginated';

import { type EpisodeFilters, toEpisodeApiFilters } from './filters';

export const episodeListQuery = (filters: EpisodeFilters, initialPage?: Paginated<Episode>) =>
  paginatedQuery('episodes', api.episodes.list, toEpisodeApiFilters(filters), initialPage);
