import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { getThemeStyles } from '~/lib/theme';
import { Theme } from '~/types/theme/theme';

interface ThemeContextType {
  theme: Theme;
  styles: ReturnType<typeof getThemeStyles>;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

const getThemeFromPath = (pathname: string): Theme => {
  if (pathname.startsWith('/locations')) return 'rick';
  if (pathname.startsWith('/episodes')) return 'morty';
  return 'portal';
};

export function ThemeProvider({ children, defaultTheme = 'portal' }: ThemeProviderProps) {
  const router = useRouter();

  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // update AFTER mount, but do not block render
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
