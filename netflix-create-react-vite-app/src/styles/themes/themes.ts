import type { DefaultTheme } from 'styled-components';

const baseTheme = {
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
  fontSize: [
    '0.5rem',
    '0.7rem',
    '0.8rem',
    '1rem',
    '1.25rem',
    '1.5rem',
    '2rem',
    '2.5rem',
  ],
  borderRadius: ['2px', '4px', '6px', '8px'],
  borderShadow: ['0 25px 100px -10px rgba(169, 154, 154, 0.54)'],
  lineHeight: ['1.2', '1.3', '1.4', '1.5', '1.8', '2'],
  breakpoints: {
    sm: '768px',
    md: '992px',
    lg: '1024px',
    xl: '1200px',
  },
};

export const springTheme: DefaultTheme = {
  name: 'spring',
  ...baseTheme,
  colors: {
    primary: '#4CAF50', // Green
    primaryLight: '#81C784',
    black: '#000',
    white: '#fff',
    grey: '#333',
    blue: '#8EB3CC',
    yellow: '#ffff00',
    red: '#ff0000',
    orange: '#FFA500',
    green: '#00FF00',
    buttonText: '#fff',
  },
  icons: {
    leafIcon: false,
    flowerIcon: true,
    butterflyIcon: true,
  },
};

export const summerTheme: DefaultTheme = {
  name: 'summer',
  ...baseTheme,
  colors: {
    primary: '#FFC107', // Amber
    primaryLight: '#FFD54F',
    black: '#000',
    white: '#fff',
    grey: '#333',
    blue: '#8EB3CC',
    yellow: '#ffff00',
    red: '#ff0000',
    orange: '#FFA500',
    green: '#00FF00',
    buttonText: '#000',
  },
  icons: {
    leafIcon: false,
    flowerIcon: false,
    butterflyIcon: false,
  },
};

export const autumnTheme: DefaultTheme = {
  name: 'autumn',
  ...baseTheme,
  colors: {
    primary: '#FF5722', // Deep Orange
    primaryLight: '#FF8A65',
    black: '#000',
    white: '#fff',
    grey: '#333',
    blue: '#8EB3CC',
    yellow: '#ffff00',
    red: '#ff0000',
    orange: '#FFA500',
    green: '#00FF00',
    buttonText: '#fff',
  },
  icons: {
    leafIcon: true,
    flowerIcon: true,
    butterflyIcon: false,
  },
};

export const winterTheme: DefaultTheme = {
  name: 'winter',
  ...baseTheme,
  colors: {
    primary: '#2196F3', // Blue
    primaryLight: '#64B5F6',
    black: '#000',
    white: '#fff',
    grey: '#333',
    blue: '#8EB3CC',
    yellow: '#ffff00',
    red: '#ff0000',
    orange: '#FFA500',
    green: '#00FF00',
    buttonText: '#fff',
  },
  icons: {
    leafIcon: false,
    flowerIcon: false,
    butterflyIcon: false,
  },
};
