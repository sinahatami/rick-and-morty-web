import type { MouseEvent } from 'react';

import { CardInfoRowProps } from '~/types';

export function CardInfoRow({
  icon: Icon,
  label,
  value,
  className = '',
  onClick,
}: CardInfoRowProps) {
  return (
    <div
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        if (onClick) {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }
      }}
      className={`
        flex items-center gap-3 p-2 rounded-lg transition-all duration-200 
        ${
          onClick
            ? 'cursor-pointer hover:bg-gray-50 hover:shadow-sm border border-transparent hover:border-gray-100 group/row'
            : ''
        } 
        ${className}
      `}
    >
      <div className="shrink-0 text-gray-600 group-hover/row:text-[#00B5CC] transition-colors">
        <Icon className="h-4 w-4" />
      </div>

      {/* Content */}
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider leading-none mb-0.5">
          {label}
        </span>
        <span className="text-sm font-bold truncate leading-tight text-gray-900 group-hover/row:text-[#00B5CC] transition-colors">
          {value}
        </span>
      </div>
    </div>
  );
}
