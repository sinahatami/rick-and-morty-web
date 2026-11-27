import { type Metadata } from 'next';

import { EpisodeList } from '~/features/episodes/components/EpisodeList';
import { dataset, firstPage } from '~/lib/api/dataset';
import { pageMetadata } from '~/lib/metadata';
import { ROUTES } from '~/lib/routes';

export const metadata: Metadata = pageMetadata({
  title: 'Episodes',
  description: 'Browse every Rick and Morty episode with air dates and cast.',
  path: ROUTES.episodes.list,
});

export default async function EpisodesPage() {
  return <EpisodeList initialPage={firstPage(await dataset.episodes())} />;
}
