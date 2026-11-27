/**
 * Characters are green (`portal`), locations blue (`rick`), episodes orange (`morty`).
 * The colors themselves live in `app/globals.css` and are applied with a `data-theme` attribute.
 */
export type Theme = 'portal' | 'rick' | 'morty';

export function getThemeFromPathname(pathname: string): Theme {
  if (pathname.startsWith('/locations')) return 'rick';
  if (pathname.startsWith('/episodes')) return 'morty';
  return 'portal';
}

/** The Citadel of Ricks is rendered with the green character theme instead of the location blue. */
export function getLocationTheme(name: string): Theme {
  const normalized = name.toLowerCase();
  return normalized.includes('citadel') || normalized === 'last known location' ? 'portal' : 'rick';
}
