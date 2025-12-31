import { Theme } from "./theme";

export interface LoadMoreButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isFetchingNextPage: boolean;
  theme?: Theme;
}