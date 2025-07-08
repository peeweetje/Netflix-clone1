export const colours = {
  Green: '#00FF00',
  Red: '#FF0000',
  Orange: '#FFA500',
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
