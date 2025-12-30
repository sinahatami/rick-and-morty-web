import { useState, useEffect } from 'react';
import { Film } from 'lucide-react';
import { Episode } from '~/types/api';
import { apiClient } from '~/lib/api-client';
import { EpisodeCard } from './EpisodeCard';
import { LoadMoreButton } from '../shared/LoadMoreButton';
import { LoadingSpinner } from '../shared/LoadingSpinner';

interface EpisodeGridSectionProps {
  title: string;
  episodeIds: string[];
  icon?: any;
}

const EPISODES_PER_BATCH = 9;

export function EpisodeGridSection({
  title,
  episodeIds,
  icon: Icon = Film,
}: EpisodeGridSectionProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 1. Initial Fetch
  useEffect(() => {
    let isMounted = true;

    const fetchInitial = async () => {
      if (episodeIds.length === 0) {
        setIsLoadingInitial(false);
        return;
      }

      try {
        setIsLoadingInitial(true);
        // Fetch first batch
        const firstBatchIds = episodeIds.slice(0, EPISODES_PER_BATCH);

        // Ensure your API client handles array of IDs correctly
        const data = await apiClient.episodes.getById(firstBatchIds as any);
        const normalized = Array.isArray(data) ? data : [data];

        if (isMounted) {
          setEpisodes(normalized);
        }
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
  }, [episodeIds]);

  // 2. Load More Handler
  const handleLoadMore = async () => {
    if (isLoadingMore) return;

    try {
      setIsLoadingMore(true);
      const currentCount = episodes.length;
      const nextBatchIds = episodeIds.slice(currentCount, currentCount + EPISODES_PER_BATCH);

      if (nextBatchIds.length > 0) {
        const newData = await apiClient.episodes.getById(nextBatchIds as any);
        const normalizedNew = Array.isArray(newData) ? newData : [newData];

        setEpisodes(prev => [...prev, ...normalizedNew]);
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
        <span className="p-2 bg-orange-50 text-orange-500 rounded-lg">
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
            />
          </div>
        )}
      </div>
    </div>
  );
}
