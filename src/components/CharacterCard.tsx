import { Character } from '../types/api';
import { MapPin, Globe, Circle, ChevronRight } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
}

export function CharacterCard({ character, onClick }: CharacterCardProps) {
  // Set status colors (kept your original logic, it's good)
  const statusConfig = {
    Alive: { dot: 'text-green-500', text: 'text-green-700' },
    Dead: { dot: 'text-red-500', text: 'text-red-700' },
    unknown: { dot: 'text-gray-400', text: 'text-gray-600' },
  }[character.status] || { dot: 'text-gray-400', text: 'text-gray-600' };

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 
                 transition-all duration-300 ease-in-out cursor-pointer
                 /* Base shadow - subtle and soft */
                 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)]
                 /* Hover state - deeper shadow, lift up, subtle primary border tint */
                 hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.12),0_4px_6px_-4px_rgba(0,0,0,0.05)]
                 hover:-translate-y-1.5 hover:border-primary/20"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick?.()}
    >
      {/* Image section */}
      <div className="relative h-64 w-full bg-gray-200 overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          // Changed to object-cover for a fuller look
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
          loading="lazy"
        />

        {/* Colored status - made sleeker */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md pl-2 pr-3 py-1 rounded-full shadow-sm">
            <Circle className={`h-2.5 w-2.5 fill-current ${statusConfig.dot}`} />
            <span className={`text-xs font-bold tracking-wide uppercase ${statusConfig.text}`}>
              {character.status}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 relative">
        {/* A subtle visual cue for interactivity on hover */}
        <ChevronRight className="absolute top-6 right-5 h-5 w-5 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />

        {/* Header & Subtitle Combined */}
        <div className="mb-5 pr-6">
          <h3 className="text-xl font-black text-gray-900 line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {character.name}
          </h3>
          <p className="text-sm font-medium text-gray-500 flex items-center gap-2 mt-1">
            <span>{character.species}</span>
            <span className="text-gray-300">•</span>
            <span>{character.gender}</span>
          </p>
        </div>

        {/* Details Section - using Icons instead of just labels for better scanning */}
        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-3 text-sm">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs text-gray-500 font-medium">Last Location</span>
              <span className="text-gray-700 font-semibold line-clamp-1 leading-tight">
                {character.location.name}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-sm">
            <Globe className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs text-gray-500 font-medium">Origin</span>
              <span className="text-gray-700 font-semibold line-clamp-1 leading-tight">
                {character.origin.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
