import {
  autumnTheme,
  springTheme,
  summerTheme,
  winterTheme,
} from '../styles/themes/themes';

export const getSeason = (date: Date) => {
  const month = date.getMonth();
  const day = date.getDate();

  // Spring: March 20 - June 20
  if ((month === 2 && day >= 20) || (month === 3) || (month === 4) || (month === 5 && day <= 20)) {
    return springTheme;
  }
  // Summer: June 21 - September 22
  if ((month === 5 && day >= 21) || (month === 6) || (month === 7) || (month === 8 && day <= 22)) {
    return summerTheme;
  }
  // Autumn: September 23 - December 20
  if ((month === 8 && day >= 23) || (month === 9) || (month === 10) || (month === 11 && day <= 20)) {
    return autumnTheme;
  }
  // Winter: December 21 - March 19
  return winterTheme;
};
