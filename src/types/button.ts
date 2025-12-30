import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

import { Variant } from "./variant";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  isLoading?: boolean;
  icon?: LucideIcon;
  className?: string;
} 