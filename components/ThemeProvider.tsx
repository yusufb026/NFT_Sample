import { createContext, useContext, useEffect, useState, ReactNode, ReactElement, useCallback } from 'react';

export enum ThemeName {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}
export type UseThemeProps = {
  setTheme: (theme: ThemeName) => void;
  theme: ThemeName;
};

export type LeapUiProps = {
  readonly storageKey?: string;
  readonly themes?: ThemeName[];
  readonly defaultTheme?: ThemeName;
  readonly forcedTheme?: ThemeName;
  /** Components (usually the entire app) that use Leap UI. */
  readonly children?: ReactNode;
};
const ThemeContext = createContext<UseThemeProps>({
  theme: ThemeName.DARK,
  
  setTheme: (_) => {
    /**/
  },
});

export const useTheme = () => useContext(ThemeContext);

export default function LeapUiTheme({
  storageKey = 'theme',
  defaultTheme = ThemeName.DARK,
  forcedTheme,
  children,
}: LeapUiProps): ReactElement {
  const [theme, setThemeState] = useState<ThemeName>(defaultTheme);

  const applyTheme = useCallback(
    (theme: ThemeName) => {
      let newTheme = theme;
      if (newTheme === ThemeName.SYSTEM)
        newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeName.DARK : ThemeName.LIGHT;

      setThemeState(theme);
      const d = document.documentElement;
      d.classList.remove(...[ThemeName.DARK, ThemeName.LIGHT]);
      d.classList.add(newTheme);

      localStorage?.setItem(storageKey, theme);
    },
    [storageKey],
  );

  useEffect(() => {
    const theme = forcedTheme ?? (localStorage?.getItem(storageKey) as ThemeName) ?? defaultTheme;
    applyTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyTheme]);

  useEffect(() => {
    if (forcedTheme) applyTheme(forcedTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forcedTheme]);

  return (
    <ThemeContext.Provider
      value={{
        setTheme: applyTheme,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}