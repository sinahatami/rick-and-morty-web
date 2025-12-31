import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { Theme } from "./theme";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  theme?: Theme; // Added theme
  isLoading?: boolean;
  icon?: LucideIcon;
  className?: string;
}