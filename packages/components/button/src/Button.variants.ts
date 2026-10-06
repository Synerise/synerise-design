import { css, type FlattenSimpleInterpolation } from 'styled-components';

/**
 * Button variant styles — direct port of button.mixin.less to styled-components.
 *
 * Icons use currentColor for fill/stroke and inherit the button's color property,
 * so we only set `color` on the button — no direct svg fill/color overrides needed.
 */

type Palette = { [key: string]: string };

// ---------------------------------------------------------------------------
// Shared helpers (equivalent to Less mixins)
// ---------------------------------------------------------------------------

const buttonColor = (color: string, background: string, border: string) => css`
  color: ${color};
  background: ${background};
  border-color: ${border};
`;

// `applyOpacity` = the variant's disabled colours are solid design tokens (secondary/tertiary/ghost),
// so the disabled dimming comes from the separate `--ds-buttons-disabled-opacity` (0.4) — matching the
// token intent ("same as default, opacity applied separately"). Solid-token variants pass `true`; the
// primary/danger/success/warning variants bake 0.4 into their rgba() background instead, so they omit it
// (applying element opacity on top would double-dim them).
const buttonDisabled = (
  color: string,
  background: string,
  border: string,
  applyOpacity = false,
) => css`
  &.disabled,
  &[disabled] {
    ${
      applyOpacity &&
      css`
      opacity: var(--ds-buttons-disabled-opacity);
    `
    }
    &,
    &:hover,
    &:focus-visible,
    &:active,
    &.active {
      ${buttonColor(color, background, border)}
      box-shadow: none;
    }
  }
`;

const buttonHover = (color: string, background: string, border: string) => css`
  box-shadow: none;
  &:not(:disabled):not(:focus-visible):not(.pressed) {
    ${buttonColor(color, background, border)}
  }
`;

// ---------------------------------------------------------------------------
// Variant definitions
// ---------------------------------------------------------------------------

const variantPrimary = (p: Palette) => css`
  ${buttonColor(
    'var(--ds-buttons-variant-primary-text-default)',
    'var(--ds-buttons-variant-primary-bg-default)',
    'var(--ds-buttons-variant-primary-bg-default)',
  )}

  .btn-focus {
    box-shadow: inset 0 0 0 0px ${p['grey-300']};
  }

  &:hover {
    ${buttonHover(
      'var(--ds-buttons-variant-primary-text-hover)',
      'var(--ds-buttons-variant-primary-bg-hover)',
      'var(--ds-buttons-variant-primary-bg-hover)',
    )}
  }

  &:focus-visible {
    ${buttonColor(
      'var(--ds-buttons-variant-primary-text-focus)',
      'var(--ds-buttons-variant-primary-bg-focus)',
      'var(--ds-buttons-variant-primary-border-focus)',
    )}
    .btn-focus {
      box-shadow: inset 0 0 0 2px var(--ds-buttons-variant-primary-border-focus);
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(
      'var(--ds-buttons-variant-primary-text-active)',
      'var(--ds-buttons-variant-primary-bg-active)',
      'var(--ds-buttons-variant-primary-bg-active)',
    )}
  }

  .btn-ripple {
    background-color: ${p['blue-700']};
  }

  ${buttonDisabled(
    p.white,
    `rgba(${hexToRgbValues(p['blue-600'])}, 0.4)`,
    'transparent',
  )}
`;

