import {darkTheme, lightTheme} from '../../../theme';

export enum ThemeType {
  light = 'light',
  dark = 'dark',
}
export const themes = {
  [ThemeType.light]: lightTheme,
  [ThemeType.dark]: darkTheme,
};
