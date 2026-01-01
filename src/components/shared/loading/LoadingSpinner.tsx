import { Loader2 } from 'lucide-react';
import { memo } from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = memo(function LoadingSpinner({
  message = 'Loading...',
}: LoadingSpinnerProps) {
  return (
    <div className="mt-40 flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 animate-spin text-gray-400 mb-4" />
      <p className="text-gray-500 font-medium">{message}</p>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';
