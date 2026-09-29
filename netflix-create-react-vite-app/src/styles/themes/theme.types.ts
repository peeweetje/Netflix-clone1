export interface AppTheme {
  name: string;
  fontFamily: string;
  space: string[];
  fontSize: string[];
  borderRadius: string[];
  borderShadow: string[];
  lineHeight: string[];
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  colors: {
    grey: string;
    black: string;
    white: string;
    blue: string;
    red: string;
    orange: string;
    green: string;
    primary: string;
    primaryLight: string;
    yellow: string;
    buttonText: string;
  };
  icons: {
    leafIcon: boolean;
    flowerIcon: boolean;
    butterflyIcon: boolean;
  };
}