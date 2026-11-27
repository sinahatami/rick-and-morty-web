import { type MetadataRoute } from 'next';

import { dataset } from '~/lib/api/dataset';
import { ROUTES } from '~/lib/routes';
import { absoluteUrl } from '~/lib/site';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [characters, locations, episodes] = await Promise.all([
    dataset.characters(),
    dataset.locations(),
    dataset.episodes(),
  ]);

  const paths = [
    ROUTES.characters.list,
    ROUTES.locations.list,
    ROUTES.episodes.list,
    ...characters.map(({ id }) => ROUTES.characters.detail(id)),
    ...locations.map(({ id }) => ROUTES.locations.detail(id)),
    ...episodes.map(({ id }) => ROUTES.episodes.detail(id)),
  ];

  return paths.map(path => ({ url: absoluteUrl(path) }));
}
