import { describe, expect, it } from 'vitest';

import { extractIdFromUrl, extractIds } from './ids';

describe('extractIdFromUrl', () => {
  it('reads the id at the end of a resource URL', () => {
    expect(extractIdFromUrl('https://rickandmortyapi.com/api/episode/12')).toBe(12);
  });

  it('tolerates a trailing slash', () => {
    expect(extractIdFromUrl('https://rickandmortyapi.com/api/location/3/')).toBe(3);
  });

  it('returns null for missing or malformed input', () => {
    expect(extractIdFromUrl(undefined)).toBeNull();
    expect(extractIdFromUrl('')).toBeNull();
    expect(extractIdFromUrl('https://rickandmortyapi.com/api/location/')).toBeNull();
  });
});

describe('extractIds', () => {
  it('maps every URL and drops the ones without an id', () => {
    expect(
      extractIds([
        'https://rickandmortyapi.com/api/character/1',
        'https://rickandmortyapi.com/api/character/oops',
        'https://rickandmortyapi.com/api/character/42',
      ]),
    ).toEqual([1, 42]);
  });
});
