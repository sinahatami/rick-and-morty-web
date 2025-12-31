import { ReactNode } from "react";

import { Theme } from "~/types";

export interface DetailCardProps {
  children: ReactNode;
  theme?: Theme;
  className?: string;
}  