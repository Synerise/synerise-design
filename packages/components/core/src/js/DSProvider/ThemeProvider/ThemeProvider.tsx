import React, { type ReactNode } from 'react';
import { ThemeProvider as ThemeProviderBase } from 'styled-components';

import { GlobalTokenStyles } from './GlobalTokenStyles';
import dsTheme, { type ThemePropsVars } from './theme';

export type ThemeProviderProps = {
  theme?: ThemePropsVars;
  children?: ReactNode;
};

const ThemeProvider = ({ theme = dsTheme, children }: ThemeProviderProps) => {
  return (
    <ThemeProviderBase
      theme={{
        ...dsTheme,
        ...theme,
      }}
    >
      <GlobalTokenStyles />
      {children}
    </ThemeProviderBase>
  );
};

export default ThemeProvider;
