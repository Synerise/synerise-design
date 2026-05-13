import { type FlattenSimpleInterpolation, css } from 'styled-components';

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

const buttonDisabled = (
  color: string,
  background: string,
  border: string,
) => css`
  &.disabled,
  &[disabled] {
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
  ${buttonColor(p.white, p['blue-600'], p['blue-600'])}

  .btn-focus {
    box-shadow: inset 0 0 0 0px ${p['grey-300']};
  }

  &:hover {
    ${buttonHover(p.white, p['blue-500'], p['blue-500'])}
  }

  &:focus-visible {
    ${buttonColor(p.white, p['blue-600'], p['blue-700'])}
    .btn-focus {
      box-shadow: inset 0 0 0 2px ${p['blue-700']};
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(p.white, p['blue-700'], p['blue-700'])}
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
  ${buttonColor(p['grey-600'], p['grey-050'], p['grey-300'])}

  .btn-focus {
    box-shadow: inset 0 0 0 1px ${p['grey-300']};
  }

  &:hover {
    ${buttonHover(p['blue-600'], p.white, p['grey-300'])}
  }

  &:focus-visible {
    ${buttonColor(p['grey-600'], p['grey-050'], p['grey-300'])}
    .btn-focus {
      box-shadow: inset 0 0 0 2px ${p['blue-600']};
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(p['grey-600'], p['grey-100'], p['grey-100'])}
    border-color: ${p['grey-300']};
  }

  .btn-ripple {
    background-color: ${p['grey-100']};
  }

  ${buttonDisabled(
    `rgba(${hexToRgbValues(p['grey-700'])}, 0.4)`,
    `rgba(${hexToRgbValues(p['grey-050'])}, 0.4)`,
    p['grey-200'],
  )}
`;

const variantTertiary = (p: Palette) => css`
  ${buttonColor(
    p['grey-700'],
    `rgba(${hexToRgbValues(p['grey-400'])}, 0.15)`,
    'transparent',
  )}

  .btn-focus {
    box-shadow: inset 0 0 0 0px ${p['grey-300']};
  }

  &:hover {
    ${buttonHover(
      p['grey-700'],
      `rgba(${hexToRgbValues(p['grey-400'])}, 0.25)`,
      'transparent',
    )}
  }

  &:focus-visible {
    ${buttonColor(
      p['grey-700'],
      `rgba(${hexToRgbValues(p['grey-400'])}, 0.15)`,
      `rgba(${hexToRgbValues(p['grey-400'])}, 0.15)`,
    )}
    .btn-focus {
      box-shadow: inset 0 0 0 2px ${p['blue-600']};
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(
      p['grey-700'],
      `rgba(${hexToRgbValues(p['grey-400'])}, 0.35)`,
      `rgba(${hexToRgbValues(p['grey-400'])}, 0.35)`,
    )}
  }

  .btn-ripple {
    background-color: rgba(
      ${hexToRgbValues(p['grey-400'])},
      ${rippleAlpha(0.25, 0.35)}
    );
  }

  ${buttonDisabled(
    `rgba(${hexToRgbValues(p['grey-700'])}, 0.4)`,
    `rgba(${hexToRgbValues(p['grey-400'])}, 0.15)`,
    'transparent',
  )}
`;

const variantTertiaryWhite = (p: Palette) => css`
  ${buttonColor(
    p.white,
    `rgba(${hexToRgbValues(p['grey-300'])}, 0.15)`,
    'transparent',
  )}

  .btn-focus {
    box-shadow: inset 0 0 0 0px ${p['blue-600']};
  }

  &:hover {
    ${buttonHover(
      p.white,
      `rgba(${hexToRgbValues(p['grey-300'])}, 0.25)`,
      'transparent',
    )}
  }

  &:focus-visible {
    ${buttonColor(
      p.white,
      `rgba(${hexToRgbValues(p['grey-300'])}, 0.15)`,
      `rgba(${hexToRgbValues(p['grey-300'])}, 0.15)`,
    )}
    .btn-focus {
      box-shadow: inset 0 0 0 2px ${p['blue-600']};
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(
      p.white,
      `rgba(${hexToRgbValues(p['grey-300'])}, 0.1)`,
      `rgba(${hexToRgbValues(p['grey-300'])}, 0.1)`,
    )}
  }

  .btn-ripple {
    background-color: rgba(
      ${hexToRgbValues(p['grey-300'])},
      ${rippleAlpha(0.25, 0.1)}
    );
  }

  ${buttonDisabled(
    `rgba(255, 255, 255, 0.4)`,
    `rgba(${hexToRgbValues(p['grey-300'])}, 0.15)`,
    'transparent',
  )}
`;

