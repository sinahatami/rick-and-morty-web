import { useMemo } from 'react';

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = useMemo(() => {
    switch (status.toLowerCase()) {
      case 'alive':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-700',
          dot: 'bg-green-500',
          pulse: true,
        };
      case 'dead':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          dot: 'bg-red-500',
          pulse: false,
        };
      default:
        return {
          bg: 'bg-gray-100',
          border: 'border-gray-200',
          text: 'text-gray-600',
          dot: 'bg-gray-400',
          pulse: false,
        };
    }
  }, [status]);

  return (
    <div
      className={`
      flex items-center gap-2 px-3 py-1.5 rounded-full 
      shadow-sm backdrop-blur-md bg-white/95 border 
      ${config.border}
    `}
    >
      <span className="relative flex h-2.5 w-2.5">
        {config.pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${config.dot}`} />
      </span>
      <span className={`text-[10px] font-black tracking-widest uppercase ${config.text}`}>
        {status}
      </span>
    </div>
  );
}
