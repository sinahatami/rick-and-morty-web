import { type LucideIcon } from 'lucide-react';

import { cn } from '~/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}

export function StatCard({ icon: Icon, label, value, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'group/card flex items-start gap-4 rounded-2xl border border-theme/20 bg-theme/5 p-4 transition-all duration-300 hover:border-theme/40 hover:bg-theme/10',
        className,
      )}
    >
      <div className="rounded-xl bg-white p-3 text-theme-ink shadow-sm transition-all duration-300 group-hover/card:scale-110">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <h3 className="mb-1 text-[10px] font-black tracking-widest text-gray-600 uppercase">
          {label}
        </h3>
        <p className="text-lg leading-none font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
