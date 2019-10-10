import vars from './variables';
import breakpoints from './breakpoints';

export type ThemeProps = {
  variables: { [key: string]: string };
  palette: { [key: string]: string };
  variable: (name: string) => string | null;
  space: number[];
  breakpoints: string[];
};

const getBreakpoints = (): string[] =>
  [breakpoints.small.max, breakpoints.medium.max, breakpoints.large.max].map(item => `${item}px`);

const theme: ThemeProps = {
  variables: vars.variables,
  palette: vars.colors,
  breakpoints: getBreakpoints(),
  space: [0, 8, 12, 16, 24, 32, 48, 64],
  variable: function variable(name: string): string | null {
    return name ? this.variables[name.slice(1)] : null;
  },
};

export default theme;
