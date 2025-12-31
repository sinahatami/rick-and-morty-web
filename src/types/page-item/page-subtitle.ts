import { Theme } from "../theme/theme";

export interface PageSubtitleProps {
  prefix: string;
  highlight: string | number;
  suffix: string;
  colorClass?: string;
  decorationClass?: string;
  theme?: Theme
}