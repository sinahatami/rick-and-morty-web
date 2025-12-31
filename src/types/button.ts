import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export type ThemeKey = 'character' | 'location' | 'episode';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  theme?: ThemeKey; // Added theme
  isLoading?: boolean;
  icon?: LucideIcon;
  className?: string;
}