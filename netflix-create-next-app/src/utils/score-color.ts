export const colours = {
  Green: '#00796B', // Dark Teal
  Red: '#B00020', // Dark Red
  Orange: '#E65100', // Dark Orange
};

export type Values<T> = T[keyof T];

type Colors = Values<typeof colours>;

export const scoreColor = (score = 0): Colors | undefined => {
  if (score <= 5.9) {
    return colours.Red;
  }
  if (score <= 7.4) {
    return colours.Orange;
  }
  if (score <= 10) {
    return colours.Green;
  }
  return;
};
