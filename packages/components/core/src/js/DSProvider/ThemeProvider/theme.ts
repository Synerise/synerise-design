import {
  type ThemeProps as SCThemeProps,
  useTheme as originalUseTheme,
} from 'styled-components';

import breakpoints from './breakpoints';
import vars from './variables';

export type ThemePropsVars = {
  variables: { [key: string]: string };
  palette: { [key: string]: string };
  variable: (name: string) => string | null;
  space: number[];
  colorsOrder: string[];
  breakpoints: string[];
};

export type ThemeProps = SCThemeProps<ThemePropsVars>;

export type WithTheme = SCThemeProps<ThemePropsVars>;

export const useTheme = originalUseTheme as () => ThemePropsVars;

const getBreakpoints = (): string[] =>
  [breakpoints.small.max, breakpoints.medium.max, breakpoints.large.max].map(
    (item) => `${item}px`,
  );

export const defaultColorsOrder = [
  'blue-600',
  'green-600',
  'yellow-600',
  'purple-600',
  'cyan-600',
  'orange-600',
  'violet-600',
  'blue-700',
  'green-700',
  'yellow-700',
  'purple-700',
  'cyan-700',
  'orange-700',
  'violet-700',
  'blue-500',
  'green-500',
  'yellow-500',
  'purple-500',
  'cyan-500',
  'orange-500',
  'violet-500',
] as const;

export type DefaultColor = (typeof defaultColorsOrder)[number];
const colorsOrder = defaultColorsOrder.map((color) => vars.colors[color]);

export const theme: ThemePropsVars = {
  variables: vars.variables,
  palette: vars.colors,
  breakpoints: getBreakpoints(),
  space: [0, 8, 12, 16, 24, 32, 48, 64],
  colorsOrder,
  variable: function variable(name: string): string | null {
    return name ? this.variables[name.slice(1)] : null;
  },
};

export default theme;
