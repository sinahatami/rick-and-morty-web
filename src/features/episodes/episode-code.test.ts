import { describe, expect, it } from 'vitest';

import { parseEpisodeCode } from './episode-code';

describe('parseEpisodeCode', () => {
  it('splits a production code into season and episode', () => {
    expect(parseEpisodeCode('S02E05')).toEqual({ season: '02', episode: '05' });
  });

  it('falls back to "?" for codes it cannot read', () => {
    expect(parseEpisodeCode('')).toEqual({ season: '?', episode: '?' });
    expect(parseEpisodeCode('Pilot')).toEqual({ season: '?', episode: '?' });
  });
});
