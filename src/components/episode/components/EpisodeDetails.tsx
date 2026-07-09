import { Hash, Calendar } from 'lucide-react';

import { CardInfoRow } from '../../shared/card/CardInfoRow';
import { EpisodeDetailsProps } from '~/types';

export function EpisodeDetails({ episode, theme }: EpisodeDetailsProps) {
  const { episode: episodeNum, episodeCode, airDate } = episode;
  const hoverColor = theme === 'morty' ? 'group-hover:bg-[#FF9800]/20' : '';

  return (
    <>
      <div className={`h-px bg-gray-100 w-full mb-4 ${hoverColor} transition-colors`} />

      <div className="mt-auto space-y-2 z-10">
        <CardInfoRow icon={Hash} label="Episode" value={`Ep. ${episodeNum} (${episodeCode})`} />
        <CardInfoRow icon={Calendar} label="Air Date" value={airDate} />
      </div>
    </>
  );
}
