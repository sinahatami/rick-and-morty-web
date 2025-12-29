import { Location } from '~/types/api';
import { MapPin, Users, Globe, Earth } from 'lucide-react';
import { BaseCard } from './shared/BaseCard';
import { CardInfoRow } from './shared/CardInfoRow';

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  const residentsCount = location.residents.length;
  const residentsText =
    residentsCount === 0
      ? 'No residents'
      : residentsCount === 1
        ? '1 resident'
        : `${residentsCount} residents`;

  return (
    <BaseCard
      href={`/locations/${location.id}`}
      theme="location"
      className="hover:ring-4 hover:ring-blue-500/10"
    >
      {/* Header */}
      <div className="p-6 pb-4 relative">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
            <Earth className="h-7 w-7 text-blue-500 group-hover:scale-110 transition-transform" />
          </div>

          <div className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white group-hover:bg-gray-100 rounded-full transition-colors mt-2">
            <MapPin className="h-3.5 w-3.5 text-white" />
            <span className="text-xs font-bold bg-gradient-to-r text-white uppercase tracking-wider">
              Location
            </span>
          </div>
        </div>

        <h3 className="text-xl font-black text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300 mb-2">
          {location.name}
        </h3>

        <div className="flex items-center gap-2 text-sm">
          <Globe className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600 font-medium">
            {location.dimension || 'Unknown Dimension'}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-6 pt-2 space-y-4">
        <CardInfoRow icon={MapPin} label="Type" value={location.type || 'Unknown'} />
        <CardInfoRow icon={Users} label="Residents" value={residentsText} />
      </div>
    </BaseCard>
  );
}
