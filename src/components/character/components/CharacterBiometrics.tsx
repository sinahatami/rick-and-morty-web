import { User, Dna } from 'lucide-react';

import { AttributeRow } from '~/components/shared/AttributeRow';
import { Character } from '~/types';

interface CharacterBiometricsProps {
  character: Character;
}

export function CharacterBiometrics({ character }: CharacterBiometricsProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <h2 className="flex items-center gap-3 text-lg font-black text-gray-900 uppercase tracking-wide mb-6">
        <span className="p-2 bg-[#00B5CC]/10 text-[#00B5CC] rounded-lg">
          <User className="h-5 w-5" />
        </span>
        Biometrics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <AttributeRow label="Gender" value={character.gender} icon={User} />
        <AttributeRow label="Species" value={character.species} icon={Dna} />
        {character.type && (
          <div className="md:col-span-2">
            <AttributeRow label="Type / Subspecies" value={character.type} icon={Dna} />
          </div>
        )}
      </div>
    </div>
  );
}
