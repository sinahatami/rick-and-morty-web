import { ReactNode } from "react";

import { Theme } from "~/types";

export interface BaseCardProps {
  children: ReactNode;
  href: string;
  theme?: Theme;
  className?: string;
}