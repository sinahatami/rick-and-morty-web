import { BaseCard } from '../shared/card/BaseCard';
import { LocationHeader } from './sub-components/LocationHeader';
import { LocationDetails } from './sub-components/LocationDetails';
import { Location } from '~/types';

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  const theme = 'rick';
  const residentsCount = location.residents.length;

  return (
    <BaseCard href={`/locations/${location.id}`} theme={theme} className="group flex flex-col">
      {/* Decorative Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00B5CC] via-[#33C3D6] to-[#00B5CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <LocationHeader location={location} theme={theme} />

      {/* Divider */}
      <div className="px-6">
        <div className="h-px bg-gray-100 w-full group-hover:bg-[#00B5CC]/30 transition-colors" />
      </div>

      {/* Details Footer */}
      <div className="p-6 pt-4 flex flex-col flex-grow">
        <LocationDetails type={location.type} residentsCount={residentsCount} />
      </div>
    </BaseCard>
  );
}
