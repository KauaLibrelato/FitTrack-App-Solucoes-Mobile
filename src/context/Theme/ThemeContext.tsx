import {createContext} from 'react';
import {ThemeType} from './utils';
import {ThemeContextProps} from './utils/types';

export const ThemeContext = createContext<ThemeContextProps>({
  theme: ThemeType.light,
  toggleTheme: () => {},
});