const variantGhost = (p: Palette) => css`
  ${buttonColor(p['grey-600'], 'transparent', 'transparent')}
  box-shadow: none;
  border-color: transparent;

  .btn-focus {
    box-shadow: inset 0 0 0 0px transparent;
  }

  &:hover {
    ${buttonHover(
      p['blue-600'],
      `rgba(${hexToRgbValues(p['grey-400'])}, 0.25)`,
      'transparent',
    )}
  }

  &:focus-visible {
    ${buttonColor(p['grey-600'], 'transparent', 'transparent')}
    .btn-focus {
      box-shadow: inset 0 0 0 2px ${p['blue-600']};
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(
      p['grey-600'],
      `rgba(${hexToRgbValues(p['grey-400'])}, 0.35)`,
      `rgba(${hexToRgbValues(p['grey-400'])}, 0.35)`,
    )}
  }

  .btn-ripple {
    background-color: rgba(
      ${hexToRgbValues(p['grey-400'])},
      ${rippleAlpha(0.25, 0.35)}
    );
  }

  ${buttonDisabled(
    `rgba(${hexToRgbValues(p['grey-700'])}, 0.4)`,
    'transparent',
    'transparent',
  )}
`;

const variantGhostPrimary = (p: Palette) => css`
  ${buttonColor(p['blue-600'], 'transparent', 'transparent')}

  .btn-focus {
    box-shadow: inset 0 0 0 0px transparent;
  }

  &:hover {
    ${buttonHover(
      p['blue-600'],
      `rgba(${hexToRgbValues(p['grey-400'])}, 0.25)`,
      'transparent',
    )}
  }

  &:focus-visible {
    ${buttonColor(p['blue-600'], 'transparent', 'transparent')}
    .btn-focus {
      box-shadow: inset 0 0 0 2px ${p['blue-600']};
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(
      p['blue-600'],
      `rgba(${hexToRgbValues(p['grey-400'])}, 0.35)`,
      `rgba(${hexToRgbValues(p['grey-400'])}, 0.35)`,
    )}
  }

  .btn-ripple {
    background-color: rgba(
      ${hexToRgbValues(p['grey-400'])},
      ${rippleAlpha(0.25, 0.35)}
    );
  }

  ${buttonDisabled(
    `rgba(${hexToRgbValues(p['blue-600'])}, 0.4)`,
    'transparent',
    'transparent',
  )}
`;

const variantGhostWhite = (p: Palette) => css`
  ${buttonColor(p.white, 'transparent', 'transparent')}

  .btn-focus {
    box-shadow: inset 0 0 0 0 transparent;
  }

  &:hover {
    ${buttonHover(
      p.white,
      `rgba(${hexToRgbValues(p['grey-500'])}, 0.25)`,
      'transparent',
    )}
  }

  &:focus-visible {
    ${buttonColor(p.white, 'transparent', 'transparent')}
    .btn-focus {
      box-shadow: inset 0 0 0 2px ${p['blue-600']};
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(
      p.white,
      `rgba(${hexToRgbValues(p['grey-500'])}, 0.1)`,
      `rgba(${hexToRgbValues(p['grey-500'])}, 0.1)`,
    )}
  }

  .btn-ripple {
    background-color: rgba(
      ${hexToRgbValues(p['grey-500'])},
      ${rippleAlpha(0.25, 0.1)}
    );
  }

  ${buttonDisabled('rgba(255, 255, 255, 0.4)', 'transparent', 'transparent')}
`;

const variantDanger = (p: Palette) => css`
  ${buttonColor(p.white, p['red-600'], p['red-600'])}

  .btn-focus {
    box-shadow: inset 0 0 0 0 transparent;
  }

  &:hover {
    ${buttonHover(p.white, p['red-500'], p['red-500'])}
    box-shadow: 0 2px 4px 0 rgba(255, 90, 77, 0.2);
  }

  &:focus-visible {
    ${buttonColor(p.white, p['red-600'], p['red-600'])}
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
  ${buttonColor(p.white, p['green-600'], p['green-600'])}

  .btn-focus {
    box-shadow: inset 0 0 0 0 transparent;
  }

  &:hover {
    ${buttonHover(p.white, p['green-500'], p['green-500'])}
  }

  &:focus-visible {
    ${buttonColor(p.white, p['green-600'], p['green-500'])}
    .btn-focus {
      box-shadow: inset 0 0 0 2px ${p['blue-700']};
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(p.white, p['green-700'], p['green-700'])}
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
  ${buttonColor(p.white, p['yellow-600'], p['yellow-600'])}

  .btn-focus {
    box-shadow: inset 0 0 0 0 transparent;
  }

  &:hover {
    ${buttonHover(p.white, p['yellow-500'], p['yellow-500'])}
  }

  &:focus-visible {
    ${buttonColor(p.white, p['yellow-600'], p['yellow-500'])}
    .btn-focus {
      box-shadow: inset 0 0 0 2px ${p['blue-600']};
    }
  }

  &.pressed,
  &.active {
    ${buttonColor(p.white, p['yellow-700'], p['yellow-700'])}
  }

  .btn-ripple {
    background-color: ${p['yellow-700']};
  }

  ${buttonDisabled(
    p.white,
    `rgba(${hexToRgbValues(p['yellow-600'])}, 0.4)`,
    'transparent',
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
