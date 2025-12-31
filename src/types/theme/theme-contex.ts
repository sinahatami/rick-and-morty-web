import { getThemeStyles } from "~/lib/theme";
import { Theme } from "./theme";

export interface ThemeContextType {
  theme: Theme;
  styles: ReturnType<typeof getThemeStyles>;
  setTheme: (theme: Theme) => void;
}