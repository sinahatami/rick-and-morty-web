import { Theme } from "../theme";

export interface FilterPanelProps {
  filters: Record<string, string | undefined>;
  filterOptions: Record<string, string[]>;
  onFilterChange: (filters: Record<string, string | undefined>) => void;
  onClose?: () => void;
  theme: Theme
}