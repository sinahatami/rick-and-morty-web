import { LucideIcon } from 'lucide-react';

interface CardInfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  className?: string;
}

export function CardInfoRow({ icon: Icon, label, value, className = '' }: CardInfoRowProps) {
  return (
    <div className={`flex items-center gap-3 group/item ${className}`}>
      <div className="p-2 bg-slate-50 rounded-lg group-hover/item:bg-primary/10 transition-colors">
        <Icon className="h-4 w-4 text-gray-400 group-hover/item:text-primary transition-colors" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
          {label}
        </span>
        <span className="text-sm text-gray-700 font-bold truncate">{value}</span>
      </div>
    </div>
  );
}
