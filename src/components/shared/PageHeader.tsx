import { PageHeaderProps } from '~/types';

export function PageHeader({ title, subtitle, visibleCount }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black text-[#0B1E2D] tracking-tight">{title}</h1>
        {subtitle}
      </div>

      {visibleCount !== undefined && (
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm text-sm font-bold text-gray-700">
          <span className="w-2 h-2 rounded-full bg-[#00B5CC] animate-pulse" />
          {visibleCount} Displayed
        </div>
      )}
    </div>
  );
}
