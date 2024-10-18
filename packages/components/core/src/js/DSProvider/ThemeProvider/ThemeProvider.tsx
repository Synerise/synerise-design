import React, { ReactNode } from 'react';
import { ThemeProvider as ThemeProviderBase } from 'styled-components';

import dsTheme, { ThemePropsVars } from './theme';

export interface ThemeProviderProps {
  theme?: ThemePropsVars;
  children?: ReactNode
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { theme = dsTheme, children } = props;
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
