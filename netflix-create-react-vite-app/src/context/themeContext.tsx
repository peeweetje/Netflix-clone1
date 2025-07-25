import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DefaultTheme } from 'styled-components';
import { purpleTheme, yellowTheme } from '../styles/themes/themes';

interface ThemeContextType {
  theme: DefaultTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(purpleTheme);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === purpleTheme ? yellowTheme : purpleTheme
    );
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
