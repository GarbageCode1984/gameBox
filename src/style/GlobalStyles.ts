import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'CookieRun-Regular';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/CookieRun-Regular.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: #d1daea
    }
`;
