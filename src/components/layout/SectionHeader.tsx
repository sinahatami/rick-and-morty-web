import { type LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  icon?: LucideIcon;
  count?: number;
}

export function SectionHeader({ title, icon: Icon, count }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-center gap-3 border-b border-gray-100 pb-4">
      {Icon && (
        <div className="rounded-lg bg-gray-50 p-2 text-theme-ink">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      )}

      <h2 className="text-2xl font-black tracking-tight text-ink md:text-3xl">{title}</h2>

      {count !== undefined && (
        <span className="ml-auto rounded-full bg-gray-100 px-3 py-1 text-xs font-bold tracking-wider text-gray-600 uppercase">
          {count} Total
        </span>
      )}
    </div>
  );
}
