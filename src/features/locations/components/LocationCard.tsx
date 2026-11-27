import { Earth, Globe, MapPin, Users } from 'lucide-react';

import { Badge } from '~/components/data-display/Badge';
import { Card, CardLink } from '~/components/data-display/Card';
import { CardInfoRow } from '~/components/data-display/CardInfoRow';
import { type Location } from '~/lib/api/types';
import { ROUTES } from '~/lib/routes';

function describePopulation(count: number) {
  if (count === 0) return 'Uninhabited';
  return count === 1 ? '1 Lifeform' : `${count} Lifeforms`;
}

export function LocationCard({ location }: { location: Location }) {
  return (
    <Card theme="rick">
      <div className="relative p-6 pb-4">
        <div className="mb-4 flex items-start justify-between">
          <div className="rounded-2xl border border-theme/20 bg-theme/10 p-3 transition-colors group-hover:bg-theme/20">
            <Earth
              className="h-7 w-7 text-theme-ink transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
          </div>
          <Badge icon={MapPin} label={`Sector ${location.id}`} />
        </div>

        <h2 className="mb-2 line-clamp-1 text-xl font-black text-gray-900 transition-colors duration-200 group-hover:text-theme-ink">
          <CardLink href={ROUTES.locations.detail(location.id)}>{location.name}</CardLink>
        </h2>

        <div className="flex items-center gap-2 text-sm">
          <Globe className="h-4 w-4 text-gray-500" aria-hidden="true" />
          <span className="font-bold text-gray-600">
            {location.dimension === 'unknown' ? 'Unknown Dimension' : location.dimension}
          </span>
        </div>
      </div>

      <div className="px-6">
        <div className="h-px w-full bg-gray-100 transition-colors group-hover:bg-theme/30" />
      </div>

      <div className="flex flex-1 flex-col p-6 pt-4">
        <div className="space-y-3">
          <CardInfoRow icon={MapPin} label="Classification" value={location.type || 'Unknown'} />
          <CardInfoRow
            icon={Users}
            label="Population"
            value={describePopulation(location.residents.length)}
          />
        </div>
      </div>
    </Card>
  );
}
