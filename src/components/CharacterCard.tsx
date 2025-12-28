import { MapPin, Globe } from 'lucide-react';
import { Character } from '~/types';
import { BaseCard } from './shared/BaseCard';

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const statusConfig = {
    Alive: {
      dot: 'bg-green-500',
      text: 'text-green-700',
      ring: 'hover:ring-4 hover:ring-green-500/20',
    },
    Dead: {
      dot: 'bg-red-500',
      text: 'text-red-700',
      ring: 'hover:ring-4 hover:ring-red-500/20',
    },
    unknown: {
      dot: 'bg-gray-400',
      text: 'text-gray-600',
      ring: 'hover:ring-4 hover:ring-gray-400/20',
    },
  }[character.status] || {
    dot: 'bg-gray-400',
    text: 'text-gray-600',
    ring: 'hover:ring-4 hover:ring-gray-400/20',
  };

  return (
    <BaseCard
      href={`/characters/${character.id}`}
      theme="character"
      className={statusConfig.ring} // Pass the ring class here
    >
      {/* Image Section */}
      <div className="relative h-72 w-full bg-gray-100 overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-in-out group-hover:saturate-125"
          loading="lazy"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/20">
            <span className={`relative flex h-2 w-2`}>
              {character.status === 'Alive' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${statusConfig.dot}`}
              ></span>
            </span>
            <span
              className={`text-[10px] font-bold tracking-widest uppercase ${statusConfig.text}`}
            >
              {character.status}
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 relative">
        <div className="mb-6">
          <h3
            title={character.name}
            className="
              text-2xl font-black text-gray-900 leading-tight 
              group-hover:text-primary transition-colors duration-300
              line-clamp-2 min-h-[3.5rem]
            "
          >
            {character.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md">
              {character.species}
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span className="text-sm text-gray-500 font-medium">{character.gender}</span>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-3 group/item">
            <div className="p-2 bg-slate-50 rounded-lg group-hover/item:bg-primary/10 transition-colors">
              <MapPin className="h-4 w-4 text-gray-400 group-hover/item:text-primary transition-colors" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                Last Location
              </span>
              <span className="text-sm text-gray-700 font-bold truncate">
                {character.location.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 group/item">
            <div className="p-2 bg-slate-50 rounded-lg group-hover/item:bg-primary/10 transition-colors">
              <Globe className="h-4 w-4 text-gray-400 group-hover/item:text-primary transition-colors" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                Origin World
              </span>
              <span className="text-sm text-gray-700 font-bold truncate">
                {character.origin.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );
}
