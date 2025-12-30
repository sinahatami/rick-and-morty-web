export interface EmptyStateProps {
  title: string;
  description: string;
  onClearFilters: () => void;
  showClearButton?: boolean;
  buttonText?: string;
}