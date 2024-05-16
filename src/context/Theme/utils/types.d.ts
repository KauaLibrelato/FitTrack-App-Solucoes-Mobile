export interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}
