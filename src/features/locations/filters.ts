import { createFilterParser } from '~/lib/filters';

const TYPE_OPTIONS = [
  'Planet',
  'Cluster',
  'Space station',
  'Microverse',
  'TV',
  'Resort',
  'Fantasy town',
  'Dream',
  'unknown',
] as const;

const DIMENSION_OPTIONS = [
  'Dimension C-137',
  'Replacement Dimension',
  'Cronenberg Dimension',
  'Fantasy Dimension',
  'Dimension 5-126',
  'Post-Apocalyptic Dimension',
  'unknown',
] as const;

export type LocationFilters = {
  name?: string;
  type?: (typeof TYPE_OPTIONS)[number];
  dimension?: (typeof DIMENSION_OPTIONS)[number];
};

export const LOCATION_FILTER_OPTIONS = {
  type: TYPE_OPTIONS,
  dimension: DIMENSION_OPTIONS,
};

export const parseLocationFilters = createFilterParser<LocationFilters>({
  name: true,
  type: TYPE_OPTIONS,
  dimension: DIMENSION_OPTIONS,
});
