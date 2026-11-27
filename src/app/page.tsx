import { type Metadata } from 'next';

import { CharacterList } from '~/features/characters/components/CharacterList';
import { dataset, firstPage } from '~/lib/api/dataset';
import { pageMetadata } from '~/lib/metadata';
import { ROUTES } from '~/lib/routes';

export const metadata: Metadata = pageMetadata({
  title: 'Characters',
  description: 'Explore all characters from the Rick and Morty universe.',
  path: ROUTES.characters.list,
});

export default async function CharactersPage() {
  return <CharacterList initialPage={firstPage(await dataset.characters())} />;
}
