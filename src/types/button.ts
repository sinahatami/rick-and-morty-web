import { LucideIcon } from "lucide-react";
import { Theme } from "./theme/theme";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: Theme;
  isLoading?: boolean;
  icon?: LucideIcon;
}