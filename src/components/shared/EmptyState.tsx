import { FilterX } from 'lucide-react';
import { memo } from 'react';

import { Button } from './Button';
import { EmptyStateProps } from '~/types';

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
        <Button onClick={onClearFilters} variant="secondary" className="text-sm">
          {buttonText}
        </Button>
      )}
    </div>
  )
);

EmptyState.displayName = 'EmptyState';
