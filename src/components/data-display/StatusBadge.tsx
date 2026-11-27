import { type CharacterStatus } from '~/lib/api/types';
import { cn } from '~/lib/utils';

const STATUS_STYLES: Record<CharacterStatus, { border: string; text: string; dot: string }> = {
  Alive: { border: 'border-green-200', text: 'text-green-800', dot: 'bg-green-500' },
  Dead: { border: 'border-red-200', text: 'text-red-800', dot: 'bg-red-500' },
  unknown: { border: 'border-gray-200', text: 'text-gray-700', dot: 'bg-gray-400' },
};

export function StatusBadge({ status }: { status: CharacterStatus }) {
  const style = STATUS_STYLES[status];

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-full border bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur-md',
        style.border,
      )}
    >
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        {status === 'Alive' && (
          <span
            className={cn(
              'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
              style.dot,
            )}
          />
        )}
        <span className={cn('relative inline-flex h-2.5 w-2.5 rounded-full', style.dot)} />
      </span>
      <span className={cn('text-[10px] font-black tracking-widest uppercase', style.text)}>
        {status}
      </span>
    </div>
  );
}
