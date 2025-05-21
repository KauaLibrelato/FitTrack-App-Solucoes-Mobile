import React, { useEffect, useMemo, useState } from "react";
import { ThemeProvider as ThemeProviderStyled } from "styled-components";
import { ThemeContext } from "./ThemeContext";
import { ThemeType, themes } from "./utils";
import { ThemeProviderProps } from "./utils/types";

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(ThemeType.dark);

  useEffect(() => {
    loadTheme();
  }, []);

  function loadTheme() {
    const savedTheme = "dark";
    if (savedTheme) {
      setTheme(ThemeType.dark);
    }
  }

  function toggleTheme() {
    let newTheme;
    if (theme === ThemeType.light) {
      newTheme = ThemeType.dark;
    } else {
      newTheme = ThemeType.light;
    }
    setTheme(newTheme);
  }

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProviderStyled theme={themes[theme]}>{children}</ThemeProviderStyled>
    </ThemeContext.Provider>
  );
};
