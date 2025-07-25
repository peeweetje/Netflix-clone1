import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

body {
    margin: ${(props) => props.theme.space[0]};
    padding: ${(props) => props.theme.space[0]};
    font-family:${(props) => props.theme.fontFamily};
    background-color:${(props) => props.theme.colors.black};
    color:${(props) => props.theme.colors.white}
}
a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.purple};
}
ul {
    list-style: none;
  }
* {
    box-sizing: border-box;
}
`;
