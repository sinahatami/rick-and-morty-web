import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  AlertCircle,
  MapPin,
  Globe,
  Activity,
  Dna,
  Film,
  Ghost,
  Skull,
  User,
  ArrowRight,
} from 'lucide-react';

import { Character, Episode } from '~/types/api';
import { apiClient } from '~/lib/api-client';
import { GoBackButton } from './shared/GoBackButton';
import { LoadingSpinner } from './shared/LoadingSpinner';
import { LoadMoreButton } from './shared/LoadMoreButton'; // Import LoadMoreButton
import { EpisodeCard } from './EpisodeCard';

interface CharacterDetailProps {
  id: string;
}

// Config: How many episodes to load per batch
const EPISODES_PER_BATCH = 9;

export function CharacterDetail({ id }: CharacterDetailProps) {
  const router = useRouter();

  // --- Data States ---
  const [character, setCharacter] = useState<Character | null>(null);

  // Episode Pagination States
  const [allEpisodeIds, setAllEpisodeIds] = useState<string[]>([]); // Stores ALL episode IDs
  const [visibleEpisodes, setVisibleEpisodes] = useState<Episode[]>([]); // Stores only FETCHED episodes

  // --- Loading States ---
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Specific loading state for "Load More"
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Character Data
        const charData = await apiClient.characters.getById(id);

        if (isMounted) {
          setCharacter(charData);
        }

        // Extract ALL Episode IDs from URLs
        const ids = charData.episode.map(url => url.split('/').pop()).filter(Boolean) as string[];

        if (isMounted) {
          setAllEpisodeIds(ids);
        }

        // Fetch ONLY the First Batch (e.g., first 20)
        if (ids.length > 0) {
          const firstBatchIds = ids.slice(0, EPISODES_PER_BATCH);

          // Note: ensure apiClient accepts string[] or number[]
          const epData = await apiClient.episodes.getById(firstBatchIds as any);

          if (isMounted) {
            // Normalization: API returns Object for 1 item, Array for multiple
            const episodesArray = Array.isArray(epData) ? epData : [epData];
            setVisibleEpisodes(episodesArray);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load character details');
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [id]);

  // --- Handler: Load More Episodes ---
  const handleLoadMore = async () => {
    if (isLoadingMore) return;

    try {
      setIsLoadingMore(true);

      // Calculate next batch
      const currentCount = visibleEpisodes.length;
      const nextBatchIds = allEpisodeIds.slice(currentCount, currentCount + EPISODES_PER_BATCH);

      if (nextBatchIds.length > 0) {
        const newEpisodesData = await apiClient.episodes.getById(nextBatchIds as any);
        const normalizedNew = Array.isArray(newEpisodesData) ? newEpisodesData : [newEpisodesData];

        setVisibleEpisodes(prev => [...prev, ...normalizedNew]);
      }
    } catch (err) {
      console.error('Error loading more episodes:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // --- Helper: Status Config ---
  const getStatusConfig = (status: string = 'Unknown') => {
    switch (status.toLowerCase()) {
      case 'alive':
        return {
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          dot: 'bg-green-500',
          icon: Activity,
        };
      case 'dead':
        return {
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          dot: 'bg-red-500',
          icon: Skull,
        };
      default:
        return {
          color: 'text-gray-500',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          dot: 'bg-gray-400',
          icon: Ghost,
        };
    }
  };

  const hasMoreEpisodes = visibleEpisodes.length < allEpisodeIds.length;

  if (loading) {
    return <LoadingSpinner message="Accessing Galactic Federation Database..." />;
  }

  if (error || !character) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center max-w-lg mx-auto mt-10">
        <div className="bg-red-50 p-6 rounded-full mb-6">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Subject Not Found</h2>
        <p className="text-gray-500 mb-8">
          The character you are looking for does not exist in this central finite curve.
        </p>
        <button
          onClick={() => router.back()}
          className="px-8 py-3 bg-[#00B5CC] text-white rounded-xl font-bold hover:bg-[#0091A3] transition-colors shadow-lg shadow-[#00B5CC]/20"
        >
          Return to Safety
        </button>
      </div>
    );
  }

  const statusConfig = getStatusConfig(character.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-500">
      <GoBackButton />

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
        {/* --- LEFT COLUMN: Identity Card --- */}
        <div className="relative group lg:sticky lg:top-8">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#00B5CC] to-[#B8E986] rounded-[2rem] opacity-30 blur-md group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-white rounded-[1.8rem] p-6 shadow-xl border border-gray-100 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00B5CC] via-[#B8E986] to-[#00B5CC]" />
            <div className="flex flex-col items-center pt-4">
              <div className="relative w-64 h-64 mb-6">
                <div
                  className={`absolute inset-0 rounded-full border-4 ${statusConfig.border} border-dashed animate-spin-slow`}
                ></div>
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg relative z-10"
                />
                <div
                  className={`absolute bottom-2 right-4 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm bg-white ${statusConfig.border}`}
                >
                  <span className="relative flex h-3 w-3">
                    {character.status === 'Alive' && (
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusConfig.dot}`}
                      ></span>
                    )}
                    <span
                      className={`relative inline-flex rounded-full h-3 w-3 ${statusConfig.dot}`}
                    ></span>
                  </span>
                  <span
                    className={`text-xs font-black uppercase tracking-widest ${statusConfig.color}`}
                  >
                    {character.status}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 text-center tracking-tight leading-none mb-2">
                {character.name}
              </h1>
              <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-lg uppercase tracking-wider mb-6">
                Subject ID: #{character.id}
              </span>
              <div className="grid grid-cols-2 gap-3 w-full">
                <div
                  className={`flex flex-col items-center p-3 rounded-xl border ${statusConfig.bg} ${statusConfig.border}`}
                >
                  <StatusIcon className={`h-6 w-6 mb-1 ${statusConfig.color}`} />
                  <span className={`text-[10px] font-bold uppercase ${statusConfig.color}`}>
                    Condition
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl border border-blue-50 bg-blue-50">
                  <Dna className="h-6 w-6 mb-1 text-[#00B5CC]" />
                  <span className="text-[10px] font-bold uppercase text-[#00B5CC]">Genetic</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Data Log --- */}
        <div className="space-y-8">
          {/* Section 1: Biometrics */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="flex items-center gap-3 text-lg font-black text-gray-900 uppercase tracking-wide mb-6">
              <span className="p-2 bg-[#00B5CC]/10 text-[#00B5CC] rounded-lg">
                <User className="h-5 w-5" />
              </span>
              Biometrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InfoRow label="Gender" value={character.gender} icon={User} />
              <InfoRow label="Species" value={character.species} icon={Dna} />
              {character.type && (
                <div className="md:col-span-2">
                  <InfoRow label="Type / Subspecies" value={character.type} icon={Dna} />
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Locations */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="flex items-center gap-3 text-lg font-black text-gray-900 uppercase tracking-wide mb-6">
              <span className="p-2 bg-[#B8E986]/20 text-green-600 rounded-lg">
                <MapPin className="h-5 w-5" />
              </span>
              Location History
            </h2>
            <div className="space-y-4">
              <LocationRow
                label="Origin Point"
                name={character.origin.name}
                url={character.origin.url}
                icon={Globe}
              />
              <LocationRow
                label="Last Known Location"
                name={character.location.name}
                url={character.location.url}
                icon={MapPin}
              />
            </div>
          </div>

          {/* Section 3: Episodes */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="flex items-center gap-3 text-lg font-black text-gray-900 uppercase tracking-wide mb-6">
              <span className="p-2 bg-orange-50 text-orange-500 rounded-lg">
                <Film className="h-5 w-5" />
              </span>
              Episode Appearances
              <span className="ml-auto shrink-0 whitespace-nowrap text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                {allEpisodeIds.length} Total
              </span>
            </h2>

            <div className="space-y-8">
              {/* Episodes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleEpisodes.map(episode => (
                  <EpisodeCard key={episode.id} episode={episode} />
                ))}
              </div>

              {/* Loading State for empty initial fetch */}
              {visibleEpisodes.length === 0 && allEpisodeIds.length > 0 && (
                <div className="py-12 text-center text-gray-400 italic text-sm border-2 border-dashed border-gray-100 rounded-xl">
                  Loading episode data...
                </div>
              )}

              {/* Load More Button */}
              {hasMoreEpisodes && (
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
        </div>
      </div>
    </div>
  );
}

// --- Sub-Components ---

function InfoRow({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-4">
      <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-0.5">
          {label}
        </p>
        <p className="text-base font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function LocationRow({
  label,
  name,
  url,
  icon: Icon,
}: {
  label: string;
  name: string;
  url: string;
  icon: any;
}) {
  const router = useRouter();
  const isUnknown = name.toLowerCase() === 'unknown';
  const locationId = url ? url.split('/').pop() : null;

  const handleClick = () => {
    if (!isUnknown && locationId) {
      router.push(`/locations/${locationId}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300
        ${
          !isUnknown && locationId
            ? 'cursor-pointer bg-white border-gray-200 hover:border-[#B8E986] hover:shadow-[0_4px_20px_rgba(184,233,134,0.2)] group'
            : 'bg-gray-50 border-dashed border-gray-200 opacity-80 cursor-default'
        }
      `}
    >
      <div
        className={`
        p-3 rounded-xl transition-colors duration-300
        ${
          !isUnknown
            ? 'bg-[#B8E986]/20 text-green-700 group-hover:bg-[#B8E986] group-hover:text-white'
            : 'bg-gray-100 text-gray-400'
        }
      `}
      >
        <Icon className="h-6 w-6" />
      </div>

      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-0.5">
          {label}
        </p>
        <p
          className={`text-base font-bold transition-colors ${
            !isUnknown ? 'text-gray-900 group-hover:text-green-700' : 'text-gray-500 italic'
          }`}
        >
          {name}
        </p>
      </div>

      {!isUnknown && locationId && (
        <div className="p-1 rounded-full bg-transparent group-hover:bg-[#B8E986]/10 transition-colors">
          <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-[#B8E986] transition-transform group-hover:translate-x-1" />
        </div>
      )}
    </div>
  );
}
