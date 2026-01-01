import { Loader2 } from 'lucide-react';
import { memo } from 'react';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
  iconClassName?: string;
}

export const LoadingSpinner = memo(function LoadingSpinner({
  message = 'Loading...',
  className = '',
  iconClassName = 'h-12 w-12',
}: LoadingSpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 w-full ${className}`}
      role="status"
    >
      <Loader2 className={`animate-spin text-gray-400 mb-4 ${iconClassName}`} aria-hidden="true" />
      <p className="text-gray-500 font-medium text-sm animate-pulse">{message}</p>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';
