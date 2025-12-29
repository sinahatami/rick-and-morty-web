import { Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
  onClick: () => void;
  disabled: boolean;
  isFetchingNextPage: boolean;
}

export function LoadMoreButton({ onClick, disabled, isFetchingNextPage }: LoadMoreButtonProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <button
        onClick={onClick}
        disabled={disabled}
        className="
          group relative px-10 py-3
          bg-sky-50 hover:bg-sky-100
          text-blue-500 font-bold tracking-wide uppercase
          rounded-xl
          shadow-lg hover:shadow-2xl
          transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
          flex items-center justify-center gap-2
        "
      >
        {isFetchingNextPage ? (
          <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
        ) : (
          <span>Load More</span>
        )}
      </button>
    </div>
  );
}
