import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';

import { getThemeStyles } from '~/lib/theme';
import { ThemeContextType, Theme } from '~/types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'portal' }: ThemeProviderProps) {
  const router = useRouter();

  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    if (!router.isReady) return;

    if (router.pathname.startsWith('/locations')) setTheme('rick');
    else if (router.pathname.startsWith('/episodes')) setTheme('morty');
    else setTheme('portal');
  }, [router.isReady, router.pathname]);

  const styles = getThemeStyles(theme);

  return (
    <ThemeContext.Provider value={{ theme, styles, setTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
