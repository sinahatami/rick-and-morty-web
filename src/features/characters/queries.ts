import { api } from '~/lib/api/client';
import { type Character, type Paginated } from '~/lib/api/types';
import { paginatedQuery } from '~/lib/query/paginated';

import { type CharacterFilters } from './filters';

export const characterListQuery = (filters: CharacterFilters, initialPage?: Paginated<Character>) =>
  paginatedQuery('characters', api.characters.list, filters, initialPage);
