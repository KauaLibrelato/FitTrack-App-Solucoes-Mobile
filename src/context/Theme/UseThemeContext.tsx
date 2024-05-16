import {useContext} from 'react';
import {ThemeContext} from './ThemeContext';

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);

  return themeContext;
};
