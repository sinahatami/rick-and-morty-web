import { Theme } from "./theme/theme";

export interface LoadMoreButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isFetchingNextPage: boolean;
  theme?: Theme;
}