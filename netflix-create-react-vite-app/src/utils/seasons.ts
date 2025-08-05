import {
  autumnTheme,
  springTheme,
  summerTheme,
  winterTheme,
} from '../styles/themes/themes';

export const getSeason = (date: Date) => {
  const month = date.getMonth();

  if (month >= 2 && month <= 4) {
    return springTheme;
  }
  if (month >= 5 && month <= 7) {
    return summerTheme;
  }
  if (month >= 8 && month <= 10) {
    return autumnTheme;
  }
  return winterTheme;
};
