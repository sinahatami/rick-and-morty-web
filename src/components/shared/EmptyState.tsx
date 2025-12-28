import { FilterX } from 'lucide-react';
import { memo } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  onClearFilters: () => void;
  showClearButton?: boolean;
  buttonText?: string;
}

export const EmptyState = memo(
  ({
    title,
    description,
    onClearFilters,
    showClearButton = true,
    buttonText = 'Clear All Filters',
  }: EmptyStateProps) => (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-200">
      <div className="p-4 bg-white rounded-full shadow-sm mb-4">
        <FilterX className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-xs mb-8">{description}</p>
      {showClearButton && (
        <button
          onClick={onClearFilters}
          className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all active:scale-95 shadow-lg cursor-pointer"
        >
          {buttonText}
        </button>
      )}
    </div>
  )
);

EmptyState.displayName = 'EmptyState';
