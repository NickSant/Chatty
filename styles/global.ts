import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    a {
    color: inherit;
    text-decoration: none;
    }

    * {
    box-sizing: border-box;
    }

    .MuiPaper-root,
    .MuiDrawer-paper,
    .MuiDrawer-paperAnchorLeft,
    .MuiDrawer-paperAnchorDockedLeft,
    .MuiDrawer-docked {
    height: 100vh;
    }

    body, html{
        background-color: ${(props) => props.theme.colors.background}
    }
`;
