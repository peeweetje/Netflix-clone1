import { springTheme, summerTheme, autumnTheme, winterTheme } from '../styles/themes/themes';

export const getSeason = (date: Date) => {
  const month = date.getMonth();

  if (month >= 2 && month <= 4) {
    return springTheme;
  } else if (month >= 5 && month <= 7) {
    return summerTheme;
  } else if (month >= 8 && month <= 10) {
    return autumnTheme;
  } else {
    return winterTheme;
  }
};