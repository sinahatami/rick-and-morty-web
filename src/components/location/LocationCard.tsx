import { Location } from '~/types/api';
import { MapPin, Users, Globe, Earth, ArrowRight } from 'lucide-react';
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
    <BaseCard
      href={`/locations/${location.id}`}
      theme="location"
      className="group relative overflow-hidden bg-white hover:border-[#B8E986]/50 transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(184,233,134,0.3)] flex flex-col"
    >
      {/* Decorative Top Border (Portal Gradient) */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8E986] via-[#00B5CC] to-[#B8E986] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="p-6 pb-4 relative">
        <div className="flex items-start justify-between mb-4">
          {/* Main Icon */}
          <div className="p-3 bg-[#B8E986]/10 rounded-2xl group-hover:bg-[#B8E986]/20 transition-colors border border-[#B8E986]/10">
            <Earth className="h-7 w-7 text-[#86a860] group-hover:text-[#6a8a45] group-hover:scale-110 transition-transform duration-300" />
          </div>

          {/* Type Badge */}
          <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg group-hover:border-[#B8E986]/30 transition-colors">
            <MapPin className="h-3 w-3 text-gray-400 group-hover:text-[#B8E986]" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#B8E986] transition-colors">
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
        <div className="h-px bg-gray-100 w-full group-hover:bg-[#B8E986]/30 transition-colors" />
      </div>

      {/* Details Footer */}
      <div className="p-6 pt-4 flex flex-col flex-grow">
        <div className="space-y-3">
          <CardInfoRow icon={MapPin} label="Classification" value={location.type || 'Unknown'} />
          <CardInfoRow icon={Users} label="Population" value={residentsText} />
        </div>

        <div className="mt-auto pt-4 flex items-center gap-2 text-[#00B5CC] text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          Scan Sector <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </BaseCard>
  );
}
