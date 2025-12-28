import { LayoutGrid } from 'lucide-react';
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  totalCount: number;
  visibleCount: number;
  subtitle?: ReactNode;
}

export function PageHeader({ title, totalCount, visibleCount, subtitle }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-1">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">{title}</h1>
        {subtitle ? (
          subtitle
        ) : (
          <p className="text-gray-400 font-medium text-lg">
            Exploring{' '}
            <span className="text-gray-900 font-black text-xl italic tracking-tighter decoration-primary/30 underline underline-offset-4">
              {totalCount.toLocaleString()}
            </span>
            <span className="ml-1 tracking-widest uppercase text-[13px] font-bold text-gray-400">
              across the cosmos
            </span>
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-2xl shadow-sm">
        <LayoutGrid className="h-4 w-4 text-primary" />
        <span className="text-sm font-bold text-gray-700">{visibleCount} Visible</span>
      </div>
    </div>
  );
}
