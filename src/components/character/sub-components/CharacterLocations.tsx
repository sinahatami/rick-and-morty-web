import { MapPin, Globe } from 'lucide-react';
import { memo } from 'react';
import { CardInfoRow } from '../../shared/card/CardInfoRow';
import { CharacterLocationsProps } from '~/types/character';

export const CharacterLocations = memo(function CharacterLocations({
  origin,
  location,
  onLocationClick,
}: CharacterLocationsProps) {
  return (
    <div className="space-y-1 mt-auto">
      <CardInfoRow
        icon={MapPin}
        label="Last Known Location"
        value={location.name}
        onClick={location.name !== 'unknown' ? () => onLocationClick?.(location.url) : undefined}
      />
      <CardInfoRow
        icon={Globe}
        label="Origin"
        value={origin.name}
        onClick={origin.name !== 'unknown' ? () => onLocationClick?.(origin.url) : undefined}
      />
    </div>
  );
});

CharacterLocations.displayName = 'CharacterLocations';
