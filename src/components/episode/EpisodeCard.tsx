import { Episode } from '~/types/api';
import { Calendar, Hash, MonitorPlay } from 'lucide-react';
import { BaseCard } from '../shared/BaseCard';
import { CardInfoRow } from '../shared/CardInfoRow';
import { CardIcon } from '../shared/CardIcon';
import { Badge } from '../shared/Badge';
import { formatDate, parseEpisodeCode } from '~/utils/formatters';

interface EpisodeCardProps {
  episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const { season, episode: episodeNum } = parseEpisodeCode(episode.episode);

  return (
    <BaseCard href={`/episodes/${episode.id}`} theme="episode">
      <div className="p-5 flex flex-col h-full bg-white relative overflow-hidden group">
        {/* Decorative Background Icon */}
        <div className="absolute -top-2 -right-2 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 rotate-12">
          <MonitorPlay className="h-24 w-24 text-[#FF9800]" />
        </div>

        {/* Header: Icon & Code */}
        <div className="flex items-start justify-between mb-4 z-10">
          <CardIcon icon={MonitorPlay} theme="episode" />

          <div className="flex flex-col items-end">
            <Badge
              label={`Season ${season}`}
              className="group-hover:border-[#FF9800]/30 group-hover:text-[#FF9800]"
            />
          </div>
        </div>

        {/* Title */}
        <div className="mb-4 z-10">
          <h3
            className="text-lg font-black text-gray-900 leading-tight group-hover:text-[#FF9800] transition-colors duration-200 line-clamp-2 min-h-[3rem]"
            title={episode.name}
          >
            {episode.name}
          </h3>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 w-full mb-4 group-hover:bg-[#FF9800]/20 transition-colors" />

        {/* Details */}
        <div className="mt-auto space-y-2 z-10">
          <CardInfoRow
            icon={Hash}
            label="Episode"
            value={`Ep. ${episodeNum} (${episode.episode})`}
          />
          <CardInfoRow icon={Calendar} label="Air Date" value={formatDate(episode.air_date)} />
        </div>
      </div>
    </BaseCard>
  );
}
