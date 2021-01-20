import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #333;
}
a {
    text-decoration: none;
    color:  #8eb3cc;
}
ul {
    list-style: none;
    padding: 1rem;
  }
* {
    box-sizing: border-box;
}
`;
