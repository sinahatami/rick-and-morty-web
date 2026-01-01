import { LocationDimention, LocationType } from "./location-type-dimention";

export interface LocationFilters {
  name?: string;
  type?: LocationType;
  dimension?: LocationDimention;
  [key: string]: string | undefined;
}