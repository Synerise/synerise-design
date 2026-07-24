import { customColors } from '@synerise/ds-tokens/names';

import { type CustomColorShade } from './customColor.types';

// True when the value is an already-resolved CSS colour — a `var()` token or a literal hex — so it
// can be used verbatim rather than mapped from a palette key.
export const isResolvedColor = (value?: string): boolean =>
  !!value && (value.startsWith('var(') || value.startsWith('#'));

export type ResolveCustomColorOptions = {
  // Shade used for a bare-name input (`'grey'` → this shade). Defaults to `'600'`.
  defaultShade?: CustomColorShade;
  // Shift the shade by ±100 steps (e.g. `-100` for a lighter hover variant).
  shadeShift?: number;
  // Return an already-resolved `var()`/hex value verbatim instead of trying to map it.
  passthroughResolved?: boolean;
};

// Map a custom-colour name or name-shade string (`'grey'`, `'blue-600'`) to its reversible
// `--ds-color-background-custom-*` token (light/dark aware, via @synerise/ds-tokens). Anything that
// doesn't resolve to a known name+shade returns `fallback` — never an undefined lookup, and never
// `theme.palette` (which is being retired). Shared by any DS component or consumer app that accepts a
// categorical colour value (slider `tracksColorMap`, card-tabs `color`, …).
export const resolveCustomColor = (
  value: string | undefined,
  fallback: string,
  options: ResolveCustomColorOptions = {},
): string => {
  const {
    defaultShade = '600',
    shadeShift = 0,
    passthroughResolved = false,
  } = options;

  if (!value) {
    return fallback;
  }
  if (passthroughResolved && isResolvedColor(value)) {
    return value;
  }

  const dash = value.lastIndexOf('-');
  const shadeStr = dash === -1 ? '' : value.slice(dash + 1);
  const hasShade = /^\d{2,3}$/.test(shadeStr);
  const name = hasShade ? value.slice(0, dash) : value;
  const shade = hasShade ? Number(shadeStr) : Number(defaultShade);

  const shades = customColors[name];
  return (
    shades?.[String(shade + shadeShift)] ?? shades?.[String(shade)] ?? fallback
  );
};
