import { LucideIcon } from "lucide-react";

import { Theme } from "~/types";

export interface NotFoundStateProps {
  title: string;
  message?: string;
  backLabel?: string;
  icon?: LucideIcon;
  theme: Theme
}