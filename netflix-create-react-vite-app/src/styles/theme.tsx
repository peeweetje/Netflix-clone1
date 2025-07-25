import type { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      grey: string;
      black: string;
      white: string;
      blue: string;
      red: string;
      orange: string;
      green: string;
      primary: string;
      lightPurple: string;
      yellow: string;
      buttonText: string;
    };
    fontFamily: string;
    space: string[];
    fontSize: string[];
    borderRadius: string[];
    boderShadow: string[];
    lineHeight: string[];
  }
}


