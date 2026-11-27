import { Activity, Dna, Ghost, type LucideIcon, Skull } from 'lucide-react';

import { RemoteImage } from '~/components/data-display/RemoteImage';
import { StatusBadge } from '~/components/data-display/StatusBadge';
import { type Character, type CharacterStatus } from '~/lib/api/types';
import { cn } from '~/lib/utils';

const STATUS_STYLES: Record<
  CharacterStatus,
  { text: string; box: string; ring: string; icon: LucideIcon }
> = {
  Alive: {
    text: 'text-green-800',
    box: 'border-green-200 bg-green-50',
    ring: 'border-green-200',
    icon: Activity,
  },
  Dead: {
    text: 'text-red-800',
    box: 'border-red-200 bg-red-50',
    ring: 'border-red-200',
    icon: Skull,
  },
  unknown: {
    text: 'text-gray-700',
    box: 'border-gray-200 bg-gray-50',
    ring: 'border-gray-200',
    icon: Ghost,
  },
};

export function CharacterIdentityCard({ character }: { character: Character }) {
  const status = STATUS_STYLES[character.status];
  const StatusIcon = status.icon;

  return (
    <div className="group relative lg:sticky lg:top-24">
      <div className="absolute -inset-0.5 rounded-[2rem] bg-linear-to-br from-primary to-secondary opacity-30 blur-md transition duration-500 group-hover:opacity-50" />

      <div className="relative overflow-hidden rounded-[1.8rem] border border-gray-100 bg-white p-6 shadow-xl">
        <div className="absolute inset-x-0 top-0 h-2 bg-linear-to-r from-primary via-secondary to-primary" />

        <div className="flex flex-col items-center pt-4">
          <div className="relative mb-6 h-64 w-64">
            <div
              className={cn(
                'absolute inset-0 animate-spin-slow rounded-full border-4 border-dashed',
                status.ring,
              )}
            />
            <div className="relative z-10 h-full w-full overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-lg">
              <RemoteImage
                src={character.image}
                alt={character.name}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
                priority
                fetchPriority="high"
              />
            </div>
            <div className="absolute right-4 bottom-2 z-20">
              <StatusBadge status={character.status} />
            </div>
          </div>

          <h1 className="mb-2 text-center text-3xl leading-none font-black tracking-tight text-slate-900 md:text-4xl">
            {character.name}
          </h1>

          <span className="mb-6 rounded-lg bg-gray-100 px-3 py-1 text-xs font-bold tracking-wider text-gray-600 uppercase">
            Subject ID: #{character.id}
          </span>

          <div className="grid w-full grid-cols-2 gap-3">
            <div className={cn('flex flex-col items-center rounded-xl border p-3', status.box)}>
              <StatusIcon className={cn('mb-1 h-6 w-6', status.text)} aria-hidden="true" />
              <span className={cn('text-[10px] font-bold uppercase', status.text)}>Condition</span>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-blue-50 bg-blue-50 p-3">
              <Dna className="mb-1 h-6 w-6 text-primary-ink" aria-hidden="true" />
              <span className="text-[10px] font-bold text-primary-ink uppercase">Genetic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
