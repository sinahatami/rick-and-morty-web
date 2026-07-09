import { Users, MapPin, Globe, Calendar, Zap } from 'lucide-react';
import { useMemo } from 'react';

import { LoadingSpinner } from '../shared/loading/LoadingSpinner';
import { GoBackButton } from '../shared/GoBackButton';
import { StatCard } from '../shared/card/StatCard';
import { DetailCard } from '../shared/card/DetailCard';
import { CharacterGridSection } from '../shared/CharacterGridSection';
import { Badge } from '../shared/badge/Badge';
import { apiClient } from '~/lib/api-client';
import { Location } from '~/types';
import { useEntityDetail } from '~/hooks/useEntityDetail';
import { extractIdFromUrl, formatDate } from '~/utils/string-helper';
import { NotFoundState } from '../shared/state/NotFoundState';
import { SEO } from '../shared/SEO';

interface LocationDetailProps {
  id: string;
}

export function LocationDetail({ id }: LocationDetailProps) {
  const {
    data: location,
    loading,
    error,
  } = useEntityDetail<Location>(apiClient.locations.getById, id, 'Failed to load location details');

  const isCitadel =
    location?.name?.toLowerCase().includes('citadel') || location?.name === 'Last Known Location';

  const pageTheme = useMemo(() => (isCitadel ? 'portal' : 'rick'), [isCitadel]);

  const residentIds = useMemo(
    () => location?.residents.map(extractIdFromUrl).filter((id): id is number => id !== null) || [],
    [location?.residents]
  );

  if (loading) {
    return <LoadingSpinner message="Retrieving archival footage..." className="min-h-[50vh]" />;
  }

  if (error || !location) {
    return (
      <NotFoundState
        title="Signal Lost"
        message="This location coordinates are invalid or redacted."
        backLabel="Return to Dimension C-137"
        theme={pageTheme}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEO
        title={`${location.name} Location`}
        description={`Explore ${location.name}, a ${location.type} in the ${location.dimension}. Discover known residents and details from Rick and Morty.`}
      />
      <GoBackButton />

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative group">
        <DetailCard theme={pageTheme}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <Badge label={location.type || 'Unknown Type'} theme={pageTheme} />

                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg border border-gray-100">
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard
              icon={Globe}
              label="Dimension"
              value={location.dimension === 'unknown' ? 'Unknown' : location.dimension}
              theme={pageTheme}
            />

            <StatCard
              icon={MapPin}
              label="Classification"
              value={location.type || 'Unclassified'}
              theme={pageTheme}
            />

            <StatCard
              icon={Zap}
              label="Population"
              value={`${residentIds.length} Entities`}
              theme={pageTheme}
            />
          </div>
        </DetailCard>
      </div>

      <CharacterGridSection
        title="Known Residents"
        characterIds={residentIds}
        icon={Users}
        emptyTitle="No Bio-Signs Detected"
        emptyMessage="Scans indicate this location is currently uninhabited."
        theme={pageTheme}
      />
    </div>
  );
}
