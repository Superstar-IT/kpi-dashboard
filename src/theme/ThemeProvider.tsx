import { FC, useState, createContext, useEffect, useMemo } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StylesProvider } from '@mui/styles';

export interface IThemeContext {
  setThemeName: (theme: String) => void;
  _themeName: string;
}

export const ThemeContext = createContext<IThemeContext>({
  _themeName: 'PureLightTheme',
  setThemeName: () => {}
});

const ThemeProviderWrapper: FC = (props) => {
  const [themeName, _setThemeName] = useState('PureLightTheme');

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem('appTheme') || 'PureLightTheme';
    _setThemeName(curThemeName);
  }, []);

  const theme = themeCreator(themeName);

  const setThemeName = (themeName: string): void => {
    window.localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  const setTheme = useMemo(
    () => ({
      setThemeName,
      _themeName: themeName
    }),
    [themeName]
  );

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setTheme}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
