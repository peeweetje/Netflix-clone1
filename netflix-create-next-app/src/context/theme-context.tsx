'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'green' | 'blue' | 'purple' | 'red'| 'yellow';

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
    const currentTheme = savedTheme || 'green';
    setThemeState(currentTheme);
    
    // Apply theme to document element
    const root = document.documentElement;
    root.setAttribute('data-theme', currentTheme);
    
    // Set CSS variables based on theme
    const themes = {
      green: { hue: '142', saturation: '71%' },
      blue: { hue: '217', saturation: '91%' },
      purple: { hue: '262', saturation: '83%' },
      red: { hue: '0', saturation: '84%' },
      yellow: { hue: '48', saturation: '100%' }
    };

    const themeConfig = themes[currentTheme] || themes.green;
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
    const themes = {
      green: { hue: '142', saturation: '71%' },
      blue: { hue: '217', saturation: '91%' },
      purple: { hue: '262', saturation: '83%' },
      red: { hue: '0', saturation: '84%' },
      yellow: { hue: '48', saturation: '100%' },
    };
    
    const { hue, saturation } = themes[newTheme];
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
