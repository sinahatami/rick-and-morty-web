import { useRouter } from 'next/router';
import { useMemo, useCallback } from 'react';

import { BaseCard } from '../shared/card/BaseCard';
import { CharacterImage } from './components/CharacterImage';
import { CharacterInfo } from './components/CharacterInfo';
import { CharacterLocations } from './components/CharacterLocations';
import { CharacterCardProps } from '~/types';

export function CharacterCard({ character, priority }: CharacterCardProps) {
  const router = useRouter();

  // Memoize the click handler
  const handleLocationClick = useCallback(
    (url: string) => {
      if (!url) return;
      const id = url.split('/').filter(Boolean).pop();
      if (id) {
        router.push(`/locations/${id}`);
      }
    },
    [router]
  );

  // Memoize the location props
  const locationProps = useMemo(
    () => ({
      origin: character.origin,
      location: character.location,
      onLocationClick: handleLocationClick,
    }),
    [character.origin, character.location, handleLocationClick]
  );

  return (
    <BaseCard href={`/characters/${character.id}`} theme="portal">
      <CharacterImage
        image={character.image}
        name={character.name}
        status={character.status}
        priority={priority}
      />

      <div className="p-5 flex flex-col bg-white">
        <CharacterInfo
          name={character.name}
          species={character.species}
          gender={character.gender}
        />

        <div className="h-px bg-gray-100 w-full mb-4 group-hover:bg-[#2E7D32]/30 transition-colors" />

        <CharacterLocations {...locationProps} />
      </div>
    </BaseCard>
  );
}
