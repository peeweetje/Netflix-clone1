export const colours = {
  Green: "#00FF00",
  Red: "#FF0000",
  Orange: "#FFA500",
} as const;

export type Values<T> = T[keyof T];

type Colors = Values<typeof colours>;

export const scoreColor = (score: number) => {
  let color: Colors | undefined = undefined;
  let roundedScore = Math.floor(score * 10) / 10;
  if (roundedScore <= 5.9) {
    color = colours.Red;
  } else if (roundedScore >= 6.0 && roundedScore <= 7.4) {
    color = colours.Orange;
  } else if (roundedScore >= 7.5 && roundedScore <= 10) {
    color = colours.Green;
  }

  return color;
};
