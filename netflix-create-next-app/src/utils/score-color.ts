export const colours = {
  Green: 'bg-teal-700', // Dark Teal
  Red: 'bg-red-700', // Dark Red
  Orange: 'bg-orange-600', // Dark Orange
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
