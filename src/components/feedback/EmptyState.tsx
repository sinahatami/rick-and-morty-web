import { AlertTriangle, FilterX } from 'lucide-react';

import { Button } from '~/components/controls/Button';
import { cn } from '~/lib/utils';

interface EmptyStateProps {
  title: string;
  description: string;
  /** Shows a button that runs `onAction` (clear the filters, retry, ...). */
  actionLabel?: string;
  onAction?: () => void;
  /** Styles the state as a failure instead of "nothing found". */
  isError?: boolean;
}

export function EmptyState({
  title,
  description,
  actionLabel = 'Clear All Filters',
  onAction,
  isError = false,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex animate-in flex-col items-center justify-center rounded-[2rem] border-2 border-dashed px-4 py-20 text-center duration-300 zoom-in-95 fade-in',
        isError ? 'border-red-200 bg-red-50' : 'border-theme/20 bg-theme/10',
      )}
      role="status"
      aria-live="polite"
    >
      <div className="mb-4 rounded-full bg-white p-4 shadow-sm" aria-hidden="true">
        {isError ? (
          <AlertTriangle className="h-10 w-10 text-red-600" />
        ) : (
          <FilterX className="h-10 w-10 text-theme-ink" />
        )}
      </div>

      <h2 className={cn('mb-2 text-xl font-bold', isError ? 'text-red-900' : 'text-gray-900')}>
        {title}
      </h2>

      <p className="mb-8 max-w-xs text-gray-600">{description}</p>

      {onAction && (
        <Button
          onClick={onAction}
          className={cn(
            'min-w-[140px] bg-white text-sm font-bold',
            isError ? 'border-red-600 text-red-700' : 'border-theme-ink',
          )}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
