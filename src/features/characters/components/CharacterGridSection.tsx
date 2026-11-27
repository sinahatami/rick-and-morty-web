'use client';

import { Users } from 'lucide-react';

import { RelatedSection } from '~/components/layout/RelatedSection';
import { api } from '~/lib/api/client';
import { type Character } from '~/lib/api/types';

import { CharacterCard } from './CharacterCard';

interface CharacterGridSectionProps {
  title: string;
  queryKey: readonly unknown[];
  ids: number[];
  initialItems: Character[];
  emptyTitle?: string;
  emptyMessage?: string;
}

/** A grid of characters (the cast of an episode, the residents of a place). */
export function CharacterGridSection({
  emptyTitle = 'No Data Found',
  emptyMessage = 'No characters found for this entry.',
  ...props
}: CharacterGridSectionProps) {
  return (
    <RelatedSection
      {...props}
      icon={Users}
      fetchByIds={api.characters.byIds}
      getKey={character => character.id}
      // The first row sits right below the page header, so its images are preloaded.
      renderItem={(character, index) => (
        <CharacterCard character={character} priority={index < 4} />
      )}
      emptyTitle={emptyTitle}
      emptyMessage={emptyMessage}
    />
  );
}