const variantDefault = (p: Palette) => css`
  ${buttonColor(
    'var(--ds-buttons-variant-secondary-text-default)',
    'var(--ds-buttons-variant-secondary-bg-default)',
    'var(--ds-buttons-variant-secondary-border-default)',
  )}

  .btn-focus {
    box-shadow: inset 0 0 0 1px
      var(--ds-buttons-variant-secondary-border-default);
  }

  &:hover {
    ${buttonHover(
      'var(--ds-buttons-variant-secondary-text-hover)',
      'var(--ds-buttons-variant-secondary-bg-hover)',
      'var(--ds-buttons-variant-secondary-border-hover)',
    )}
  }

  &:focus-visible {
    ${buttonColor(
      'var(--ds-buttons-variant-secondary-text-focus)',
      'var(--ds-buttons-variant-secondary-bg-focus)',
      'var(--ds-buttons-variant-secondary-border-focus)',
    )}
    .btn-focus {
      box-shadow: inset 0 0 0 2px
        var(--ds-buttons-variant-secondary-border-focus);
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(
      'var(--ds-buttons-variant-secondary-text-active)',
      'var(--ds-buttons-variant-secondary-bg-active)',
      'var(--ds-buttons-variant-secondary-border-active)',
    )}
  }

  .btn-ripple {
    background-color: ${p['grey-100']};
  }

  ${buttonDisabled(
    'var(--ds-buttons-variant-secondary-text-disabled)',
    'var(--ds-buttons-variant-secondary-bg-disabled)',
    'var(--ds-buttons-variant-secondary-border-disabled)',
    true,
  )}
`;

const variantTertiary = (p: Palette) => css`
  ${buttonColor(
    'var(--ds-buttons-variant-tertiary-text-default)',
    'var(--ds-buttons-variant-tertiary-bg-default)',
    'var(--ds-buttons-variant-tertiary-border-default)',
  )}

  .btn-focus {
    box-shadow: inset 0 0 0 0px transparent;
  }

  &:hover {
    ${buttonHover(
      'var(--ds-buttons-variant-tertiary-text-hover)',
      'var(--ds-buttons-variant-tertiary-bg-hover)',
      'var(--ds-buttons-variant-tertiary-border-hover)',
    )}
  }

  &:focus-visible {
    ${buttonColor(
      'var(--ds-buttons-variant-tertiary-text-focus)',
      'var(--ds-buttons-variant-tertiary-bg-focus)',
      'var(--ds-buttons-variant-tertiary-border-focus)',
    )}
    .btn-focus {
      box-shadow: inset 0 0 0 2px
        var(--ds-buttons-variant-tertiary-border-focus);
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(
      'var(--ds-buttons-variant-tertiary-text-active)',
      'var(--ds-buttons-variant-tertiary-bg-active)',
      'var(--ds-buttons-variant-tertiary-bg-active)',
    )}
  }

  .btn-ripple {
    background-color: rgba(
      ${hexToRgbValues(p['grey-400'])},
      ${rippleAlpha(0.25, 0.35)}
    );
  }

  ${buttonDisabled(
    'var(--ds-buttons-variant-tertiary-text-disabled)',
    'var(--ds-buttons-variant-tertiary-bg-disabled)',
    'var(--ds-buttons-variant-tertiary-border-disabled)',
    true,
  )}
`;

const variantTertiaryWhite = (p: Palette) => css`
  ${buttonColor(
    'var(--ds-buttons-variant-tertiary-white-text-default)',
    'var(--ds-buttons-variant-tertiary-white-bg-default)',
    'var(--ds-buttons-variant-tertiary-white-border-default)',
  )}

  .btn-focus {
    box-shadow: inset 0 0 0 0px transparent;
  }

  &:hover {
    ${buttonHover(
      'var(--ds-buttons-variant-tertiary-white-text-hover)',
      'var(--ds-buttons-variant-tertiary-white-bg-hover)',
      'var(--ds-buttons-variant-tertiary-white-border-hover)',
    )}
  }

  &:focus-visible {
    ${buttonColor(
      'var(--ds-buttons-variant-tertiary-white-text-focus)',
      'var(--ds-buttons-variant-tertiary-white-bg-focus)',
      'var(--ds-buttons-variant-tertiary-white-border-focus)',
    )}
    .btn-focus {
      box-shadow: inset 0 0 0 2px
        var(--ds-buttons-variant-tertiary-white-border-focus);
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(
      'var(--ds-buttons-variant-tertiary-white-text-default)',
      'var(--ds-buttons-variant-tertiary-white-bg-active)',
      'var(--ds-buttons-variant-tertiary-white-bg-active)',
    )}
  }

  .btn-ripple {
    background-color: rgba(
      ${hexToRgbValues(p['grey-300'])},
      ${rippleAlpha(0.25, 0.1)}
    );
  }

  ${buttonDisabled(
    'var(--ds-buttons-variant-tertiary-white-text-disabled)',
    'var(--ds-buttons-variant-tertiary-white-bg-disabled)',
    'var(--ds-buttons-variant-tertiary-white-border-disabled)',
    true,
  )}
`;

