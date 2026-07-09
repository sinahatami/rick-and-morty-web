import { formatDate, extractIdFromUrl, parseEpisodeCode } from './string-helper';

describe('string-helper', () => {
  describe('formatDate', () => {
    it('formats a valid date string correctly', () => {
      // 2017-11-04T18:48:46.250Z
      const date = new Date('2017-11-04T18:48:46.250Z').toISOString();
      expect(formatDate(date)).toMatch(/Nov 4, 2017/);
    });

    it('returns "Unknown Date" if dateString is undefined', () => {
      expect(formatDate(undefined)).toBe('Unknown Date');
    });

    it('returns "Unknown Date" if dateString is empty string', () => {
      expect(formatDate('')).toBe('Unknown Date');
    });
  });

  describe('extractIdFromUrl', () => {
    it('extracts ID from a valid URL', () => {
      expect(extractIdFromUrl('https://rickandmortyapi.com/api/character/1')).toBe(1);
      expect(extractIdFromUrl('https://rickandmortyapi.com/api/location/123')).toBe(123);
    });

    it('returns null for an invalid URL', () => {
      expect(extractIdFromUrl('https://rickandmortyapi.com/api/character/abc')).toBe(null);
    });

    it('returns null if url is undefined', () => {
      expect(extractIdFromUrl(undefined)).toBe(null);
    });

    it('handles URLs with trailing slashes', () => {
      expect(extractIdFromUrl('https://rickandmortyapi.com/api/character/42/')).toBe(42);
    });
  });

  describe('parseEpisodeCode', () => {
    it('parses a valid episode code', () => {
      expect(parseEpisodeCode('S01E01')).toEqual({ season: '01', episode: '01' });
      expect(parseEpisodeCode('S12E34')).toEqual({ season: '12', episode: '34' });
    });

    it('returns ? for missing components', () => {
      expect(parseEpisodeCode('S01')).toEqual({ season: '01', episode: '?' });
      expect(parseEpisodeCode('E02')).toEqual({ season: '?', episode: '02' });
    });

    it('returns ? for undefined or empty input', () => {
      expect(parseEpisodeCode('')).toEqual({ season: '?', episode: '?' });
    });
  });
});
