'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, getThemeConfig } from '@/lib/theme-config';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('green');

  // Load theme from localStorage on initial render and apply to HTML element
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const currentThemeId = savedTheme || 'green';
    setThemeState(currentThemeId);
    
    // Apply theme to document element
    const root = document.documentElement;
    root.setAttribute('data-theme', currentThemeId);
    
    // Set CSS variables based on theme
    const themeConfig = getThemeConfig(currentThemeId);
    const { hue, saturation } = themeConfig;
    root.style.setProperty('--primary-hue', hue);
    root.style.setProperty('--primary-saturation', saturation);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply theme to document element
    const root = document.documentElement;
    root.setAttribute('data-theme', newTheme);
    
    // Set CSS variables based on theme
    const themeConfig = getThemeConfig(newTheme);
    const { hue, saturation } = themeConfig;
    root.style.setProperty('--primary-hue', hue);
    root.style.setProperty('--primary-saturation', saturation);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
