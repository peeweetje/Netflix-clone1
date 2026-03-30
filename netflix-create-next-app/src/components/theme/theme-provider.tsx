'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from '../../utils/types/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { attribute, defaultTheme, enableSystem, disableTransitionOnChange } = props;
  
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </NextThemesProvider>
  );
}
