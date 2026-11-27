import { Dna, Globe, MapPin } from 'lucide-react';

import { Badge } from '~/components/data-display/Badge';
import { Card, CardLink } from '~/components/data-display/Card';
import { CardInfoRow } from '~/components/data-display/CardInfoRow';
import { RemoteImage } from '~/components/data-display/RemoteImage';
import { StatusBadge } from '~/components/data-display/StatusBadge';
import { extractIdFromUrl } from '~/lib/api/ids';
import { type Character, type ResourceRef } from '~/lib/api/types';
import { ROUTES } from '~/lib/routes';

interface CharacterCardProps {
  character: Character;
  /** Load the image right away instead of lazily: for the cards that are visible without scrolling. */
  priority?: boolean;
}

function locationHref(place: ResourceRef) {
  const id = extractIdFromUrl(place.url);
  return place.name !== 'unknown' && id ? ROUTES.locations.detail(id) : undefined;
}

export function CharacterCard({ character, priority = false }: CharacterCardProps) {
  return (
    <Card theme="portal">
      <div className="relative aspect-square w-full overflow-hidden border-b border-gray-100 bg-gray-100">
        <RemoteImage
          src={character.image}
          alt=""
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
          loading={priority ? 'eager' : 'lazy'}
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute top-3 left-3 z-10">
          <StatusBadge status={character.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col bg-white p-5">
        <div className="mb-4">
          <h2 className="line-clamp-1 text-xl leading-tight font-black text-gray-900 transition-colors duration-200 group-hover:text-theme-ink">
            <CardLink href={ROUTES.characters.detail(character.id)}>{character.name}</CardLink>
          </h2>

          <div className="mt-2 flex items-center gap-2">
            <Badge label={character.species} icon={Dna} />
            <span className="ml-1 text-[11px] font-medium tracking-wide text-gray-600 uppercase">
              {character.gender}
            </span>
          </div>
        </div>

        <div className="mb-4 h-px w-full bg-gray-100 transition-colors group-hover:bg-theme/30" />

        <div className="mt-auto space-y-1">
          <CardInfoRow
            icon={MapPin}
            label="Last Known Location"
            value={character.location.name}
            href={locationHref(character.location)}
          />
          <CardInfoRow
            icon={Globe}
            label="Origin"
            value={character.origin.name}
            href={locationHref(character.origin)}
          />
        </div>
      </div>
    </Card>
  );
}
