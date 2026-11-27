import { type ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: ReactNode;
  /** Number of items currently on screen, shown as a small counter. */
  visibleCount?: number;
}

export function PageHeader({ title, subtitle, visibleCount }: PageHeaderProps) {
  return (
    <div className="flex animate-in flex-col justify-between gap-6 duration-700 fade-in slide-in-from-bottom-4 md:flex-row md:items-end">
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-ink md:text-5xl">{title}</h1>
        {subtitle}
      </div>

      {visibleCount !== undefined && (
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" aria-hidden="true" />
          {visibleCount} Displayed
        </div>
      )}
    </div>
  );
}
