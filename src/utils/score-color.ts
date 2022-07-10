


enum Colours {
  RED = '#ff0000',
  ORANGE = '#FFA500',
  GREEN = '#00FF00'
}

 export const scoreColor = (score: number = 0) => {
  let colors = undefined;
    if (score <= 5.9) {
     colors = Colours.RED
    } else if (score >= 6.0 && score <= 7.4) {
      colors = Colours.ORANGE
    } else if (score >= 7.5 && score <= 10) {
      colors = Colours.GREEN
    }
    return colors;
} 
 


