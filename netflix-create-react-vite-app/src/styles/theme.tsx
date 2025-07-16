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
    };
    fontFamily: string;
    space: string[];
    fontSize: string[];
    borderRadius: string[];
    boderShadow: string[];
    lineHeight: string[];
  }
}

export const theme: DefaultTheme = {
  colors: {
    grey: '#333',
    black: '#000',
    white: '#fff',
    blue: '#8EB3CC',
    red: '#ff0000',
    orange: '#FFA500',
    green: '#00FF00',
  },
  fontFamily: 'Montserrat, sans-serif',
  space: [
    '0px',
    '2px',
    '4px',
    '6px',
    '8px',
    '12px',
    '16px',
    '18px',
    '20px',
    '24px',
    '32px',
    '40px',
    '64px',
    '128px',
    '256px',
    '512px',
  ],
  fontSize: ['0.5rem', '0.7rem', '0.8rem', '1rem', '1.25rem', '1.5rem', '2rem'],
  borderRadius: ['2px', '4px', '6px', '8px'],
  boderShadow: ['0 25px 50px -12px rgba(169, 154, 154, 0.54)'],
  lineHeight: ['1.2', '1.3', '1.4', '1.5', '1.8', '2'],
};
