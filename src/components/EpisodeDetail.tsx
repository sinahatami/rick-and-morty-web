import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Users } from 'lucide-react';
import { Episode, Character } from '~/types/api';
import { apiClient } from '~/lib/api-client';

import { CharacterCard } from './CharacterCard';
import { LoadMoreButton } from './shared/LoadMoreButton';
import { LoadingSpinner } from './shared/LoadingSpinner';

interface EpisodeDetailProps {
  id: string;
}

const CAST_PER_PAGE = 12;

export function EpisodeDetail({ id }: EpisodeDetailProps) {
  const router = useRouter();

  // Data States
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [allCharacterIds, setAllCharacterIds] = useState<number[]>([]); // Store all IDs here
  const [characters, setCharacters] = useState<Character[]>([]); // Store only visible ones

  // Loading States
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get Episode info and first batch of Cast
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

        // Fetch first batch immediately if exists
        if (ids.length > 0) {
          const firstBatchIds = ids.slice(0, CAST_PER_PAGE);
          const initialCharacters = await apiClient.characters.getMultiple(firstBatchIds);

          const normalizedData = (
            Array.isArray(initialCharacters) ? initialCharacters : [initialCharacters]
          ) as Character[];

          if (isMounted) {
            setCharacters(normalizedData);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load episode details');
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setIsLoadingInitial(false);
        }
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // 2. Load More Handler
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

        setCharacters((prev: Character[]) => [...prev, ...normalizedNew]);
      }
    } catch (err) {
      console.error('Error loading more characters:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const hasMoreCharacters = characters.length < allCharacterIds.length;
  const formattedDate = episode?.air_date;

  if (isLoadingInitial) {
    return <LoadingSpinner message="Loading episode data..." />;
  }

  if (error || !episode) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8 text-center">
        <p className="text-red-500">{error || 'Episode not found'}</p>
        <button onClick={() => router.back()} className="mt-4 underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Navigation & Header Group */}
      <div>
        <div
          onClick={() => router.back()}
          className="flex items-center gap-3 cursor-pointer mb-8 group w-fit"
        >
          <ArrowLeft className="h-6 w-6 text-black stroke-[3]" />
          <span className="text-xl font-bold text-black uppercase tracking-wide">Go Back</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#081F32] text-center mb-10">
          {episode.name}
        </h1>

        {/* Metadata Columns */}
        <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto border-b border-gray-100 pb-12">
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-[#081F32] mb-1">Episode</span>
            <span className="text-lg text-gray-500 font-medium">{episode.episode}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-[#081F32] mb-1">Date</span>
            <span className="text-lg text-gray-500 font-medium">{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* 2. Cast Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 pb-4">
          <h2 className="text-2xl font-medium text-gray-500">Cast</h2>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-wide">
            {allCharacterIds.length} Appearances
          </span>
        </div>

        {characters.length > 0 ? (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {characters.map(character => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            {hasMoreCharacters && (
              <LoadMoreButton
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                isFetchingNextPage={isLoadingMore}
              />
            )}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-dashed border-gray-200">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No Cast Info</h3>
            <p className="text-gray-500">No character information is available for this episode.</p>
          </div>
        )}
      </section>
    </div>
  );
}
