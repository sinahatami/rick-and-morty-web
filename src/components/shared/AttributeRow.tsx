import { AttributeRowProps } from '~/types';

export function AttributeRow({ label, value, icon: Icon }: AttributeRowProps) {
  if (!value) return null;

  return (
    <div className="flex items-start gap-4">
      <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-0.5">
          {label}
        </p>
        <p className="text-base font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
