import { type Character, type Episode } from '~/lib/api/types';
import { GoBackButton } from '~/components/controls/GoBackButton';
import { EpisodeGridSection } from '~/features/episodes/components/EpisodeGridSection';
import { ROUTES } from '~/lib/routes';

import { CharacterBiometrics } from './CharacterBiometrics';
import { CharacterIdentityCard } from './CharacterIdentityCard';
import { CharacterLocationHistory } from './CharacterLocationHistory';

interface CharacterDetailProps {
  character: Character;
  episodeIds: number[];
  /** The first episodes, resolved while the site is built. */
  initialEpisodes: Episode[];
}

export function CharacterDetail({ character, episodeIds, initialEpisodes }: CharacterDetailProps) {
  return (
    <div className="mx-auto max-w-7xl animate-in space-y-8 px-4 py-8 duration-500 fade-in sm:px-6 lg:px-8">
      <GoBackButton fallbackHref={ROUTES.characters.list} />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[380px_1fr]">
        <CharacterIdentityCard character={character} />

        <div className="space-y-8">
          <CharacterBiometrics character={character} />
          <CharacterLocationHistory origin={character.origin} location={character.location} />
          <EpisodeGridSection
            title="Episode Appearances"
            queryKey={['character', character.id, 'episodes']}
            ids={episodeIds}
            initialItems={initialEpisodes}
          />
        </div>
      </div>
    </div>
  );
}
