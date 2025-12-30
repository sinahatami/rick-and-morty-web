import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  icon?: LucideIcon;
  count?: number;
  colorClass?: string;
}

export function SectionHeader({
  title,
  icon: Icon,
  count,
  colorClass = 'text-gray-900',
}: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-8">
      {Icon && (
        <div className={`p-2 rounded-lg bg-gray-50 ${colorClass}`}>
          <Icon className="h-6 w-6" />
        </div>
      )}

      <h2 className="text-2xl md:text-3xl font-black text-[#0B1E2D] tracking-tight">{title}</h2>

      {count !== undefined && (
        <span className="ml-auto px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full uppercase tracking-wider">
          {count} Total
        </span>
      )}
    </div>
  );
}
