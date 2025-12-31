import { LucideIcon } from "lucide-react";

import { Theme } from "./theme";

export interface NotFoundStateProps {
  title: string;
  message?: string;
  backLabel?: string;
  icon?: LucideIcon;
  theme: Theme
}