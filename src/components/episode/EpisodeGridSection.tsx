import { useState, useEffect } from 'react';
import { Film } from 'lucide-react';

import { EpisodeCard } from './EpisodeCard';
import { LoadMoreButton } from '../shared/LoadMoreButton';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { Episode } from '~/types/api/episode';
import { EpisodeGridSectionProps } from '~/types/episode/episode-grid-section';
import { apiClient } from '~/lib/api-client';
import { getThemeStyles } from '~/lib/theme';

const EPISODES_PER_BATCH = 9;

export function EpisodeGridSection({
  title,
  episodeIds,
  icon: Icon = Film,
}: EpisodeGridSectionProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 1. Get Theme Styles (Episode = Orange)
  const theme = 'episode';
  const styles = getThemeStyles(theme);

  // 2. Fix Infinite Loop: Stable dependency key
  const idsFingerprint = JSON.stringify(episodeIds);

  useEffect(() => {
    let isMounted = true;
    // Parse back to array
    const currentIds = JSON.parse(idsFingerprint);

    const fetchInitial = async () => {
      if (currentIds.length === 0) {
        if (isMounted) setIsLoadingInitial(false);
        return;
      }

      try {
        if (isMounted) setIsLoadingInitial(true);
        const firstBatchIds = currentIds.slice(0, EPISODES_PER_BATCH);

        // Fetch each episode by id (apiClient.episodes.getById expects a single string)
        const data = await Promise.all(
          firstBatchIds.map((id: string) => apiClient.episodes.getById(id))
        );

        if (isMounted) setEpisodes(data);
      } catch (error) {
        console.error('Error fetching initial episodes:', error);
      } finally {
        if (isMounted) setIsLoadingInitial(false);
      }
    };

    fetchInitial();

    return () => {
      isMounted = false;
    };
  }, [idsFingerprint]);

  const handleLoadMore = async () => {
    if (isLoadingMore) return;

    try {
      setIsLoadingMore(true);
      const currentCount = episodes.length;
      const nextBatchIds = episodeIds.slice(currentCount, currentCount + EPISODES_PER_BATCH);

      if (nextBatchIds.length > 0) {
        const newData = await Promise.all(
          nextBatchIds.map((id: string) => apiClient.episodes.getById(id))
        );
        setEpisodes(prev => [...prev, ...newData]);
      }
    } catch (error) {
      console.error('Error loading more episodes:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const hasMore = episodes.length < episodeIds.length;

  if (isLoadingInitial) {
    return (
      <div className="py-8">
        <LoadingSpinner message="Loading episodes..." />
      </div>
    );
  }

  if (episodeIds.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <h2 className="flex items-center gap-3 text-lg font-black text-gray-900 uppercase tracking-wide mb-6">
        {/* 3. Use Theme Styles for Icon */}
        <span className={`p-2 rounded-lg ${styles.lightBg}`} style={{ color: styles.primary }}>
          <Icon className="h-5 w-5" />
        </span>
        {title}
        <span className="ml-auto shrink-0 whitespace-nowrap text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
          {episodeIds.length} Total
        </span>
      </h2>

      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {episodes.map(episode => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>

        {hasMore && (
          <div className="pt-4 border-t border-gray-100 flex justify-center">
            <LoadMoreButton
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              isFetchingNextPage={isLoadingMore}
              theme={theme}
            />
          </div>
        )}
      </div>
    </div>
  );
}
