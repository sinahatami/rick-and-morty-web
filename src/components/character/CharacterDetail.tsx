import { apiClient } from '~/lib/api-client';
import { Character } from '~/types';

import { GoBackButton } from '../shared/GoBackButton';
import { LoadingSpinner } from '../shared/loading/LoadingSpinner';
import { CharacterIdentityCard } from './components/CharacterIdentityCard';
import { useEntityDetail } from '~/hooks/useEntityDetail';
import { extractIdFromUrl } from '~/utils/string-helper';
import { NotFoundState } from '../shared/state/NotFoundState';
import { CharacterBiometrics } from './components/CharacterBiometrics';
import { CharacterLocationHistory } from './components/CharacterLocationHistory';
import { EpisodeGridSection } from '../episode/components/EpisodeGridSection';
import { SEO } from '../shared/SEO';

export interface CharacterDetailProps {
  id: string;
}

export function CharacterDetail({ id }: CharacterDetailProps) {
  const {
    data: character,
    loading,
    error,
  } = useEntityDetail<Character>(
    apiClient.characters.getById,
    id,
    'Failed to load character details'
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner message="Accessing Galactic Federation Database..." />
      </div>
    );
  }

  if (error || !character) {
    return (
      <NotFoundState
        title="Subject Not Found"
        message="The character you are looking for does not exist in this central finite curve."
        theme="portal"
      />
    );
  }

  const episodeIds = character.episode
    .map(extractIdFromUrl)
    .filter((id): id is number => id !== null)
    .map(String);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-500">
      <SEO
        title={`${character.name}`}
        description={`Explore the biography, location history, and episode appearances of ${character.name} (${character.species}) from Rick and Morty.`}
        image={character.image}
      />

      <GoBackButton />

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
        <CharacterIdentityCard character={character} />

        <div className="space-y-8">
          <CharacterBiometrics character={character} />

          <CharacterLocationHistory origin={character.origin} location={character.location} />

          <EpisodeGridSection title="Episode Appearances" episodeIds={episodeIds} />
        </div>
      </div>
    </div>
  );
}
