import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CharacterDetail } from '~/features/characters/components/CharacterDetail';
import { dataset } from '~/lib/api/dataset';
import { extractIds } from '~/lib/api/ids';
import { RELATED_BATCH_SIZE } from '~/lib/constants';
import { pageMetadata } from '~/lib/metadata';
import { ROUTES } from '~/lib/routes';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Only the characters that exist are generated; any other id is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await dataset.characters()).map(({ id }) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const character = await dataset.character(Number((await params).id));
  if (!character) return {};

  return pageMetadata({
    title: character.name,
    description: `Explore the biography, location history, and episode appearances of ${character.name} (${character.species}) from Rick and Morty.`,
    path: ROUTES.characters.detail(character.id),
    image: character.image,
  });
}

export default async function CharacterPage({ params }: PageProps) {
  const character = await dataset.character(Number((await params).id));
  if (!character) notFound();

  const episodeIds = extractIds(character.episode);

  return (
    <CharacterDetail
      character={character}
      episodeIds={episodeIds}
      initialEpisodes={await dataset.episodesByIds(episodeIds.slice(0, RELATED_BATCH_SIZE))}
    />
  );
}
