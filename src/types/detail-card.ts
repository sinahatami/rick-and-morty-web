import { ReactNode } from "react";

import { Theme } from "./theme";

export interface DetailCardProps {
  children: ReactNode;
  theme?: Theme;
  className?: string;
}  