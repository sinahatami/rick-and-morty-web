import { Theme } from '~/types';

export interface LoadMoreButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isFetchingNextPage: boolean;
  theme?: Theme;
}
