import { tokens as darkTokens } from '@synerise/ds-tokens/dark';
import { tokens as lightTokens } from '@synerise/ds-tokens/light';

export type DsTheme = 'light' | 'dark';

export const PRIMARY_HUES = ['blue', 'grey'];
export const SECONDARY_HUES = [
  'yellow',
  'orange',
  'mars',
  'red',
  'pink',
  'violet',
  'purple',
  'cyan',
  'fern',
  'green',
];

export type SwatchGroup = {
  title: string;
  prefix: string;
  colors: Record<string, string>;
};

const tokensFor = (theme: DsTheme) =>
  theme === 'dark' ? darkTokens : lightTokens;

const pickByPrefix = (theme: DsTheme, prefix: string) =>
  Object.fromEntries(
    Object.entries(tokensFor(theme))
      .filter(([name]) => name.startsWith(prefix))
      .map(([name, value]) => [name.slice(prefix.length), value]),
  );

export const getKeyColors = (theme: DsTheme) => {
  const all = tokensFor(theme);
  return Object.fromEntries(
    ['brand', 'neutral', 'success', 'warning', 'danger'].map((role) => [
      role,
      all[`--ds-color-background-${role}-solid`],
    ]),
  );
};

// --ds-color-custom-<hue>-<step> resolves to the light primitive ramp in the light theme
// and to the color-dark-* ramp in the dark theme.
export const getPaletteRamp = (theme: DsTheme, hue: string): SwatchGroup => {
  const prefix = `--ds-color-custom-${hue}-`;
  return {
    title: hue.charAt(0).toUpperCase() + hue.slice(1),
    prefix: `${prefix}*`,
    colors: pickByPrefix(theme, prefix),
  };
};

export const getSemanticGroups = (
  theme: DsTheme,
  category: string,
): SwatchGroup[] => {
  const categoryPrefix = `--ds-color-${category}-`;
  const roles = new Set(
    Object.keys(tokensFor(theme))
      .filter((name) => name.startsWith(categoryPrefix))
      .map((name) => name.slice(categoryPrefix.length).split('-')[0]),
  );
  return [...roles].map((role) => {
    const prefix = `${categoryPrefix}${role}-`;
    return {
      title: role,
      prefix: `${prefix}*`,
      colors: pickByPrefix(theme, prefix),
    };
  });
};
