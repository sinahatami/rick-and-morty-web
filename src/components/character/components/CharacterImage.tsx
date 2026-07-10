import Image from 'next/image';
import { memo } from 'react';

import { StatusBadge } from '../../shared/badge/StatusBadge';
import { CharacterImageProps } from '~/types/character';

export const CharacterImage = memo(function CharacterImage({
  image,
  name,
  status,
  priority = false,
}: CharacterImageProps) {
  return (
    <div className="relative aspect-square w-full bg-gray-100 overflow-hidden border-b border-gray-100">
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="pointer-events-none z-0 object-cover transform scale-100 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-in-out"
          priority={priority}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Status Badge */}
      <div className="absolute top-3 left-3 z-10">
        <StatusBadge status={status} />
      </div>
    </div>
  );
});

CharacterImage.displayName = 'CharacterImage';
