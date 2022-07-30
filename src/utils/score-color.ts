

export type Colours = '#00FF00' | '#FF0000' | '#FFA500';
const GREEN: Colours = '#00FF00';
const RED: Colours = '#FF0000';
const ORANGE: Colours = '#FFA500';


 export const scoreColor = (score: number = 0) => {
  let color = undefined;
    if (score <= 5.9) {
     color = RED
    } else if (score >= 6.0 && score <= 7.4) {
      color = ORANGE
    } else if (score >= 7.5 && score <= 10) {
      color = GREEN
    }
    return color;
} 

 
 


