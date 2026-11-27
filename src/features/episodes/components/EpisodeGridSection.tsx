'use client';

import { Tv } from 'lucide-react';

import { RelatedSection } from '~/components/layout/RelatedSection';
import { api } from '~/lib/api/client';
import { type Episode } from '~/lib/api/types';

import { EpisodeCard } from './EpisodeCard';

interface EpisodeGridSectionProps {
  title: string;
  queryKey: readonly unknown[];
  ids: number[];
  initialItems: Episode[];
}

/** A grid of episodes (the appearances of a character). */
export function EpisodeGridSection(props: EpisodeGridSectionProps) {
  return (
    <RelatedSection
      {...props}
      icon={Tv}
      variant="framed"
      theme="morty"
      fetchByIds={api.episodes.byIds}
      getKey={episode => episode.id}
      renderItem={episode => <EpisodeCard episode={episode} />}
      emptyTitle="No Appearances"
      emptyMessage="This character has not appeared in any episode yet."
    />
  );
}
