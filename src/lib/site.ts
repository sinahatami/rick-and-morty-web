const DEFAULT_SITE_URL = 'https://sinahatami.github.io/rick-and-morty-web';

export const siteConfig = {
  name: 'Rick and Morty Explorer',
  description:
    'The ultimate encyclopedia for Rick and Morty characters, episodes and locations. Search, filter and explore the whole multiverse.',
  /** Public URL of the deployed site, including the GitHub Pages sub-path, without a trailing slash. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/$/, ''),
  author: {
    name: 'Sina Hatami',
    github: 'https://github.com/sinahatami/',
    linkedin: 'https://www.linkedin.com/in/sina-hatami/',
  },
  apiUrl: 'https://rickandmortyapi.com/',
} as const;

/** Absolute public URL for a site path, e.g. `absoluteUrl('/locations/')`. */
export function absoluteUrl(path = '/'): string {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}
