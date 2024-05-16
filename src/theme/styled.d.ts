import 'styled-components';

declare module 'styled-components' {
  export interface DesignSystem {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    secondaryDark: string;
    secondaryLight: string;
    success: string;
    successDark: string;
    successLight: string;
    warning: string;
    warningDark: string;
    warningLight: string;
    error: string;
    errorDark: string;
    errorLight: string;
    accent: string;
    background: string;
    text: string;
    border: string;
  }

  export interface DefaultTheme {
    colors: DesignSystem;
  }
}
