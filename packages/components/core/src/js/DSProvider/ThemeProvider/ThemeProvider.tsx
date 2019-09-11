import * as React from 'react';
import { ThemeProvider as ThemeProviderBase } from 'styled-components';

import dsTheme from './theme';

export interface ThemeProviderProps {
  theme?: unknown;
}

const ThemeProvider: React.FC<ThemeProviderProps> = props => {
  const { theme, children } = props;
  return (
    <ThemeProviderBase
      theme={{
        ...dsTheme,
        ...theme,
      }}
    >
      {children}
    </ThemeProviderBase>
  );
};

ThemeProvider.defaultProps = {
  theme: {},
};
export default ThemeProvider;
