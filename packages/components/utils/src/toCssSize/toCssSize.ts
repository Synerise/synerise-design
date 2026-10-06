/**
 * Normalises a size prop to a CSS length.
 *
 * A number is treated as px; a string is already a CSS length (`'12px'`, `'7rem'`, `'50%'`,
 * `'auto'`, `'calc(100% - 16px)'`) and is passed through untouched. Interpolating a string as
 * `${value}px` silently produces an invalid declaration the browser drops, so every component
 * taking a `number | string` size should normalise through this helper.
 */
export const toCssSize = (value: number | string): string =>
  typeof value === 'number' ? `${value}px` : value;
