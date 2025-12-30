import { ReactNode } from "react";
import { Theme } from "./theme";

export interface BaseCardProps {
  children: ReactNode;
  href: string;
  theme?: Theme;
  className?: string;
}