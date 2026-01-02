import { Location, LocationFilters } from '~/types';
import { useResourceQuery } from './useResourceQuery';

export function useLocations(filters: LocationFilters = {}) {
  const result = useResourceQuery<Location, LocationFilters>({
    resource: 'locations',
    filters,
  });

  const { items, ...rest } = result;

  return {
    locations: items,
    ...rest,
  };
}
