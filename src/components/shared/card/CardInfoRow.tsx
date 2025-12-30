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
          e.preventDefault(); // Prevent default link behavior
          e.stopPropagation(); // Stop bubbling to the parent Card link
          onClick();
        }
      }}
      className={`
        flex items-start gap-3 p-2 rounded-lg transition-all duration-200 
        ${
          onClick
            ? 'cursor-pointer hover:bg-gray-50 hover:shadow-sm border border-transparent hover:border-gray-100 group/row'
            : ''
        } 
        ${className}
      `}
    >
      {/* Icon: Changes color on row hover */}
      <div className="mt-0.5 shrink-0 text-gray-400 group-hover/row:text-[#00B5CC] transition-colors">
        <Icon className="h-4 w-4" />
      </div>

      {/* Content */}
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-1">
          {label}
        </span>
        {/* Value: Changes color on row hover */}
        <span className="text-sm font-bold truncate leading-tight text-gray-900 group-hover/row:text-[#00B5CC] transition-colors">
          {value}
        </span>
      </div>
    </div>
  );
}
