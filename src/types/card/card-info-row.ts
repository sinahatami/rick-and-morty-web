import { LucideIcon } from "lucide-react";

export interface CardInfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  className?: string;
  onClick?: () => void;
}