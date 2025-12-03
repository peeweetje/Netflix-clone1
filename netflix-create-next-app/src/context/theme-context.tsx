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

  // Helper to convert hex to HSL
  const hexToHSL = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

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
    const hsl = hexToHSL(themeConfig.primaryColor);
    if (hsl) {
      root.style.setProperty('--primary', `hsl(${hsl.h} ${hsl.s}% ${hsl.l}%)`);
      root.style.setProperty('--ring', `hsl(${hsl.h} ${hsl.s}% ${hsl.l}%)`);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply theme to document element
    const root = document.documentElement;
    root.setAttribute('data-theme', newTheme);
    
    // Set CSS variables based on theme
    const themeConfig = getThemeConfig(newTheme);
    const hsl = hexToHSL(themeConfig.primaryColor);
    if (hsl) {
      root.style.setProperty('--primary', `hsl(${hsl.h} ${hsl.s}% ${hsl.l}%)`);
      root.style.setProperty('--ring', `hsl(${hsl.h} ${hsl.s}% ${hsl.l}%)`);
    }
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
