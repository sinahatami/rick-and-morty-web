import { Activity, Dna, Ghost, Skull } from 'lucide-react';

import { Character } from '~/types';
import { CharacterAvatar } from './CharacterAvatar';

interface CharacterIdentityCardProps {
  character: Character;
}

export function CharacterIdentityCard({ character }: CharacterIdentityCardProps) {
  // Helper for styling based on status
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return {
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: Activity,
        };
      case 'dead':
        return {
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: Skull,
        };
      default:
        return {
          color: 'text-gray-500',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: Ghost,
        };
    }
  };

  const statusConfig = getStatusConfig(character.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="relative group lg:sticky lg:top-8">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-[#00B5CC] to-[#B8E986] rounded-[2rem] opacity-30 blur-md group-hover:opacity-50 transition duration-500" />

      <div className="relative bg-white rounded-[1.8rem] p-6 shadow-xl border border-gray-100 overflow-hidden">
        {/* Top Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00B5CC] via-[#B8E986] to-[#00B5CC]" />

        <div className="flex flex-col items-center pt-4">
          <CharacterAvatar
            name={character.name}
            image={character.image}
            status={character.status}
          />

          <h1 className="text-3xl md:text-4xl font-black text-slate-900 text-center tracking-tight leading-none mb-2">
            {character.name}
          </h1>

          <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-lg uppercase tracking-wider mb-6">
            Subject ID: #{character.id}
          </span>

          <div className="grid grid-cols-2 gap-3 w-full">
            {/* Status Box */}
            <div
              className={`flex flex-col items-center p-3 rounded-xl border ${statusConfig.bg} ${statusConfig.border}`}
            >
              <StatusIcon className={`h-6 w-6 mb-1 ${statusConfig.color}`} />
              <span className={`text-[10px] font-bold uppercase ${statusConfig.color}`}>
                Condition
              </span>
            </div>

            {/* Genetic Box */}
            <div className="flex flex-col items-center p-3 rounded-xl border border-blue-50 bg-blue-50">
              <Dna className="h-6 w-6 mb-1 text-[#00B5CC]" />
              <span className="text-[10px] font-bold uppercase text-[#00B5CC]">Genetic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
