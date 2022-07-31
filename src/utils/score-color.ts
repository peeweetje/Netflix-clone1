


 export const colours = {
  Green: '#00FF00',
  Red: '#FF0000',
  Orange: '#FFA500'
}as const

 export type Values<T> = T[keyof T];

 type Colors =  Values<typeof colours>;

 export const scoreColor = (score: number = 0) => {
  let color: Colors | undefined = undefined
    if (score <= 5.9) {
    color = colours.Red
    } else if (score >= 6.0 && score <= 7.4) {
      color = colours.Orange
    } else if (score >= 7.5 && score <= 10) {
      color = colours.Green
    }
    return color;
} 

 
 


