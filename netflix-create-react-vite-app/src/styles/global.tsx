import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        margin: ${({ theme }) => theme.space[0]};
        padding: ${({ theme }) => theme.space[0]};
        font-family: ${({ theme }) => theme.fontFamily};
        background-color: ${({ theme }) => theme.colors.black};
        color: ${({ theme }) => theme.colors.white};
        overflow-x: hidden;
    }
    a {
        text-decoration: none;
        color: ${({ theme }) => theme.colors.primary};
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