const variantGhost = (p: Palette) => css`
  ${buttonColor(
    'var(--ds-buttons-variant-ghost-secondary-text-default)',
    'var(--ds-buttons-variant-ghost-secondary-bg-default)',
    'var(--ds-buttons-variant-ghost-secondary-border-default)',
  )}
  box-shadow: none;

  .btn-focus {
    box-shadow: inset 0 0 0 0px transparent;
  }

  &:hover {
    ${buttonHover(
      'var(--ds-buttons-variant-ghost-secondary-text-hover)',
      'var(--ds-buttons-variant-ghost-secondary-bg-hover)',
      'var(--ds-buttons-variant-ghost-secondary-border-hover)',
    )}
  }

  &:focus-visible {
    ${buttonColor(
      'var(--ds-buttons-variant-ghost-secondary-text-focus)',
      'var(--ds-buttons-variant-ghost-secondary-bg-focus)',
      'var(--ds-buttons-variant-ghost-secondary-border-focus)',
    )}
    .btn-focus {
      box-shadow: inset 0 0 0 2px
        var(--ds-buttons-variant-ghost-secondary-border-focus);
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(
      'var(--ds-buttons-variant-ghost-secondary-text-default)',
      'var(--ds-buttons-variant-ghost-secondary-bg-active)',
      'var(--ds-buttons-variant-ghost-secondary-bg-active)',
    )}
  }

  .btn-ripple {
    background-color: rgba(
      ${hexToRgbValues(p['grey-400'])},
      ${rippleAlpha(0.25, 0.35)}
    );
  }

  ${buttonDisabled(
    'var(--ds-buttons-variant-ghost-secondary-text-disabled)',
    'var(--ds-buttons-variant-ghost-secondary-bg-disabled)',
    'var(--ds-buttons-variant-ghost-secondary-border-disabled)',
    true,
  )}
`;

const variantGhostPrimary = (p: Palette) => css`
  ${buttonColor(
    'var(--ds-buttons-variant-ghost-primary-text-default)',
    'var(--ds-buttons-variant-ghost-primary-bg-default)',
    'var(--ds-buttons-variant-ghost-primary-border-default)',
  )}

  .btn-focus {
    box-shadow: inset 0 0 0 0px transparent;
  }

  &:hover {
    ${buttonHover(
      'var(--ds-buttons-variant-ghost-primary-text-hover)',
      'var(--ds-buttons-variant-ghost-primary-bg-hover)',
      'var(--ds-buttons-variant-ghost-primary-border-hover)',
    )}
  }

  &:focus-visible {
    ${buttonColor(
      'var(--ds-buttons-variant-ghost-primary-text-focus)',
      'var(--ds-buttons-variant-ghost-primary-bg-focus)',
      'var(--ds-buttons-variant-ghost-primary-border-focus)',
    )}
    .btn-focus {
      box-shadow: inset 0 0 0 2px
        var(--ds-buttons-variant-ghost-primary-border-focus);
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(
      'var(--ds-buttons-variant-ghost-primary-text-active)',
      'var(--ds-buttons-variant-ghost-primary-bg-active)',
      'var(--ds-buttons-variant-ghost-primary-bg-active)',
    )}
  }

  .btn-ripple {
    background-color: rgba(
      ${hexToRgbValues(p['grey-400'])},
      ${rippleAlpha(0.25, 0.35)}
    );
  }

  ${buttonDisabled(
    'var(--ds-buttons-variant-ghost-primary-text-disabled)',
    'var(--ds-buttons-variant-ghost-primary-bg-disabled)',
    'var(--ds-buttons-variant-ghost-primary-border-disabled)',
    true,
  )}
`;

