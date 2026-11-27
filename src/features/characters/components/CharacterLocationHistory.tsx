import { Globe, MapPin } from 'lucide-react';

import { type Character } from '~/lib/api/types';
import { LocationLinkRow } from '~/features/locations/components/LocationLinkRow';

export function CharacterLocationHistory({
  origin,
  location,
}: Pick<Character, 'origin' | 'location'>) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 flex items-center gap-3 text-lg font-black tracking-wide text-gray-900 uppercase">
        <span className="rounded-lg bg-theme/10 p-2 text-theme-ink">
          <MapPin className="h-5 w-5" aria-hidden="true" />
        </span>
        Location History
      </h2>

      <div className="space-y-4">
        <LocationLinkRow label="Origin Point" place={origin} icon={Globe} />
        <LocationLinkRow label="Last Known Location" place={location} icon={MapPin} />
      </div>
    </section>
  );
}
