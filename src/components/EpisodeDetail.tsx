import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Users, Calendar, Tv, MonitorPlay, AlertCircle } from 'lucide-react';
import { Episode, Character } from '~/types/api';
import { apiClient } from '~/lib/api-client';

import { GoBackButton } from './shared/GoBackButton';
import { LoadingSpinner } from './shared/LoadingSpinner';
import { CharacterGridSection } from './shared/CharacterGridSection';

interface EpisodeDetailProps {
  id: string;
}

const CAST_PER_PAGE = 12;

export function EpisodeDetail({ id }: EpisodeDetailProps) {
  const router = useRouter();

  // --- Data States ---
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [allCharacterIds, setAllCharacterIds] = useState<number[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);

  const characterIds =
    episode?.characters.map(url => parseInt(url.split('/').pop() || '')).filter(n => !isNaN(n)) ||
    [];

  // --- Loading States ---
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Initial Fetch ---
  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      try {
        setIsLoadingInitial(true);
        const episodeData = await apiClient.episodes.getById(id);

        if (!isMounted) return;
        setEpisode(episodeData);

        // Parse IDs from URLs
        const ids = episodeData.characters
          .map(url => {
            const parts = url.split('/');
            return parseInt(parts[parts.length - 1]);
          })
          .filter(id => !isNaN(id));

        setAllCharacterIds(ids);

        // Fetch first batch
        if (ids.length > 0) {
          const firstBatchIds = ids.slice(0, CAST_PER_PAGE);
          const initialCharacters = await apiClient.characters.getMultiple(firstBatchIds);

          const normalizedData = (
            Array.isArray(initialCharacters) ? initialCharacters : [initialCharacters]
          ) as Character[];

          if (isMounted) setCharacters(normalizedData);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load episode details');
          console.error(err);
        }
      } finally {
        if (isMounted) setIsLoadingInitial(false);
      }
    };

    init();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // --- Load More Handler ---
  const handleLoadMore = async () => {
    if (isLoadingMore) return;
    try {
      setIsLoadingMore(true);
      const currentCount = characters.length;
      const nextBatchIds = allCharacterIds.slice(currentCount, currentCount + CAST_PER_PAGE);

      if (nextBatchIds.length > 0) {
        const newCharacters = await apiClient.characters.getMultiple(nextBatchIds);
        const normalizedNew = (
          Array.isArray(newCharacters) ? newCharacters : [newCharacters]
        ) as Character[];

        setCharacters(prev => [...prev, ...normalizedNew]);
      }
    } catch (err) {
      console.error('Error loading more characters:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // --- Helpers ---
  const hasMoreCharacters = characters.length < allCharacterIds.length;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown Date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Extract Season/Episode (S01E01 -> S1, E1)
  const getSeasonInfo = (code: string) => {
    const s = code.match(/S(\d+)/)?.[1] || '?';
    const e = code.match(/E(\d+)/)?.[1] || '?';
    return { season: s, episode: e };
  };

  if (isLoadingInitial) {
    return <LoadingSpinner message="Retrieving archival footage..." />;
  }

  if (error || !episode) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center max-w-lg mx-auto mt-10">
        <div className="bg-red-50 p-6 rounded-full mb-6">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Episode Data Corrupted</h2>
        <button
          onClick={() => router.back()}
          className="px-8 py-3 bg-[#00B5CC] text-white rounded-xl font-bold"
        >
          Return to Database
        </button>
      </div>
    );
  }

  const { season, episode: epNum } = getSeasonInfo(episode.episode);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <GoBackButton />

      {/* Hero / Header Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative group">
        {/* Decorative Top Bar (Orange/Yellow for Episodes) */}
        <div className="h-2 w-full bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400" />

        <div className="p-8 md:p-10 relative z-10">
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

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="p-3 bg-white rounded-xl text-[#FF9800] shadow-sm">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-0.5">
                  Air Date
                </p>
                <p className="text-lg font-bold text-gray-900">{formatDate(episode.air_date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="p-3 bg-white rounded-xl text-[#00B5CC] shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-0.5">
                  Total Cast
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {allCharacterIds.length}{' '}
                  <span className="text-sm text-gray-500 font-medium">Characters</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
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
