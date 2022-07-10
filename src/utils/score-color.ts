


enum Colours {
  RED = '#ff0000',
  ORANGE = '#FFA500',
  GREEN = '#00FF00'
}

 export const scoreColor = (score: number = 0) => {
  let colors = undefined;
    if (score <= 5.9) {
     colors = Colours.RED
    } else if (score >= 6.0 && score <= 7.9) {
      colors = Colours.ORANGE
    } else if (score >= 8.0 && score <= 10) {
      colors = Colours.GREEN
    }
    return colors;
} 
 


