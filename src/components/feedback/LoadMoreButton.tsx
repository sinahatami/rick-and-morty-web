import { ChevronDown } from 'lucide-react';

import { Button } from '~/components/controls/Button';

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function LoadMoreButton({ onClick, isLoading }: LoadMoreButtonProps) {
  return (
    <div className="flex justify-center py-10">
      <Button
        onClick={onClick}
        isLoading={isLoading}
        className="group min-w-[200px] rounded-full text-xs tracking-widest uppercase transition-shadow hover:shadow-lg"
      >
        {isLoading ? (
          'Scanning...'
        ) : (
          <span className="flex items-center gap-2">
            Load More Results
            <ChevronDown
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-1"
              aria-hidden="true"
            />
          </span>
        )}
      </Button>
    </div>
  );
}
