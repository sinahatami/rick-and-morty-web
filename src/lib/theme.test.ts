import { describe, expect, it } from 'vitest';

import { getLocationTheme, getThemeFromPathname } from './theme';

describe('getThemeFromPathname', () => {
  it.each([
    ['/', 'portal'],
    ['/characters/1/', 'portal'],
    ['/locations/', 'rick'],
    ['/locations/3/', 'rick'],
    ['/episodes/', 'morty'],
    ['/episodes/11/', 'morty'],
    ['/something-else/', 'portal'],
  ])('%s -> %s', (pathname, theme) => {
    expect(getThemeFromPathname(pathname)).toBe(theme);
  });
});

describe('getLocationTheme', () => {
  it('uses the character green for the Citadel', () => {
    expect(getLocationTheme('Citadel of Ricks')).toBe('portal');
    expect(getLocationTheme('Last Known Location')).toBe('portal');
  });

  it('uses the location blue for everything else', () => {
    expect(getLocationTheme('Earth (C-137)')).toBe('rick');
    expect(getLocationTheme('unknown')).toBe('rick');
  });
});
