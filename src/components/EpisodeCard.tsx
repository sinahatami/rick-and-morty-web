import { Episode } from '~/types/api';
import { Calendar, Users, Tv, Play, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface EpisodeCardProps {
  episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  // Extract season and episode numbers
  const seasonMatch = episode.episode.match(/S(\d+)/);
  const episodeMatch = episode.episode.match(/E(\d+)/);
  const season = seasonMatch ? seasonMatch[1] : '?';
  const episodeNum = episodeMatch ? episodeMatch[1] : '?';

  // Format characters count
  const charactersCount = episode.characters.length;
  const charactersText =
    charactersCount === 0
      ? 'No characters'
      : charactersCount === 1
        ? '1 character'
        : `${charactersCount} characters`;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Link href={`/episodes/${episode.id}`}>
      <div
        className="group bg-white rounded-xl overflow-hidden border border-gray-100 
                   transition-all duration-300 ease-in-out cursor-pointer
                   shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)]
                   hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.12),0_4px_6px_-4px_rgba(0,0,0,0.05)]
                   hover:-translate-y-1.5 hover:border-purple-500/20"
      >
        {/* Header with season/episode badge */}
        <div className="p-6 pb-4 relative">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-colors">
              <Tv className="h-7 w-7 text-purple-600 group-hover:scale-110 transition-transform" />
            </div>

            <div className="flex flex-col items-end">
              <div className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full">
                <span className="text-xs font-bold uppercase tracking-wider">
                  S{season}E{episodeNum}
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-black text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300 mb-3">
            {episode.name}
          </h3>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">{formatDate(episode.air_date)}</span>
          </div>
        </div>

        {/* Details */}
        <div className="px-6 pb-6 space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 group-hover:bg-gray-100 rounded-xl transition-colors">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Episode</span>
            </div>
            <span className="text-gray-900 font-bold">{episode.episode}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 group-hover:bg-gray-100 rounded-xl transition-colors">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Characters</span>
            </div>
            <span className="text-gray-900 font-bold">{charactersText}</span>
          </div>
        </div>

        {/* View Details Link */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="group/link inline-flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-purple-600 hover:text-white rounded-xl transition-all duration-300">
            <span className="font-bold text-sm">View Episode Details</span>
            <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
