import type { BoxProps, BoxStyleProps } from './Box.types';
import type { ResponsiveStyleValue } from './styleProps';

export type FlexStyleProps = BoxStyleProps & {
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
  gap?: ResponsiveStyleValue<string | number>;
};

/** `Flex`'s full prop surface: `Box`'s props plus `gap`. */
export type FlexProps = BoxProps & Pick<FlexStyleProps, 'gap'>;
