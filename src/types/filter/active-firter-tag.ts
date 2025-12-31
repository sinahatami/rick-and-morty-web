import { Theme } from "../theme/theme";

export interface ActiveFilterTagsProps {
  filters: Record<string, string | undefined>;
  onRemove: (key: string) => void;
  onClearAll: () => void;
  searchQuery?: string;
  onClearSearch?: () => void;
  theme?: Theme
}