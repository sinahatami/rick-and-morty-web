export const SEASON_OPTIONS = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'unknown'] as const;

export const EPISODE_CODE_OPTIONS = [
  'E01',
  'E02',
  'E03',
  'E04',
  'E05',
  'E06',
  'E07',
  'E08',
  'E09',
  'E10',
  'E11',
] as const;

export type EpisodeSeason = (typeof SEASON_OPTIONS)[number];
export type EpisodeCode = (typeof EPISODE_CODE_OPTIONS)[number];
