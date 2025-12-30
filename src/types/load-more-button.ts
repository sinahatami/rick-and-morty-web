export interface LoadMoreButtonProps {
  onClick: () => void;
  disabled: boolean;
  isFetchingNextPage: boolean;
}