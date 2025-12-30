import { useState, useEffect } from 'react';
import { Users, Calendar, Tv, MonitorPlay } from 'lucide-react';

import { LoadingSpinner } from '../shared/LoadingSpinner';
import { GoBackButton } from '../shared/GoBackButton';
import { StatCard } from '../shared/card/StatCard';
import { CharacterGridSection } from '../shared/CharacterGridSection';
import { DetailCard } from '../shared/card/DetailCard';
import { NotFoundState } from '../shared/NotFoundState';
import { Episode } from '~/types/api/episode';
import { apiClient } from '~/lib/api-client';

export interface EpisodeDetailProps {
  id: string;
}

export function EpisodeDetail({ id }: EpisodeDetailProps) {
  // --- Data States ---
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Initial Fetch ---
  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      try {
        setLoading(true);
        const episodeData = await apiClient.episodes.getById(id);

        if (isMounted) {
          setEpisode(episodeData);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load episode details');
          console.error(err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    init();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // --- Helpers ---
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown Date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getSeasonInfo = (code: string) => {
    const s = code.match(/S(\d+)/)?.[1] || '?';
    const e = code.match(/E(\d+)/)?.[1] || '?';
    return { season: s, episode: e };
  };

  // --- Render ---

  if (loading) {
    return <LoadingSpinner message="Retrieving archival footage..." />;
  }

  if (error || !episode) {
    return <NotFoundState title="Episode Data Corrupted" backLabel="Return to Database" />;
  }

  const { season, episode: epNum } = getSeasonInfo(episode.episode);

  // Extract Character IDs from URLs for the Grid Section
  const characterIds = episode.characters
    .map(url => {
      const parts = url.split('/');
      return parseInt(parts[parts.length - 1]);
    })
    .filter(id => !isNaN(id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <GoBackButton />

      {/* Hero / Header Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative group">
        {/* Decorative Top Bar (Orange/Yellow for Episodes) */}

        <DetailCard theme="episode">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            {/* Title Section */}
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-orange-50 border border-orange-100 text-[#FF9800] text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <Tv className="w-3 h-3" />
                  Season {season}
                </span>
                <span className="px-3 py-1 rounded-lg bg-gray-50 border border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-widest">
                  Episode {epNum}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-[#0B1E2D] tracking-tight leading-tight">
                {episode.name}
              </h1>
            </div>

            {/* Episode Code Badge */}
            <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl flex flex-col items-center justify-center shadow-xl shadow-orange-500/10 min-w-[140px]">
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                Prod. Code
              </span>
              <div className="flex items-center gap-2 text-[#FF9800]">
                <MonitorPlay className="w-5 h-5" />
                <span className="text-2xl font-black tracking-tight">{episode.episode}</span>
              </div>
            </div>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* Metadata Grid using StatCard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StatCard
              icon={Calendar}
              label="Air Date"
              value={formatDate(episode.air_date)}
              theme="episode"
            />

            <StatCard
              icon={Users}
              label="Total Cast"
              value={`${characterIds.length} Characters`}
              theme="episode"
            />
          </div>
        </DetailCard>
      </div>

      {/* Cast Section - Data fetching delegated to this component */}
      <CharacterGridSection
        title="Featured Cast"
        characterIds={characterIds}
        icon={Users}
        emptyTitle="No Cast Data"
        emptyMessage="The Galactic Federation has restricted access to the cast list for this timeline."
      />
    </div>
  );
}
