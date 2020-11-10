import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #333;
    font-family: 'Roboto'
}
a {
    text-decoration: none;
    color:  #8eb3cc;
}
ul {
    list-style: none;
  }
* {
    box-sizing: border-box;
}
`;
