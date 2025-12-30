import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Users, MapPin, Globe, Calendar, Zap, AlertCircle } from 'lucide-react';
import { Location, Character } from '~/types/api';
import { apiClient } from '~/lib/api-client';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { GoBackButton } from '../shared/GoBackButton';
import { CharacterGridSection } from '../shared/CharacterGridSection';

interface LocationDetailProps {
  id: string;
}

const RESIDENTS_PER_PAGE = 12;

export function LocationDetail({ id }: LocationDetailProps) {
  const router = useRouter();

  // Data States
  const [location, setLocation] = useState<Location | null>(null);
  const [allResidentIds, setAllResidentIds] = useState<number[]>([]);
  const [residents, setResidents] = useState<Character[]>([]);

  // Loading States
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const residentIds =
    location?.residents.map(url => parseInt(url.split('/').pop() || '')).filter(n => !isNaN(n)) ||
    [];

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      try {
        setIsLoadingInitial(true);
        const locationData = await apiClient.locations.getById(id);

        if (!isMounted) return;
        setLocation(locationData);

        const ids = locationData.residents
          .map(url => {
            const parts = url.split('/');
            return parseInt(parts[parts.length - 1]);
          })
          .filter(id => !isNaN(id));

        setAllResidentIds(ids);

        if (ids.length > 0) {
          const firstBatchIds = ids.slice(0, RESIDENTS_PER_PAGE);
          const initialResidents = await apiClient.characters.getMultiple(firstBatchIds);

          const normalizedData = (
            Array.isArray(initialResidents) ? initialResidents : [initialResidents]
          ) as Character[];

          if (isMounted) setResidents(normalizedData);
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

  // --- Helper Helpers for UI ---
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Logic to determine type styles
  const getTypeStyles = (type?: string) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('planet'))
      return { color: 'text-[#B8E986]', bg: 'bg-[#B8E986]/10', border: 'border-[#B8E986]/20' }; // Portal Green
    if (t.includes('cluster') || t.includes('station'))
      return { color: 'text-[#00B5CC]', bg: 'bg-[#00B5CC]/10', border: 'border-[#00B5CC]/20' }; // Rick Blue
    return { color: 'text-gray-500', bg: 'bg-gray-100', border: 'border-gray-200' };
  };

  if (isLoadingInitial) {
    return <LoadingSpinner message="Scanning dimensional coordinates..." />;
  }

  if (error || !location) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center max-w-lg mx-auto mt-10">
        <div className="bg-red-50 p-6 rounded-full mb-6">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Signal Lost</h2>
        <button
          onClick={() => router.back()}
          className="px-8 py-3 bg-[#00B5CC] text-white rounded-xl font-bold"
        >
          Return to Dimension C-137
        </button>
      </div>
    );
  }

  const typeStyle = getTypeStyles(location.type);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <GoBackButton />

      {/* Hero / Header Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative group">
        {/* Decorative Top Bar (Portal Green Gradient) */}
        <div className="h-2 w-full bg-gradient-to-r from-[#B8E986] via-[#00B5CC] to-[#B8E986]" />

        <div className="p-8 md:p-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            {/* Title Section */}
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border ${typeStyle.bg} ${typeStyle.color} ${typeStyle.border}`}
                >
                  {location.type || 'Unknown Type'}
                </span>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Cataloged: {formatDate(location.created)}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-[#0B1E2D] tracking-tight leading-tight">
                {location.name}
              </h1>
            </div>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* Detailed Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Dimension Card */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#00B5CC]/30 transition-colors group/card">
              <div className="p-3 bg-white rounded-xl shadow-sm text-[#00B5CC] group-hover/card:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Dimension
                </h3>
                <p className="text-lg font-bold text-gray-900 leading-none">
                  {location.dimension === 'unknown' ? 'Unknown' : location.dimension}
                </p>
              </div>
            </div>

            {/* Type Card */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#B8E986] transition-colors group/card">
              <div className="p-3 bg-white rounded-xl shadow-sm text-[#B8E986] group-hover/card:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Classification
                </h3>
                <p className="text-lg font-bold text-gray-900 leading-none">
                  {location.type || 'Unclassified'}
                </p>
              </div>
            </div>

            {/* Population Stats */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-purple-300 transition-colors group/card">
              <div className="p-3 bg-white rounded-xl shadow-sm text-purple-500 group-hover/card:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Population
                </h3>
                <p className="text-lg font-bold text-gray-900 leading-none">
                  {allResidentIds.length}{' '}
                  <span className="text-sm font-medium text-gray-500">Entities</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Residents Section */}
      <CharacterGridSection
        title="Known Residents"
        characterIds={residentIds}
        icon={Users}
        emptyTitle="No Bio-Signs Detected"
        emptyMessage="Scans indicate this location is currently uninhabited."
      />
    </div>
  );
}
