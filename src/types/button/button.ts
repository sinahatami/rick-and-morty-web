import { LucideIcon } from "lucide-react";
import { Theme } from '~/types';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: Theme;
  isLoading?: boolean;
  icon?: LucideIcon;
}