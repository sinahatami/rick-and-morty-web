import { LucideIcon } from "lucide-react";
import { Theme } from "./theme";

export interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  theme?: Theme;
  className?: string;
}