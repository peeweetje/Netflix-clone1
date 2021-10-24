import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
        black: string;
        white: string;
        blue:string;
      }; 
      fontFamily:string[]
      space:string[]
      fontSize:string[]
      borderRadius:string[]
  }
}