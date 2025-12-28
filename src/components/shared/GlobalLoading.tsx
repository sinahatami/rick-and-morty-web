import { Loader2 } from 'lucide-react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

export function GlobalLoading() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isLoading = isFetching > 0 || isMutating > 0;

  if (!isLoading) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl shadow-xl">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    </div>
  );
}
