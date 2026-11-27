import { api } from '~/lib/api/client';
import { type Location, type Paginated } from '~/lib/api/types';
import { paginatedQuery } from '~/lib/query/paginated';

import { type LocationFilters } from './filters';

export const locationListQuery = (filters: LocationFilters, initialPage?: Paginated<Location>) =>
  paginatedQuery('locations', api.locations.list, filters, initialPage);
