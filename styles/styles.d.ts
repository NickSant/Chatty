import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      background_alt: string;
      bg_chat: string;
      lighty: string;
      text: string;
    };
  }
}
