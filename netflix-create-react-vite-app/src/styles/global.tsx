import { createGlobalStyle, DefaultTheme } from 'styled-components';

 export interface ThemeProps {
    theme: DefaultTheme;
}

export const GlobalStyle = createGlobalStyle<ThemeProps>`
    body {
        margin: ${(props: ThemeProps) => props.theme.space[0]};
        padding: ${(props: ThemeProps) => props.theme.space[0]};
        font-family: ${(props: ThemeProps) => props.theme.fontFamily};
        background-color: ${(props: ThemeProps) => props.theme.colors.black};
        color: ${(props: ThemeProps) => props.theme.colors.white};
        overflow-x: hidden;
    }
    a {
        text-decoration: none;
        color: ${(props: ThemeProps) => props.theme.colors.primary};
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
