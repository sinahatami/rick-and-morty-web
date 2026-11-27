import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { EpisodeDetail } from '~/features/episodes/components/EpisodeDetail';
import { dataset } from '~/lib/api/dataset';
import { extractIds } from '~/lib/api/ids';
import { RELATED_BATCH_SIZE } from '~/lib/constants';
import { pageMetadata } from '~/lib/metadata';
import { ROUTES } from '~/lib/routes';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await dataset.episodes()).map(({ id }) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const episode = await dataset.episode(Number((await params).id));
  if (!episode) return {};

  return pageMetadata({
    title: `${episode.name} - ${episode.episode}`,
    description: `Details, cast, and air date for ${episode.name} (${episode.episode}), a Rick and Morty episode.`,
    path: ROUTES.episodes.detail(episode.id),
  });
}

export default async function EpisodePage({ params }: PageProps) {
  const episode = await dataset.episode(Number((await params).id));
  if (!episode) notFound();

  const characterIds = extractIds(episode.characters);

  return (
    <EpisodeDetail
      episode={episode}
      characterIds={characterIds}
      initialCast={await dataset.charactersByIds(characterIds.slice(0, RELATED_BATCH_SIZE))}
    />
  );
}
