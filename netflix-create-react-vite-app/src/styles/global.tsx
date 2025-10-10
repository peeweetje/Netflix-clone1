import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

body {
    margin: ${(props) => props.theme.space[0]};
    padding: ${(props) => props.theme.space[0]};
    font-family:${(props) => props.theme.fontFamily};
    background-color:${(props) => props.theme.colors.black};
    color:${(props) => props.theme.colors.white};
    overflow-x: hidden;
}
a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};
}
ul {
    list-style: none;
  }
* {
    box-sizing: border-box;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
`;
