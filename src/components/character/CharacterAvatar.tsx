import Image from 'next/image';

import { StatusBadge } from '../shared/StatusBadge';
import { CharacterAvatarProps } from '~/types';

export function CharacterAvatar({ name, image, status }: CharacterAvatarProps) {
  // Helper to determine border color based on status
  const getBorderColor = (s: string) => {
    switch (s.toLowerCase()) {
      case 'alive':
        return 'border-green-200';
      case 'dead':
        return 'border-red-200';
      default:
        return 'border-gray-200';
    }
  };

  const borderColor = getBorderColor(status);

  return (
    <div className="relative w-64 h-64 mb-6">
      {/* Spinning Status Ring */}
      <div
        className={`
        absolute inset-0 rounded-full border-4 border-dashed animate-spin-slow
        ${borderColor}
      `}
      />

      {/* Main Image */}
      <div className="relative w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden z-10 bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
          priority
        />
      </div>

      {/* Floating Status Badge */}
      <div className="absolute bottom-2 right-4 z-20">
        <StatusBadge status={status} />
      </div>
    </div>
  );
}
