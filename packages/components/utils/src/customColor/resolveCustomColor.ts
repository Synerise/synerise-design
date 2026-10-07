import { customColors } from '@synerise/ds-tokens/names';

import type { CustomColorShade } from './customColor.types';

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

const warnedValues = new Set<string>();

// A value that is not a custom-colour name but is still a legitimate CSS colour (named colour, rgb(),
// hsl(), keyword…) must not trigger the warning. `CSS.supports` is the exact check; where it is
// missing (SSR, jsdom) only the obvious function / hex / keyword forms are let through.
const isCssColor = (value: string): boolean => {
  if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
    return CSS.supports('color', value);
  }
  return /^(#|var\(|rgba?\(|hsla?\(|lch\(|oklch\(|color\(|color-mix\()|^(transparent|currentcolor|inherit|initial|unset)$/i.test(
    value,
  );
};

// Before the palette was retired an unknown name resolved to `undefined`, which styled-components
// drops, so the colour silently vanished. That outcome is kept (no fallback, no invented colour); the
// warning makes the typo visible without changing what renders. Once per distinct value and not gated
// on NODE_ENV: the library build inlines `process.env.NODE_ENV`, which would make a dev-only check dead
// code for consumers, and a mistyped colour name is rare enough to be worth surfacing in any build.
const warnUnresolved = (value: string) => {
  if (warnedValues.has(value) || isCssColor(value)) {
    return;
  }
  warnedValues.add(value);
  // biome-ignore lint/suspicious/noConsole: diagnostic for an unresolved colour name
  console.warn(
    `[ds-utils] resolveCustomColor: "${value}" is not a custom colour (expected one of the families with a 50-900 shade, e.g. "blue-600") nor a CSS colour.`,
  );
};

// Map a custom-colour name or name-shade string (`'grey'`, `'blue-600'`) to its reversible
// `--ds-color-custom-*` token (light/dark aware, via @synerise/ds-tokens). A value that does not
// resolve returns `fallback`, or `undefined` when none is given — never an undefined lookup, never
// `theme.palette` (which is being retired). Pass a fallback only where a component has a sensible
// default; without one the CSS declaration is simply dropped, as it was for an unknown palette key.
// Shared by any DS component or consumer app that accepts a categorical colour value (slider
// `tracksColorMap`, card-tabs `color`, …).
export function resolveCustomColor(
  value: string | undefined,
  fallback: string,
  options?: ResolveCustomColorOptions,
): string;
export function resolveCustomColor(
  value: string | undefined,
  fallback?: undefined,
  options?: ResolveCustomColorOptions,
): string | undefined;
export function resolveCustomColor(
  value: string | undefined,
  fallback?: string,
  options: ResolveCustomColorOptions = {},
): string | undefined {
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
  const resolved =
    shades?.[String(shade + shadeShift)] ?? shades?.[String(shade)];
  if (resolved === undefined) {
    warnUnresolved(value);
    return fallback;
  }
  return resolved;
}
