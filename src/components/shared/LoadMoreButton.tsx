import { Loader2, ChevronDown } from 'lucide-react';

interface LoadMoreButtonProps {
  onClick: () => void;
  disabled: boolean;
  isFetchingNextPage: boolean;
}

export function LoadMoreButton({ onClick, disabled, isFetchingNextPage }: LoadMoreButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="relative group">
        {/* Glow Effect (Behind the button) */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00B5CC] to-[#33C3D6] rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500"></div>

        <button
          onClick={onClick}
          disabled={disabled}
          className="
            relative px-8 py-3
            bg-white hover:bg-[#00B5CC]
            border-2 border-[#00B5CC]
            text-[#00B5CC] hover:text-white
            font-black tracking-widest uppercase text-xs
            rounded-full
            shadow-sm hover:shadow-[0_0_20px_rgba(0,181,204,0.4)]
            transform hover:-translate-y-0.5 active:translate-y-0
            transition-all duration-300 ease-out
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#00B5CC]
            flex items-center justify-center gap-3
            min-w-[200px]
          "
        >
          {isFetchingNextPage ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Scanning...</span>
            </>
          ) : (
            <>
              <span>Load More Data</span>
              <ChevronDown className="h-4 w-4 group-hover:animate-bounce" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
