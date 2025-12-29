import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Users } from 'lucide-react';
import { Location, Character } from '~/types/api';
import { apiClient } from '~/lib/api-client';

// Shared components matching your CharacterList
import { CharacterCard } from '~/components/CharacterCard';
import { GoBackButton } from './shared/GoBackButton';
import { LoadMoreButton } from './shared/LoadMoreButton';
import { LoadingSpinner } from './shared/LoadingSpinner';

interface LocationDetailProps {
  id: string;
}

const RESIDENTS_PER_PAGE = 12;

export function LocationDetail({ id }: LocationDetailProps) {
  const router = useRouter();

  // Data States
  const [location, setLocation] = useState<Location | null>(null);
  const [allResidentIds, setAllResidentIds] = useState<number[]>([]);
  const [residents, setResidents] = useState<Character[]>([]); // These are the visible ones

  // Loading States
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Initial Fetch: Get Location info and the first batch of IDs
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        setIsLoadingInitial(true);
        const locationData = await apiClient.locations.getById(id);

        if (!isMounted) return;
        setLocation(locationData);

        // Parse IDs from URLs
        const ids = locationData.residents
          .map(url => {
            const parts = url.split('/');
            return parseInt(parts[parts.length - 1]);
          })
          .filter(id => !isNaN(id));

        setAllResidentIds(ids);

        // Fetch first batch immediately if exists
        if (ids.length > 0) {
          const firstBatchIds = ids.slice(0, RESIDENTS_PER_PAGE);
          const initialResidents = await apiClient.characters.getMultiple(firstBatchIds);

          const normalizedData = (
            Array.isArray(initialResidents) ? initialResidents : [initialResidents]
          ) as Character[];

          if (isMounted) {
            setResidents(normalizedData);
          }
        }
      } catch (err) {
        console.error('Error loading location:', err);
        if (isMounted) setError('Failed to load location details');
      } finally {
        if (isMounted) setIsLoadingInitial(false);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // 2. Load More Handler: Slices the next batch of IDs and fetches them
  const handleLoadMore = async () => {
    if (isLoadingMore) return;

    try {
      setIsLoadingMore(true);
      const currentCount = residents.length;
      const nextBatchIds = allResidentIds.slice(currentCount, currentCount + RESIDENTS_PER_PAGE);

      if (nextBatchIds.length > 0) {
        const newCharacters = await apiClient.characters.getMultiple(nextBatchIds);
        const normalizedNew = (
          Array.isArray(newCharacters) ? newCharacters : [newCharacters]
        ) as Character[];

        setResidents(prev => [...prev, ...normalizedNew]);
      }
    } catch (err) {
      console.error('Error loading more residents:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Helper boolean to control button visibility
  const hasMoreResidents = residents.length < allResidentIds.length;

  if (isLoadingInitial) {
    return <LoadingSpinner message="Locating dimension coordinates..." />;
  }

  if (error || !location) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Location Not Found</h2>
        <button onClick={() => router.back()} className="text-blue-600 hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Section */}
      <div className="space-y-6">
        <GoBackButton />

        <h1 className="text-4xl md:text-5xl font-black text-center text-[#0B1E2D] mb-4">
          {location.name}
        </h1>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto p-6">
          <div className="text-center md:text-left md:pl-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Type</h3>
            <p className="text-xl font-bold text-gray-900">{location.type || 'Unknown'}</p>
          </div>
          <div className="text-center md:text-left pt-4 md:pt-0 md:pl-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
              Dimension
            </h3>
            <p className="text-xl font-bold text-gray-900">{location.dimension || 'Unknown'}</p>
          </div>
        </div>
      </div>

      {/* Residents Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <h2 className="text-2xl font-black text-gray-500">Residents </h2>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-wide">
            {allResidentIds.length} Total
          </span>
        </div>

        {residents.length > 0 ? (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {residents.map(character => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            {hasMoreResidents && (
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
            <h3 className="text-lg font-bold text-gray-900">No Residents</h3>
            <p className="text-gray-500">
              This location appears to be uninhabited in this timeline.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
