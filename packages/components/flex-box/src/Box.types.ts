import type { ComponentPropsWithRef } from 'react';

import type { ResponsiveStyleValue } from './styleProps';

/** A length or keyword, or a mobile-first tuple of them (one entry per breakpoint). */
type Value<T> = ResponsiveStyleValue<T>;

/**
 * Keyword unions are written out here rather than taken from `csstype` via
 * `CSSProperties['alignItems']`.
 *
 * An indexed access into `CSSProperties` resolves to a `csstype.Property.*` alias, and TypeScript
 * cannot name that through a pnpm path when it emits declarations — so every consumer that wrote
 * `styled(Box)` would fail with TS2742. The `(string & {})` member keeps the union open to any
 * valid CSS value while preserving autocomplete on the common ones.
 */
type Keyword<T extends string> = T | (string & {});

type AlignItems = Keyword<
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'start'
  | 'end'
  | 'stretch'
  | 'baseline'
  | 'normal'
>;
type JustifyContent = Keyword<
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'start'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'normal'
>;
type FlexDirection = Keyword<
  'row' | 'column' | 'row-reverse' | 'column-reverse'
>;
type FlexWrap = Keyword<'wrap' | 'nowrap' | 'wrap-reverse'>;
type AlignSelf = Keyword<
  | 'auto'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'start'
  | 'end'
  | 'stretch'
  | 'baseline'
>;
type Display = Keyword<
  'block' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'none'
>;
type Overflow = Keyword<'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'>;
type TextAlign = Keyword<
  'left' | 'right' | 'center' | 'justify' | 'start' | 'end'
>;

/**
 * Margin and padding. Numbers index the theme's `space` scale
 * (`[0, 8, 12, 16, 24, 32, 48, 64]` by default), so `ml={1}` is `8px`; numbers past the end of
 * the scale are pixels, so `mt={24}` is `24px`. A negative **margin** indexes the scale by its
 * magnitude and negates the result, so `mx={-2}` is `-12px`; negative **padding** is not scaled
 * and resolves to plain pixels. Strings pass through, including `"auto"` and multi-value
 * shorthands like `"0 auto"`.
 */
type SpaceStyleProps = {
  m?: Value<string | number>;
  margin?: Value<string | number>;
  mt?: Value<string | number>;
  marginTop?: Value<string | number>;
  mr?: Value<string | number>;
  marginRight?: Value<string | number>;
  mb?: Value<string | number>;
  marginBottom?: Value<string | number>;
  ml?: Value<string | number>;
  marginLeft?: Value<string | number>;
  /** Sets `margin-left` and `margin-right`. */
  mx?: Value<string | number>;
  /** Sets `margin-left` and `margin-right`. */
  marginX?: Value<string | number>;
  /** Sets `margin-top` and `margin-bottom`. */
  my?: Value<string | number>;
  /** Sets `margin-top` and `margin-bottom`. */
  marginY?: Value<string | number>;
  p?: Value<string | number>;
  padding?: Value<string | number>;
  pt?: Value<string | number>;
  paddingTop?: Value<string | number>;
  pr?: Value<string | number>;
  paddingRight?: Value<string | number>;
  pb?: Value<string | number>;
  paddingBottom?: Value<string | number>;
  pl?: Value<string | number>;
  paddingLeft?: Value<string | number>;
  /** Sets `padding-left` and `padding-right`. */
  px?: Value<string | number>;
  /** Sets `padding-left` and `padding-right`. */
  paddingX?: Value<string | number>;
  /** Sets `padding-top` and `padding-bottom`. */
  py?: Value<string | number>;
  /** Sets `padding-top` and `padding-bottom`. */
  paddingY?: Value<string | number>;
};

/**
 * Box size. A number at or below 1 is a fraction of the container — `width={1}` is `100%`,
 * `width={1 / 2}` is `50%` — and a number above 1 is pixels, so `width={588}` is `588px`.
 * Pass a string for anything else (`width="100%"`, `height="calc(100% - 8px)"`).
 */
type SizeStyleProps = {
  width?: Value<string | number>;
  height?: Value<string | number>;
  minWidth?: Value<string | number>;
  maxWidth?: Value<string | number>;
  minHeight?: Value<string | number>;
  maxHeight?: Value<string | number>;
};

type LayoutStyleProps = {
  display?: Value<Display>;
  overflow?: Value<Overflow>;
  overflowX?: Value<Overflow>;
  overflowY?: Value<Overflow>;
};

type FlexboxStyleProps = {
  alignItems?: Value<AlignItems>;
  justifyContent?: Value<JustifyContent>;
  flexDirection?: Value<FlexDirection>;
  flexWrap?: Value<FlexWrap>;
  flex?: Value<string | number>;
  alignSelf?: Value<AlignSelf>;
};

type PaintStyleProps = {
  /**
   * Not responsive, unlike its neighbours. `color` is the one style prop that `div` also
   * declares (as a legacy attribute), and styled-components intersects rather than replaces it —
   * a tuple would become `string & readonly string[]`, which nothing satisfies, and every
   * consumer writing `styled(Box)` would fail to compile. No call site passes a tuple here.
   */
  color?: string;
  backgroundColor?: Value<string>;
  opacity?: Value<string | number>;
  /** A number is pixels: `fontSize={14}` is `14px`. */
  fontSize?: Value<string | number>;
  fontWeight?: Value<string | number>;
  textAlign?: Value<TextAlign>;
};

/**
 * Every prop `Box` translates into CSS. None of them reach the DOM.
 *
 * `Flex` accepts all of these too, plus `gap` — see `FlexProps`.
 */
export type BoxStyleProps = SpaceStyleProps &
  SizeStyleProps &
  LayoutStyleProps &
  FlexboxStyleProps &
  PaintStyleProps;

/**
 * The `div` attributes `Box` forwards, with the style-prop names removed.
 *
 * Removing them first — rather than letting the two sets intersect — is what
 * `@types/rebass__grid` did, and it is why a style prop that shares a name with a DOM attribute
 * resolves to our type rather than to an intersection with the attribute's.
 */
export type BoxElementProps = Omit<
  ComponentPropsWithRef<'div'>,
  keyof BoxStyleProps
>;

/** `Box`'s full prop surface: its style props plus everything a `div` accepts. */
export type BoxProps = BoxStyleProps & BoxElementProps;
