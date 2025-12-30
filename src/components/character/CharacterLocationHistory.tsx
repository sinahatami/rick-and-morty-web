import { MapPin, Globe } from 'lucide-react';

import { LocationLinkRow } from '../shared/LocationLinkRow';
import { Character } from '~/types';

interface CharacterLocationHistoryProps {
  origin: Character['origin'];
  location: Character['location'];
}

export function CharacterLocationHistory({ origin, location }: CharacterLocationHistoryProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <h2 className="flex items-center gap-3 text-lg font-black text-gray-900 uppercase tracking-wide mb-6">
        <span className="p-2 bg-[#B8E986]/20 text-green-600 rounded-lg">
          <MapPin className="h-5 w-5" />
        </span>
        Location History
      </h2>
      <div className="space-y-4">
        <LocationLinkRow label="Origin Point" name={origin.name} url={origin.url} icon={Globe} />
        <LocationLinkRow
          label="Last Known Location"
          name={location.name}
          url={location.url}
          icon={MapPin}
        />
      </div>
    </div>
  );
}
