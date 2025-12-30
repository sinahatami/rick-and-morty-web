import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

import { Variant } from "./variant";

export interface BadgeProps {
  label: ReactNode;
  icon?: LucideIcon;
  variant?: Variant;
  className?: string;
}