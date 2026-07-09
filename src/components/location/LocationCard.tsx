import { BaseCard } from '../shared/card/BaseCard';
import { LocationHeader } from './components/LocationHeader';
import { LocationDetails } from './components/LocationDetails';
import { Location } from '~/types';
import { parseLocationData } from '../../utils/location-helper';

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  const parsedData = parseLocationData(location);
  const theme = parsedData.theme;

  return (
    <BaseCard href={`/locations/${parsedData.id}`} theme={theme} className="group flex flex-col">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00B5CC] via-[#33C3D6] to-[#00B5CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <LocationHeader location={location} theme={theme} />

      <div className="px-6">
        <div className="h-px bg-gray-100 w-full group-hover:bg-[#00B5CC]/30 transition-colors" />
      </div>

      <div className="p-6 pt-4 flex flex-col flex-grow">
        <LocationDetails type={parsedData.type} residentsCount={parsedData.residentsCount} />
      </div>
    </BaseCard>
  );
}