const variantGhostWhite = (p: Palette) => css`
  ${buttonColor(
    'var(--ds-buttons-variant-ghost-secondary-white-text-default)',
    'var(--ds-buttons-variant-ghost-secondary-white-bg-default)',
    'var(--ds-buttons-variant-ghost-secondary-white-border-default)',
  )}

  .btn-focus {
    box-shadow: inset 0 0 0 0 transparent;
  }

  &:hover {
    ${buttonHover(
      'var(--ds-buttons-variant-ghost-secondary-white-text-hover)',
      'var(--ds-buttons-variant-ghost-secondary-white-bg-hover)',
      'var(--ds-buttons-variant-ghost-secondary-white-border-hover)',
    )}
  }

  &:focus-visible {
    ${buttonColor(
      'var(--ds-buttons-variant-ghost-secondary-white-text-focus)',
      'var(--ds-buttons-variant-ghost-secondary-white-bg-focus)',
      'var(--ds-buttons-variant-ghost-secondary-white-border-focus)',
    )}
    .btn-focus {
      box-shadow: inset 0 0 0 2px
        var(--ds-buttons-variant-ghost-secondary-white-border-focus);
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(
      'var(--ds-buttons-variant-ghost-secondary-white-text-default)',
      'var(--ds-buttons-variant-ghost-secondary-white-bg-active)',
      'var(--ds-buttons-variant-ghost-secondary-white-bg-active)',
    )}
  }

  .btn-ripple {
    background-color: rgba(
      ${hexToRgbValues(p['grey-500'])},
      ${rippleAlpha(0.25, 0.1)}
    );
  }

  ${buttonDisabled(
    'var(--ds-buttons-variant-ghost-secondary-white-text-disabled)',
    'var(--ds-buttons-variant-ghost-secondary-white-bg-disabled)',
    'var(--ds-buttons-variant-ghost-secondary-white-border-disabled)',
    true,
  )}
`;

const variantDanger = (p: Palette) => css`
  ${buttonColor(
    'var(--ds-buttons-variant-primary-danger-text-default)',
    'var(--ds-buttons-variant-primary-danger-bg-default)',
    'var(--ds-buttons-variant-primary-danger-bg-default)',
  )}

  .btn-focus {
    box-shadow: inset 0 0 0 0 transparent;
  }

  &:hover {
    ${buttonHover(p.white, p['red-500'], p['red-500'])}
    box-shadow: 0 2px 4px 0 rgba(255, 90, 77, 0.2);
  }

  &:focus-visible {
    ${buttonColor(
      'var(--ds-buttons-variant-primary-danger-text-focus)',
      'var(--ds-buttons-variant-primary-danger-bg-focus)',
      'var(--ds-buttons-variant-primary-danger-border-focus)',
    )}
    .btn-focus {
      box-shadow: inset 0 0 0 2px ${p['blue-600']};
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(p.white, p['red-700'], p['red-700'])}
  }

  .btn-ripple {
    background-color: ${p['red-700']};
  }

  ${buttonDisabled(
    p.white,
    `rgba(${hexToRgbValues(p['red-600'])}, 0.4)`,
    'transparent',
  )}
`;

const variantSuccess = (p: Palette) => css`
  ${buttonColor(
    'var(--ds-buttons-variant-primary-success-text-default)',
    'var(--ds-buttons-variant-primary-success-bg-default)',
    'var(--ds-buttons-variant-primary-success-bg-default)',
  )}

  .btn-focus {
    box-shadow: inset 0 0 0 0 transparent;
  }

  &:hover {
    ${buttonHover(
      'var(--ds-buttons-variant-primary-success-text-hover)',
      'var(--ds-buttons-variant-primary-success-bg-hover)',
      'var(--ds-buttons-variant-primary-success-bg-hover)',
    )}
  }

  &:focus-visible {
    ${buttonColor(
      'var(--ds-buttons-variant-primary-success-text-focus)',
      'var(--ds-buttons-variant-primary-success-bg-focus)',
      'var(--ds-buttons-variant-primary-success-border-focus)',
    )}
    .btn-focus {
      box-shadow: inset 0 0 0 2px ${p['blue-700']};
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(
      'var(--ds-buttons-variant-primary-success-text-active)',
      'var(--ds-buttons-variant-primary-success-bg-active)',
      'var(--ds-buttons-variant-primary-success-bg-active)',
    )}
  }

  .btn-ripple {
    background-color: ${p['green-700']};
  }

  ${buttonDisabled(
    p.white,
    `rgba(${hexToRgbValues(p['green-600'])}, 0.4)`,
    'transparent',
  )}
`;

