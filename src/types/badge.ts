import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

import { Theme } from "./theme/theme";

export interface BadgeProps {
  label: ReactNode;
  icon?: LucideIcon;
  className?: string;
  theme?: Theme
}