import { useRouter } from 'next/router';
import Image from 'next/image';
import { MapPin, Globe, Dna } from 'lucide-react';
import { Character } from '~/types/api';
import { BaseCard } from './shared/BaseCard';
import { CardInfoRow } from './shared/CardInfoRow';

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

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return {
          indicator: 'bg-green-500',
          text: 'text-green-700',
          bg: 'bg-green-50',
          border: 'border-green-200',
          pulse: true,
        };
      case 'dead':
        return {
          indicator: 'bg-red-500',
          text: 'text-red-700',
          bg: 'bg-red-50',
          border: 'border-red-200',
          pulse: false,
        };
      default:
        return {
          indicator: 'bg-gray-400',
          text: 'text-gray-600',
          bg: 'bg-gray-100',
          border: 'border-gray-200',
          pulse: false,
        };
    }
  };

  const statusConfig = getStatusConfig(character.status);

  return (
    <BaseCard href={`/characters/${character.id}`} theme="character">
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-gray-100 overflow-hidden border-b border-gray-100">
        {/* 2. Updated to Next.js Image */}
        <Image
          src={character.image}
          alt={character.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform scale-100 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-in-out"
          priority={false}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3 z-10">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md bg-white/95 border ${statusConfig.border}`}
          >
            <span className="relative flex h-2.5 w-2.5">
              {statusConfig.pulse && (
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusConfig.indicator}`}
                ></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${statusConfig.indicator}`}
              ></span>
            </span>
            <span
              className={`text-[10px] font-black tracking-widest uppercase ${statusConfig.text}`}
            >
              {character.status}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col bg-white">
        <div className="mb-4">
          <h3
            className="text-xl font-black text-gray-900 leading-tight group-hover:text-[#00B5CC] transition-colors duration-200 line-clamp-1"
            title={character.name}
          >
            {character.name}
          </h3>

          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold bg-gray-50 border border-gray-200 text-gray-600 uppercase tracking-wide">
              <Dna className="w-3 h-3 text-gray-400" />
              {character.species}
            </span>
            <span className="text-[11px] font-medium text-gray-400">{character.gender}</span>
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full mb-4 group-hover:bg-[#00B5CC]/20 transition-colors" />

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
