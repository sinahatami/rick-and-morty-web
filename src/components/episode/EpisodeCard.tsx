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
    <BaseCard href={`/episodes/${episode.id}`} theme={theme} className="group flex flex-col">
      {/* 1. Decorative Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9800] via-[#FFB74D] to-[#FF9800] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* 2. Top Section (Header + Info) */}
      <div className="pt-6 px-6">
        <EpisodeHeader episode={{ season: parsedData.season }} theme={theme} />
      </div>

      {/* Info component now has its own px-6 inside */}
      <EpisodeInfo name={parsedData.name} theme={theme} />

      <div className="p-6 pt-4 flex flex-col flex-grow">
        <EpisodeDetails
          episode={{
            episode: parsedData.episode,
            episodeCode: parsedData.episodeCode,
            airDate: parsedData.airDate,
          }}
          theme={theme}
        />
      </div>
    </BaseCard>
  );
}
