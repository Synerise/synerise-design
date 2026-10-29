import {
  useTheme as originalUseTheme,
  type ThemeProps as SCThemeProps,
} from 'styled-components';

import { tokens } from '@synerise/ds-tokens';

import { breakpoints } from './breakpoints';
import vars from './variables';

export type ThemePropsVars = {
  variables: { [key: string]: string };
  palette: { [key: string]: string };
  // Fully-resolved design-token map keyed by CSS var name, e.g.
  // theme.tokens['--ds-color-text-base-default'] → '#384350'. Matches the tokens
  // injected by GlobalTokenStyles (currently the light theme).
  tokens: { [key: string]: string };
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
// Sourced from the design-tokens `ordered` set — 21 slots that match
// defaultColorsOrder one-for-one (7 hues x 600/700/500), verified value-identical
// to the legacy colors.less lookup.
//
// Deliberately the RESOLVED hex from `tokens`, not the `var(--ds-...)` strings from
// `@synerise/ds-tokens/names`: consumers feed colorsOrder straight into Highcharts,
// which renders SVG and does its own colour maths, so a CSS custom property would
// paint nothing. The palette lookup stays as a fallback if a slot is ever missing.
export const getColorsOrder = (
  tokenMap: { [key: string]: string } = tokens,
): string[] =>
  defaultColorsOrder.map(
    (color, index) =>
      tokenMap[`--ds-color-ordered-${index + 1}-base`] ?? vars.colors[color],
  );

// Static default (light). ThemeProvider recomputes this from the active mode's token
// map so charts follow a dark-mode switch — the ordered slots genuinely differ per
// theme (slot 1 is #0b68ff light, #7fb8e8 dark).
const colorsOrder = getColorsOrder();

export const theme: ThemePropsVars = {
  variables: vars.variables,
  palette: vars.colors,
  tokens,
  breakpoints: getBreakpoints(),
  space: [0, 8, 12, 16, 24, 32, 48, 64],
  colorsOrder,
  variable: function variable(name: string): string | null {
    return name ? this.variables[name.slice(1)] : null;
  },
};

export const themeVariables = vars.variables;

export default theme;
