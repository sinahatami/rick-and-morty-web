import { createFilterParser } from '~/lib/filters';

const SEASON_OPTIONS = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'unknown'] as const;
const EPISODE_CODE_OPTIONS = [
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

export type EpisodeFilters = {
  name?: string;
  season?: (typeof SEASON_OPTIONS)[number];
  episode?: (typeof EPISODE_CODE_OPTIONS)[number];
};

export const EPISODE_FILTER_OPTIONS = {
  season: SEASON_OPTIONS,
  episode: EPISODE_CODE_OPTIONS,
};

export const parseEpisodeFilters = createFilterParser<EpisodeFilters>({
  name: true,
  season: SEASON_OPTIONS,
  episode: EPISODE_CODE_OPTIONS,
});

/** The API has a single `episode` filter ("S01", "E03" or "S01E03"): season and number are joined. */
export function toEpisodeApiFilters({ name, season, episode }: EpisodeFilters) {
  return { name, episode: `${season ?? ''}${episode ?? ''}` || undefined };
}
