import { type FlexProps as RebassFlexProps } from '@rebass/grid';

export type FlexProps = RebassFlexProps & {
  /**
   * CSS `gap` between flex items.
   *
   * - `number` — index into the theme's `space` scale
   *   (e.g. `gap={2}` resolves to `12px` with the default scale
   *   `[0, 8, 12, 16, 24, 32, 48, 64]`). Out-of-range values fall back to `${gap}px`.
   * - `string` — passed through verbatim (e.g. `gap="1rem"`, `gap="8px 16px"`).
   *
   * Omit to leave the property unset.
   */
  gap?: number | string;
};
