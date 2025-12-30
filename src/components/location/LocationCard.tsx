import { Location } from '~/types/api';
import { MapPin, Users, Globe, Earth } from 'lucide-react';
import { BaseCard } from '../shared/BaseCard';
import { CardInfoRow } from '../shared/CardInfoRow';

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  const residentsCount = location.residents.length;
  const residentsText =
    residentsCount === 0
      ? 'Uninhabited'
      : residentsCount === 1
        ? '1 Lifeform'
        : `${residentsCount} Lifeforms`;

  return (
    <BaseCard href={`/locations/${location.id}`} theme="location" className="group flex flex-col">
      {/* Decorative Top Gradient (Blue) */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00B5CC] via-[#33C3D6] to-[#00B5CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="p-6 pb-4 relative">
        <div className="flex items-start justify-between mb-4">
          {/* Main Icon (Blue) */}
          <div className="p-3 bg-[#00B5CC]/10 rounded-2xl group-hover:bg-[#00B5CC]/20 transition-colors border border-[#00B5CC]/10">
            <Earth className="h-7 w-7 text-[#0091A3] group-hover:text-[#00B5CC] group-hover:scale-110 transition-transform duration-300" />
          </div>

          {/* Type Badge */}
          <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg group-hover:border-[#00B5CC]/30 transition-colors">
            <MapPin className="h-3 w-3 text-gray-400 group-hover:text-[#00B5CC]" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#00B5CC] transition-colors">
              Sector {location.id}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-gray-900 line-clamp-1 group-hover:text-[#00B5CC] transition-colors duration-200 mb-2">
          {location.name}
        </h3>

        {/* Subtitle/Dimension */}
        <div className="flex items-center gap-2 text-sm">
          <Globe className="h-4 w-4 text-gray-400" />
          <span className="text-gray-500 font-bold">
            {location.dimension === 'unknown' ? 'Unknown Dimension' : location.dimension}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="px-6">
        <div className="h-px bg-gray-100 w-full group-hover:bg-[#00B5CC]/30 transition-colors" />
      </div>

      {/* Details Footer */}
      <div className="p-6 pt-4 flex flex-col flex-grow">
        <div className="space-y-3">
          <CardInfoRow icon={MapPin} label="Classification" value={location.type || 'Unknown'} />
          <CardInfoRow icon={Users} label="Population" value={residentsText} />
        </div>
      </div>
    </BaseCard>
  );
}
