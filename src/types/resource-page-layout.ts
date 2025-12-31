import { ReactNode } from "react";
import { Theme } from "./theme/theme";

export interface ResourcePageLayoutProps<T> {
  items: T[];
  isLoading: boolean;
  totalCount: number;
  title: string;
  subtitle?: ReactNode;
  headerExtra?: ReactNode;
  controls: ReactNode;
  activeFilters?: ReactNode;
  onClearFilters: () => void;
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  renderItem: (item: T) => ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  theme?: Theme
}