import { ReactNode } from 'react';

import { Theme } from '~/types';

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}
