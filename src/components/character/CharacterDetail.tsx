import { apiClient } from '~/lib/api-client';
import { Character } from '~/types';

import { GoBackButton } from '../shared/GoBackButton';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { NotFoundState } from '../shared/NotFoundState';
import { EpisodeGridSection } from '../episode/EpisodeGridSection';
import { CharacterIdentityCard } from './CharacterIdentityCard';
import { CharacterBiometrics } from './CharacterBiometrics';
import { CharacterLocationHistory } from './CharacterLocationHistory';
import { useEntityDetail } from '~/hooks/useEntityDetail';
import { extractIdFromUrl } from '~/utils/helper';

export interface CharacterDetailProps {
  id: string;
}

export function CharacterDetail({ id }: CharacterDetailProps) {
  // 1. Use the custom hook for fetching
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
    return <LoadingSpinner message="Accessing Galactic Federation Database..." />;
  }

  if (error || !character) {
    return (
      <NotFoundState
        title="Subject Not Found"
        message="The character you are looking for does not exist in this central finite curve."
        theme="character"
      />
    );
  }

  // 2. Use the shared helper for ID extraction
  const episodeIds = character.episode
    .map(extractIdFromUrl)
    .filter((id): id is number => id !== null)
    .map(String); // EpisodeGridSection expects strings based on previous code

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-500">
      <GoBackButton />

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
        {/* --- LEFT COLUMN --- */}
        <CharacterIdentityCard character={character} />

        {/* --- RIGHT COLUMN --- */}
        <div className="space-y-8">
          <CharacterBiometrics character={character} />

          <CharacterLocationHistory origin={character.origin} location={character.location} />

          <EpisodeGridSection title="Episode Appearances" episodeIds={episodeIds} />
        </div>
      </div>
    </div>
  );
}
