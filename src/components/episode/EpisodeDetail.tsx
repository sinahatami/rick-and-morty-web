import { Users, Calendar, Tv, MonitorPlay } from 'lucide-react';

import { LoadingSpinner } from '../shared/loading/LoadingSpinner';
import { GoBackButton } from '../shared/GoBackButton';
import { StatCard } from '../shared/card/StatCard';
import { CharacterGridSection } from '../shared/CharacterGridSection';
import { DetailCard } from '../shared/card/DetailCard';
import { Badge } from '../shared/badge/Badge';
import { Episode } from '~/types/api/episode';
import { apiClient } from '~/lib/api-client';
import { getThemeStyles } from '~/lib/theme';
import { useEntityDetail } from '~/hooks/useEntityDetail';
import { extractIdFromUrl, formatDate } from '~/utils/string-helper';
import { NotFoundState } from '../shared/state/NotFoundState';
import { SEO } from '../shared/SEO';

interface EpisodeDetailProps {
  id: string;
}

export function EpisodeDetail({ id }: EpisodeDetailProps) {
  // 1. Use custom hook
  const {
    data: episode,
    loading,
    error,
  } = useEntityDetail<Episode>(apiClient.episodes.getById, id, 'Failed to load episode details');

  const theme = 'morty';
  const styles = getThemeStyles(theme);

  const getSeasonInfo = (code: string) => {
    const s = code.match(/S(\d+)/)?.[1] || '?';
    const e = code.match(/E(\d+)/)?.[1] || '?';
    return { season: s, episode: e };
  };

  if (loading) {
    return <LoadingSpinner message="Retrieving archival footage..." />;
  }

  if (error || !episode) {
    return (
      <NotFoundState title="Episode Data Corrupted" backLabel="Return to Database" theme={theme} />
    );
  }

  const { season, episode: epNum } = getSeasonInfo(episode.episode);

  // 2. Use shared helper for IDs
  const characterIds = episode.characters
    .map(extractIdFromUrl)
    .filter((id): id is number => id !== null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEO
        title={`${episode.name} - ${episode.episode}`}
        description={`Details, cast, and air date for ${episode.name} (${episode.episode}), a Rick and Morty episode.`}
      />
      <GoBackButton />

      {/* Header Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative group">
        <DetailCard theme={theme}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            {/* Title Section */}
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <Badge label={`Season ${season}`} icon={Tv} theme={theme} />
                <Badge
                  label={`Episode ${epNum}`}
                  theme={theme}
                  className="bg-gray-50 border-gray-200 text-gray-500"
                />
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-[#0B1E2D] tracking-tight leading-tight">
                {episode.name}
              </h1>
            </div>

            {/* Prod Code Box */}
            <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl flex flex-col items-center justify-center shadow-xl min-w-[140px]">
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                Prod. Code
              </span>
              <div className="flex items-center gap-2" style={{ color: styles.primary }}>
                <MonitorPlay className="w-5 h-5" />
                <span className="text-2xl font-black tracking-tight">{episode.episode}</span>
              </div>
            </div>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StatCard
              icon={Calendar}
              label="Air Date"
              // 3. Use shared date formatter
              value={formatDate(episode.air_date)}
              theme={theme}
            />
            <StatCard
              icon={Users}
              label="Total Cast"
              value={`${characterIds.length} Characters`}
              theme={theme}
            />
          </div>
        </DetailCard>
      </div>

      <CharacterGridSection
        title="Featured Cast"
        characterIds={characterIds}
        icon={Users}
        emptyTitle="No Cast Data"
        emptyMessage="The Galactic Federation has restricted access to the cast list for this timeline."
        theme={theme}
      />
    </div>
  );
}
