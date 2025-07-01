import React, { type ReactNode } from 'react';
import { ThemeProvider as ThemeProviderBase } from 'styled-components';

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
      <>{children}</>
    </ThemeProviderBase>
  );
};

export default ThemeProvider;
