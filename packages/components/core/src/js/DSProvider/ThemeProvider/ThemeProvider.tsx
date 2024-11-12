import React, { ReactNode } from 'react';
import { ThemeProvider as ThemeProviderBase } from 'styled-components';

import dsTheme, { ThemePropsVars } from './theme';

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
