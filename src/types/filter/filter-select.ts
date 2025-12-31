import { Theme } from "../theme";

export interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  theme?: Theme
}