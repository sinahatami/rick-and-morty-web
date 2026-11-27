import { type LucideIcon } from 'lucide-react';

interface AttributeRowProps {
  label: string;
  value?: string;
  icon: LucideIcon;
}

export function AttributeRow({ label, value, icon: Icon }: AttributeRowProps) {
  if (!value) return null;

  return (
    <div className="flex items-start gap-4">
      <div className="rounded-xl bg-gray-50 p-2.5 text-gray-600">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <p className="mb-0.5 text-[10px] font-bold tracking-widest text-gray-600 uppercase">
          {label}
        </p>
        <p className="text-base font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
