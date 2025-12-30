import { Button } from './Button';

interface LoadMoreButtonProps {
  onClick: () => void;
  disabled: boolean;
  isFetchingNextPage: boolean;
}

export function LoadMoreButton({ onClick, disabled, isFetchingNextPage }: LoadMoreButtonProps) {
  return (
    <div className="flex justify-center py-10">
      <Button
        onClick={onClick}
        disabled={disabled}
        isLoading={isFetchingNextPage}
        variant="outline"
        className="rounded-full tracking-widest uppercase text-xs min-w-[200px]"
      >
        {isFetchingNextPage ? 'Scanning...' : 'Load More Results'}
      </Button>
    </div>
  );
}
