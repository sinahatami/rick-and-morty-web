import { Episode } from '~/types/api';
import { Calendar, Users, Tv, Play } from 'lucide-react';
import { BaseCard } from './shared/BaseCard';
import { CardInfoRow } from './shared/CardInfoRow';

interface EpisodeCardProps {
  episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  // Extract season and episode numbers
  const seasonMatch = episode.episode.match(/S(\d+)/);
  const episodeMatch = episode.episode.match(/E(\d+)/);
  const season = seasonMatch ? seasonMatch[1] : '?';
  const episodeNum = episodeMatch ? episodeMatch[1] : '?';

  const charactersCount = episode.characters.length;
  const charactersText =
    charactersCount === 0
      ? 'No characters'
      : charactersCount === 1
        ? '1 character'
        : `${charactersCount} characters`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <BaseCard
      href={`/episodes/${episode.id}`}
      theme="episode"
      className="hover:ring-4 hover:ring-sky-500/10" // Custom ring color for episodes
    >
      {/* Header */}
      <div className="p-6 pb-4 relative">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-sky-50 rounded-xl group-hover:bg-sky-100 transition-colors">
            <Tv className="h-7 w-7 text-sky-500 group-hover:scale-110 transition-transform" />
          </div>

          <div className="flex flex-col items-end py-2">
            <div className="px-3 py-1.5 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-full shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider">
                S{season}E{episodeNum}
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-black text-gray-900 line-clamp-2 group-hover:text-sky-600 transition-colors duration-300 mb-3">
          {episode.name}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span className="font-medium">{formatDate(episode.air_date)}</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-6 pt-2 space-y-4">
        <CardInfoRow icon={Play} label="Episode Code" value={episode.episode} />
        <CardInfoRow icon={Users} label="Characters" value={charactersText} />
      </div>
    </BaseCard>
  );
}
