import { ReactNode } from "react";
import { ThemeType } from "./constants";

export interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: VoidFunction;
}

export interface ThemeProviderProps {
  children: ReactNode;
}
