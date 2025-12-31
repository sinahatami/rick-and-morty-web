import { BaseCard } from '../shared/card/BaseCard';
import { EpisodeHeader } from './sub-components/EpisodeHeader';
import { EpisodeInfo } from './sub-components/EpisodeInfo';
import { EpisodeDetails } from './sub-components/EpisodeDetails';
import { parseEpisodeData } from '~/utils/episode-helper';
import { Episode } from '~/types/api/episode';

export interface EpisodeCardProps {
  episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const parsedData = parseEpisodeData(episode);
  const theme = 'morty';

  return (
    <BaseCard href={`/episodes/${episode.id}`} theme={theme}>
      <EpisodeHeader episode={{ season: parsedData.season }} theme={theme} />

      <EpisodeInfo name={parsedData.name} theme={theme} />

      <EpisodeDetails
        episode={{
          episode: parsedData.episode,
          episodeCode: parsedData.episodeCode,
          airDate: parsedData.airDate,
        }}
        theme={theme}
      />
    </BaseCard>
  );
}
