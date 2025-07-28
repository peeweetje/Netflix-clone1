import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DefaultTheme } from 'styled-components';
import { getSeason } from '../utils/seasons';
import { springTheme, summerTheme, autumnTheme, winterTheme } from '../styles/themes/themes';

interface ThemeContextType {
  theme: DefaultTheme;
  toggleTheme: () => void;
}

const themes = [springTheme, summerTheme, autumnTheme, winterTheme];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(getSeason(new Date()));
  const [themeIndex, setThemeIndex] = useState(themes.findIndex(t => t === getSeason(new Date())));

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isAutomatic) {
      interval = setInterval(() => {
        const newTheme = getSeason(new Date());
        setCurrentTheme(newTheme);
        setThemeIndex(themes.findIndex(t => t === newTheme));
      }, 60000); // Check every minute for season changes
    }
    return () => clearInterval(interval);
  }, [isAutomatic]);

  const toggleTheme = () => {
    setIsAutomatic(false); // Manual override
    const nextThemeIndex = (themeIndex + 1) % themes.length;
    setThemeIndex(nextThemeIndex);
    setCurrentTheme(themes[nextThemeIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
