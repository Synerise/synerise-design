import * as React from 'react';
import { ThemeProvider as ThemeProviderBase } from 'styled-components';

import dsTheme, { ThemeProps } from './theme';

export interface ThemeProviderProps {
  theme?: ThemeProps;
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
  theme: dsTheme,
};
export default ThemeProvider;
