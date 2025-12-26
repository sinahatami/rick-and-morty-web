import { Character } from '../types/api';

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
}

export function CharacterCard({ character, onClick }: CharacterCardProps) {
  // Set status colors
  const statusColor = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  }[character.status];

  const statusTextColor = {
    Alive: 'text-green-600',
    Dead: 'text-red-600',
    unknown: 'text-gray-600',
  }[character.status];

  return (
    <div
      className="bg-white rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all cursor-pointer shadow-card hover:shadow-card-hover hover:-translate-y-1"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick?.()}
    >
      {/* Image character */}
      <div className="relative h-60 w-full bg-gray-100 overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300 p-4"
          loading="lazy"
        />

        {/* Colored status */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-gray-200">
            <div className={`w-2.5 h-2.5 rounded-full ${statusColor}`} />
            <span className={`text-xs font-medium ${statusTextColor}`}>{character.status}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-1 hover:text-primary transition-colors">
          {character.name}
        </h3>
        <div className="flex items-center text-sm mb-4">
          <span className="text-text-secondary">{character.species}</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <span className="text-text-tertiary w-20">Gender:</span>
            <span className="text-text-primary font-medium">{character.gender}</span>
          </div>

          <div className="pt-3 border-t border-border">
            <div className="text-xs text-text-tertiary mb-1">Last known location</div>
            <div className="text-sm text-text-primary line-clamp-1">{character.location.name}</div>
          </div>

          <div className="pt-3 border-t border-border">
            <div className="text-xs text-text-tertiary mb-1">Origin</div>
            <div className="text-sm text-text-primary line-clamp-1">{character.origin.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
