import { LocationDimension, LocationType } from './location-type-dimension';

export interface LocationFilters {
  name?: string;
  type?: LocationType;
  dimension?: LocationDimension;
  [key: string]: string | undefined;
}
