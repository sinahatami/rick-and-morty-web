import { Dna } from 'lucide-react';
import { memo } from 'react';

import { Badge } from '../../shared/badge/Badge';
import { CharacterInfoProps } from '~/types';

export const CharacterInfo = memo(function CharacterInfo({
  name,
  species,
  gender,
}: CharacterInfoProps) {
  return (
    <div className="mb-4">
      <h2
        className="text-xl font-black text-gray-900 leading-tight group-hover:text-[#2E7D32] transition-colors duration-200 line-clamp-1"
        title={name}
      >
        {name}
      </h2>

      <div className="flex items-center gap-2 mt-2">
        <Badge
          label={species}
          icon={Dna}
          theme="portal"
          className="group-hover:border-[#2E7D32]/30 group-hover:text-[#2E7D32]"
        />

        <span className="text-[11px] font-medium text-gray-600 uppercase tracking-wide ml-1">
          {gender}
        </span>
      </div>
    </div>
  );
});

CharacterInfo.displayName = 'CharacterInfo';
