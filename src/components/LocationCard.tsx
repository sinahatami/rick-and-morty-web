import { Location } from '~/types/api';
import { MapPin, Users, Globe, Earth, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  // Format residents count
  const residentsCount = location.residents.length;
  const residentsText =
    residentsCount === 0
      ? 'No residents'
      : residentsCount === 1
        ? '1 resident'
        : `${residentsCount} residents`;

  return (
    <Link href={`/locations/${location.id}`}>
      <div
        className="group bg-white rounded-xl overflow-hidden border border-gray-100 
                   transition-all duration-300 ease-in-out cursor-pointer
                   shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)]
                   hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.12),0_4px_6px_-4px_rgba(0,0,0,0.05)]
                   hover:-translate-y-1.5 hover:border-primary/20"
      >
        {/* Header with icon */}
        <div className="p-6 pb-4 relative">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors">
              <Earth className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
            </div>

            <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 group-hover:bg-gray-100 rounded-full transition-colors">
              <MapPin className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Location
              </span>
            </div>
          </div>

          <h3 className="text-xl font-black text-gray-900 line-clamp-1 group-hover:text-primary transition-colors duration-300 mb-2">
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
        <div className="px-6 pb-6 space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 group-hover:bg-gray-100 rounded-xl transition-colors">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Type</span>
            </div>
            <span className="text-gray-900 font-bold">{location.type || 'Unknown'}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 group-hover:bg-gray-100 rounded-xl transition-colors">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Residents</span>
            </div>
            <span className="text-gray-900 font-bold">{residentsText}</span>
          </div>
        </div>

        {/* View Details Link */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="group/link inline-flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-primary hover:text-white rounded-xl transition-all duration-300">
            <span className="font-bold text-sm">View Details</span>
            <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
