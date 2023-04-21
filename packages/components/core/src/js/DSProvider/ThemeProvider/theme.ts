import { ThemeProps as SCThemeProps, useTheme as originalUseTheme } from 'styled-components';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import vars from './variables';
import breakpoints from './breakpoints';

export type ThemePropsVars = {
  variables: { [key: string]: string };
  palette: { [key: string]: string };
  variable: (name: string) => string | null;
  space: number[];
  colorsOrder: string[];
  breakpoints: string[];
};

export type ThemeProps = SCThemeProps<ThemePropsVars>;

export const useTheme = originalUseTheme as () => ThemePropsVars;

const getBreakpoints = (): string[] =>
  [breakpoints.small.max, breakpoints.medium.max, breakpoints.large.max].map(item => `${item}px`);

export const defaultColorsOrder = [
  'blue-600',
  'green-600',
  'mars-600',
  'purple-600',
  'cyan-600',
  'yellow-600',
  'violet-600',
  'blue-700',
  'green-700',
  'mars-700',
  'purple-700',
  'cyan-700',
  'yellow-700',
  'violet-700',
  'blue-500',
  'green-500',
  'mars-500',
  'purple-500',
  'cyan-500',
  'yellow-500',
  'violet-500',
] as const;

export type DefaultColor = typeof defaultColorsOrder[number];

const colorsOrder = defaultColorsOrder.map(color => vars.colors[color]);

const theme: ThemePropsVars = {
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
