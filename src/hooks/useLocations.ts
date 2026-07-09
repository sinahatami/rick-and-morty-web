import { Location, LocationFilters } from '~/types';
import { useResourceQuery } from './useResourceQuery';
import { apiClient } from '~/lib/api-client';

export function useLocations(filters: LocationFilters = {}) {
  const result = useResourceQuery<Location, LocationFilters>({
    queryKeyPrefix: 'locations',
    filters,
    fetchFn: params => apiClient.locations.getAll(params),
  });

  const { items, ...rest } = result;

  return {
    locations: items,
    ...rest,
  };
}
