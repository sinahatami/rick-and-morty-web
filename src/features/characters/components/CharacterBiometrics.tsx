import { Dna, User } from 'lucide-react';

import { AttributeRow } from '~/components/data-display/AttributeRow';
import { type Character } from '~/lib/api/types';

export function CharacterBiometrics({ character }: { character: Character }) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 flex items-center gap-3 text-lg font-black tracking-wide text-gray-900 uppercase">
        <span className="rounded-lg bg-primary/10 p-2 text-primary-ink">
          <User className="h-5 w-5" aria-hidden="true" />
        </span>
        Biometrics
      </h2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        <AttributeRow label="Gender" value={character.gender} icon={User} />
        <AttributeRow label="Species" value={character.species} icon={Dna} />
        {character.type && (
          <div className="md:col-span-2">
            <AttributeRow label="Type / Subspecies" value={character.type} icon={Dna} />
          </div>
        )}
      </div>
    </section>
  );
}
