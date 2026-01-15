import { Theme } from '~/types';

export interface EmptyStateProps {
  title: string;
  isError?: boolean;
  description: string;
  onClearFilters: () => void;
  showClearButton?: boolean;
  buttonText?: string;
  theme: Theme;
}
