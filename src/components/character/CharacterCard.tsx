import { useRouter } from 'next/router';
import Image from 'next/image';
import { MapPin, Globe, Dna } from 'lucide-react';
import { Character } from '~/types/api';
import { BaseCard } from '../shared/BaseCard';
import { CardInfoRow } from '../shared/CardInfoRow';
import { StatusBadge } from '../shared/StatusBadge';

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const router = useRouter();

  const getIdFromUrl = (url: string) => {
    if (!url) return null;
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const handleLocationClick = (url: string) => {
    const id = getIdFromUrl(url);
    if (id) {
      router.push(`/locations/${id}`);
    }
  };

  return (
    <BaseCard href={`/characters/${character.id}`} theme="character">
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-gray-100 overflow-hidden border-b border-gray-100">
        <Image
          src={character.image}
          alt={character.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform scale-100 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-in-out"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-10">
          <StatusBadge status={character.status} />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col bg-white">
        <div className="mb-4">
          <h3
            className="text-xl font-black text-gray-900 leading-tight group-hover:text-[#B8E986] transition-colors duration-200 line-clamp-1"
            title={character.name}
          >
            {character.name}
          </h3>

          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold bg-gray-50 border border-gray-200 text-gray-600 uppercase tracking-wide">
              <Dna className="w-3 h-3 text-gray-400" />
              {character.species}
            </span>
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
              {character.gender}
            </span>
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full mb-4 group-hover:bg-[#B8E986]/30 transition-colors" />

        <div className="space-y-1 mt-auto">
          <CardInfoRow
            icon={MapPin}
            label="Last Known Location"
            value={character.location.name}
            onClick={
              character.location.name !== 'unknown'
                ? () => handleLocationClick(character.location.url)
                : undefined
            }
          />
          <CardInfoRow
            icon={Globe}
            label="Origin"
            value={character.origin.name}
            onClick={
              character.origin.name !== 'unknown'
                ? () => handleLocationClick(character.origin.url)
                : undefined
            }
          />
        </div>
      </div>
    </BaseCard>
  );
}
