import { Loader2 } from 'lucide-react';
import { memo } from 'react';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner = memo(({ message, fullScreen = false }: LoadingSpinnerProps) => {
  const content = (
    <div className="flex flex-col justify-center items-center py-24 space-y-6">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-20 w-20 bg-primary/10 rounded-full animate-ping" />
        <Loader2 className="h-12 w-12 animate-spin text-primary relative z-10" />
      </div>
      <div className="text-center space-y-2">
        <div className="text-gray-900 text-xl font-bold italic">Wubba Lubba Dub Dub!</div>
        {message && <p className="text-gray-500 text-sm font-medium">{message}</p>}
      </div>
    </div>
  );

  if (fullScreen) {
    return <div className="flex items-center justify-center min-h-screen">{content}</div>;
  }

  return content;
});

LoadingSpinner.displayName = 'LoadingSpinner';