const variantWarning = (p: Palette) => css`
  ${buttonColor(
    'var(--ds-buttons-variant-primary-warning-text-default)',
    'var(--ds-buttons-variant-primary-warning-bg-default)',
    'var(--ds-buttons-variant-primary-warning-border-default)',
  )}

  .btn-focus {
    box-shadow: inset 0 0 0 0 transparent;
  }

  &:hover {
    ${buttonHover(
      'var(--ds-buttons-variant-primary-warning-text-hover)',
      'var(--ds-buttons-variant-primary-warning-bg-hover)',
      'var(--ds-buttons-variant-primary-warning-border-hover)',
    )}
  }

  &:focus-visible {
    ${buttonColor(
      'var(--ds-buttons-variant-primary-warning-text-focus)',
      'var(--ds-buttons-variant-primary-warning-bg-focus)',
      'var(--ds-buttons-variant-primary-warning-border-focus)',
    )}
    .btn-focus {
      box-shadow: inset 0 0 0 2px
        var(--ds-buttons-variant-primary-warning-border-focus);
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(
      'var(--ds-buttons-variant-primary-warning-text-active)',
      'var(--ds-buttons-variant-primary-warning-bg-active)',
      'var(--ds-buttons-variant-primary-warning-border-active)',
    )}
  }

  .btn-ripple {
    background-color: ${p['yellow-700']};
  }

  /* Option A: adopt the solid disabled token + element-level --ds-buttons-disabled-opacity
     (0.4), matching the token intent used by secondary/tertiary/ghost. */
  ${buttonDisabled(
    'var(--ds-buttons-variant-primary-warning-text-disabled)',
    'var(--ds-buttons-variant-primary-warning-bg-disabled)',
    'var(--ds-buttons-variant-primary-warning-border-disabled)',
    true,
  )}
`;

// ---------------------------------------------------------------------------
// Variant dispatcher
// ---------------------------------------------------------------------------

const variantMap: Record<string, (p: Palette) => FlattenSimpleInterpolation> = {
  primary: variantPrimary,
  default: variantDefault,
  secondary: variantDefault,
  tertiary: variantTertiary,
  'tertiary-white': variantTertiaryWhite,
  ghost: variantGhost,
  'ghost-primary': variantGhostPrimary,
  'custom-color-ghost': variantGhostPrimary,
  'ghost-white': variantGhostWhite,
  danger: variantDanger,
  success: variantSuccess,
  warning: variantWarning,
};

/**
 * Returns the variant-specific CSS for a given button type.
 * Falls back to the default/secondary variant for unknown types.
 */
export const getVariantStyles = (
  type: string | undefined,
  palette: Palette,
): FlattenSimpleInterpolation => {
  const variantFn = variantMap[type || 'default'] || variantMap.default;
  return variantFn(palette);
};

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

/**
 * Converts a hex colour string to comma-separated RGB values
 * for use in rgba() expressions. E.g. "#0b68ff" → "11, 104, 255"
 */
function hexToRgbValues(hex: string): string {
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

/**
 * Calculates the ripple alpha so that compositing ripple over the hover
 * background equals the pressed background (alpha compositing diff).
 *
 * Formula: r = (pressed - hover) / (1 - hover)
 *
 * When pressed <= hover (pressed is lighter), returns pressed directly
 * since the ripple can't subtract — it acts as a flash instead.
 */
function rippleAlpha(hoverAlpha: number, pressedAlpha: number): number {
  if (pressedAlpha <= hoverAlpha) {
    return pressedAlpha;
  }
  return (pressedAlpha - hoverAlpha) / (1 - hoverAlpha);
}
