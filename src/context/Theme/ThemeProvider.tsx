import React, {useEffect, useState} from 'react';
import {ThemeProvider as ThemeProviderStyled} from 'styled-components';
import {ThemeContext} from './ThemeContext';
import {ThemeType, themes} from './utils';
import {ThemeProviderProps} from './utils/types';

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  const [theme, setTheme] = useState(ThemeType.light);

  useEffect(() => {
    loadTheme();
  }, []);

  function loadTheme() {
    //Lógica para buscar do storage o tema salvo
    const savedTheme = 'light';
    if (savedTheme) {
      setTheme(ThemeType.light);
    }
  }

  function toggleTheme() {
    let newTheme;
    if (theme === ThemeType.light) {
      newTheme = ThemeType.dark;
    } else {
      newTheme = ThemeType.light;
    }
    //Lógica para guardar no storage o tema selecionado
    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <ThemeProviderStyled theme={themes[theme]}>
        {children}
      </ThemeProviderStyled>
    </ThemeContext.Provider>
  );
};
