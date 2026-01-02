export const TYPE_OPTIONS = [
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

export const DIMENSION_OPTIONS = [
  'Dimension C-137',
  'Replacement Dimension',
  'Cronenberg Dimension',
  'Fantasy Dimension',
  'Dimension 5-126',
  'Post-Apocalyptic Dimension',
  'unknown',
] as const;

export type LocationType = (typeof TYPE_OPTIONS)[number];
export type LocationDimention = (typeof DIMENSION_OPTIONS)[number];
