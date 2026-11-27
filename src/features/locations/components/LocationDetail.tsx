import { Calendar, Globe, MapPin, Zap } from 'lucide-react';

import { Badge } from '~/components/data-display/Badge';
import { DetailCard } from '~/components/data-display/DetailCard';
import { StatCard } from '~/components/data-display/StatCard';
import { GoBackButton } from '~/components/controls/GoBackButton';
import { CharacterGridSection } from '~/features/characters/components/CharacterGridSection';
import { type Character, type Location } from '~/lib/api/types';
import { formatDate } from '~/lib/format';
import { ROUTES } from '~/lib/routes';
import { getLocationTheme } from '~/lib/theme';

interface LocationDetailProps {
  location: Location;
  residentIds: number[];
  /** The first residents, resolved while the site is built. */
  initialResidents: Character[];
}

export function LocationDetail({ location, residentIds, initialResidents }: LocationDetailProps) {
  return (
    <div
      data-theme={getLocationTheme(location.name)}
      className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8"
    >
      <GoBackButton fallbackHref={ROUTES.locations.list} />

      <DetailCard>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <Badge label={location.type || 'Unknown Type'} />
              <span className="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-gray-50 px-3 py-1 text-xs font-bold tracking-wider text-gray-600 uppercase">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                Cataloged: {formatDate(location.created)}
              </span>
            </div>

            <h1 className="text-4xl leading-tight font-black tracking-tight text-ink md:text-5xl">
              {location.name}
            </h1>
          </div>
        </div>

        <hr className="my-8 border-gray-100" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <StatCard
            icon={Globe}
            label="Dimension"
            value={location.dimension === 'unknown' ? 'Unknown' : location.dimension}
          />
          <StatCard icon={MapPin} label="Classification" value={location.type || 'Unclassified'} />
          <StatCard icon={Zap} label="Population" value={`${residentIds.length} Entities`} />
        </div>
      </DetailCard>

      <CharacterGridSection
        title="Known Residents"
        queryKey={['location', location.id, 'residents']}
        ids={residentIds}
        initialItems={initialResidents}
        emptyTitle="No Bio-Signs Detected"
        emptyMessage="Scans indicate this location is currently uninhabited."
      />
    </div>
  );
}
