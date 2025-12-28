import { ChevronRight } from 'lucide-react';

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isLink?: boolean;
  onClick?: () => void;
}

export function InfoItem({ icon, label, value, isLink = false, onClick }: InfoItemProps) {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`
        flex items-start gap-3 w-full
        ${onClick ? 'hover:bg-gray-50 transition-colors cursor-pointer rounded-lg p-2 -mx-2' : ''}
      `}
    >
      <div className="p-2 bg-gray-100 rounded-lg text-gray-600 flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-500 font-medium">{label}</div>
        <div
          className={`text-lg font-semibold text-gray-900 truncate ${isLink ? 'hover:text-primary transition-colors' : ''}`}
        >
          {value}
        </div>
      </div>
      {isLink && <ChevronRight className="h-5 w-5 text-gray-300 flex-shrink-0" />}
    </Component>
  );
}
