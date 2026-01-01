import { Loader2 } from 'lucide-react';
import { useIsMutating } from '@tanstack/react-query';

export function GlobalLoading() {
  const isMutating = useIsMutating();

  if (!isMutating) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-900/95 backdrop-blur text-white rounded-xl shadow-2xl border border-gray-700/50">
        <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
        <span className="text-sm font-medium tracking-wide">Processing...</span>
      </div>
    </div>
  );
}
