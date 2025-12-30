import { ChevronDown } from 'lucide-react';

import { LoadMoreButtonProps } from '~/types';
import { Button } from './Button';

export function LoadMoreButton({ onClick, disabled, isFetchingNextPage }: LoadMoreButtonProps) {
  return (
    <div className="flex justify-center py-10">
      <Button
        onClick={onClick}
        disabled={disabled}
        isLoading={isFetchingNextPage}
        variant="outline"
        className="group rounded-full tracking-widest uppercase text-xs min-w-[200px]"
      >
        {isFetchingNextPage ? (
          'Scanning...'
        ) : (
          <span className="flex items-center gap-2">
            Load More Results
            <ChevronDown className="w-4 h-4 transition-transform duration-500 group-hover:translate-y-1" />
          </span>
        )}
      </Button>
    </div>
  );
}
