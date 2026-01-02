import { Location, LocationFilterOptions } from '~/types';

export const extractLocationOptions = (locations: Location[]): LocationFilterOptions => {
  const typeSet = new Set<string>();
  const dimensionSet = new Set<string>();

  locations.forEach(location => {
    if (location.type) typeSet.add(location.type);
    if (location.dimension) dimensionSet.add(location.dimension);
  });

  return {
    type: Array.from(typeSet).sort(),
    dimension: Array.from(dimensionSet).sort(),
  };
};
