import { describe, expect, it } from 'vitest';

import { parseEpisodeFilters, toEpisodeApiFilters } from './filters';

describe('toEpisodeApiFilters', () => {
  it('joins season and episode into the single "episode" parameter of the API', () => {
    expect(toEpisodeApiFilters({ season: 'S01', episode: 'E03' })).toEqual({
      name: undefined,
      episode: 'S01E03',
    });
  });

  it('works with only one of them', () => {
    expect(toEpisodeApiFilters({ season: 'S02' }).episode).toBe('S02');
    expect(toEpisodeApiFilters({ episode: 'E11' }).episode).toBe('E11');
  });

  it('sends nothing when no episode filter is set and keeps the name', () => {
    expect(toEpisodeApiFilters({ name: 'Pilot' })).toEqual({ name: 'Pilot', episode: undefined });
  });
});

describe('parseEpisodeFilters', () => {
  it('only accepts seasons and episode numbers from the lists', () => {
    expect(parseEpisodeFilters(new URLSearchParams('season=S03&episode=E10'))).toEqual({
      season: 'S03',
      episode: 'E10',
    });
    expect(parseEpisodeFilters(new URLSearchParams('season=S99&episode=E99'))).toEqual({});
  });
});
