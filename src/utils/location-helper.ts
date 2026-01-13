import { Location, LocationType } from '~/types';

export function parseLocationData(location: Location) {
  return {
    id: location.id,
    name: location.name,
    type: (location.type as LocationType) || 'unknown',
    residentsCount: location.residents.length,
    theme: 'rick' as const,
  };
}