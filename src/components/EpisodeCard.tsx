import { Episode } from '~/types/api';
import { Calendar, Hash, MonitorPlay } from 'lucide-react';
import { BaseCard } from './shared/BaseCard';
import { CardInfoRow } from './shared/CardInfoRow';

interface EpisodeCardProps {
  episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  // Extract season and episode numbers (e.g., S01E01)
  const seasonMatch = episode.episode.match(/S(\d+)/);
  const episodeMatch = episode.episode.match(/E(\d+)/);
  const season = seasonMatch ? seasonMatch[1] : '?';
  const episodeNum = episodeMatch ? episodeMatch[1] : '?';

  // Format date nicely
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <BaseCard href={`/episodes/${episode.id}`} theme="episode">
      <div className="p-5 flex flex-col h-full bg-white relative overflow-hidden group">
        {/* Decorative Background Icon */}
        <div className="absolute -top-2 -right-2 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 rotate-12">
          <MonitorPlay className="h-24 w-24 text-[#FF9800]" />
        </div>

        {/* Header: Icon & Code */}
        <div className="flex items-start justify-between mb-4 z-10">
          <div className="p-2.5 bg-orange-50 rounded-xl border border-orange-100 group-hover:border-orange-200 group-hover:bg-[#FF9800] group-hover:text-white transition-all duration-300">
            <MonitorPlay className="h-6 w-6 text-[#FF9800] group-hover:text-white transition-colors" />
          </div>

          <div className="flex flex-col items-end">
            <span className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:border-[#FF9800]/30 group-hover:text-[#FF9800] transition-colors">
              Season {season}
            </span>
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
