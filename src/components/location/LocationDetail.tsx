import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Users, MapPin, Globe, Calendar, Zap } from 'lucide-react';
import { Location } from '~/types/api';
import { apiClient } from '~/lib/api-client';

import { LoadingSpinner } from '../shared/LoadingSpinner';
import { GoBackButton } from '../shared/GoBackButton';
import { StatCard } from '../shared/StatCard';
import { DetailCard } from '../shared/DetailCard';
import { NotFoundState } from '../shared/NotFoundState';
import { CharacterGridSection } from '../shared/CharacterGridSection';

interface LocationDetailProps {
  id: string;
}

export function LocationDetail({ id }: LocationDetailProps) {
  const router = useRouter();

  // --- Data States ---
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Initial Fetch ---
  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      try {
        setLoading(true);
        const locationData = await apiClient.locations.getById(id);

        if (isMounted) {
          setLocation(locationData);
        }
      } catch (err) {
        console.error('Error loading location:', err);
        if (isMounted) setError('Failed to load location details');
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
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTypeStyles = (type?: string) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('planet'))
      return { color: 'text-[#B8E986]', bg: 'bg-[#B8E986]/10', border: 'border-[#B8E986]/20' };
    if (t.includes('cluster') || t.includes('station'))
      return { color: 'text-[#00B5CC]', bg: 'bg-[#00B5CC]/10', border: 'border-[#00B5CC]/20' };
    return { color: 'text-gray-500', bg: 'bg-gray-100', border: 'border-gray-200' };
  };

  if (loading) {
    return <LoadingSpinner message="Scanning dimensional coordinates..." />;
  }

  if (error || !location) {
    return (
      <NotFoundState
        title="Signal Lost"
        message="This location coordinates are invalid or redacted."
        backLabel="Return to Dimension C-137"
      />
    );
  }

  const typeStyle = getTypeStyles(location.type);

  // Extract Resident IDs
  const residentIds = location.residents
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
        {/* Decorative Top Bar (Portal Green Gradient) */}

        <DetailCard theme="location">
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

          {/* Detailed Info Grid using StatCard */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard
              icon={Globe}
              label="Dimension"
              value={location.dimension === 'unknown' ? 'Unknown' : location.dimension}
              colorClass="text-[#00B5CC]"
            />

            <StatCard
              icon={MapPin}
              label="Classification"
              value={location.type || 'Unclassified'}
              colorClass="text-[#B8E986]"
            />

            <StatCard
              icon={Zap}
              label="Population"
              value={`${residentIds.length} Entities`}
              colorClass="text-purple-500"
            />
          </div>
        </DetailCard>
      </div>

      {/* Residents Section - Fetches data internally now */}
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
