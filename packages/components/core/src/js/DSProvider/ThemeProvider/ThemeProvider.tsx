import * as React from 'react';
import { ThemeProvider as ThemeProviderBase } from 'styled-components';

import { theme as dsTheme } from './theme';

export interface ThemeProviderProps {
  theme?: unknown;
}

export class ThemeProvider extends React.Component<ThemeProviderProps> {
  static defaultProps = {
    theme: {},
  };

  render() {
    const { theme, children } = this.props;
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
  }
}
