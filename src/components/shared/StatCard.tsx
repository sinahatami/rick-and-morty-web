import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  colorClass?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  colorClass = 'text-gray-900',
}: StatCardProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors group/card">
      <div
        className={`p-3 bg-white rounded-xl shadow-sm ${colorClass} group-hover/card:scale-110 transition-transform`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
          {label}
        </h3>
        <p className="text-lg font-bold text-gray-900 leading-none">{value}</p>
      </div>
    </div>
  );
}
