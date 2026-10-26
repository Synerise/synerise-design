/**
 * The style-prop engine behind `Box` and `Flex`.
 *
 * Replaces the `styled-system` pipeline `@rebass/grid` used to supply. It covers exactly the
 * props the design system and its consumers pass today — nothing else — and reproduces the
 * previous value semantics, including three that are easy to get wrong:
 *
 * - **Space props resolve through `theme.space`.** With the default scale
 *   `[0, 8, 12, 16, 24, 32, 48, 64]`, `ml={1}` is `8px`, not `1px`, and `padding={4}` is `24px`.
 *   Values past the end of the scale fall back to pixels, which is why `mt={24}` is `24px`.
 *   A **negative margin** indexes by magnitude and negates — `mx={-2}` is `-12px`. Negative
 *   *padding* does not: it goes straight to pixels, matching `styled-system`.
 * - **Size props treat numbers at or below 1 as fractions.** `width={1}` is `100%` and
 *   `width={1 / 2}` is `50%`, while `width={588}` is `588px`.
 * - **Tuples are mobile-first breakpoints.** `width={[1, 1 / 2]}` is `100%` up to the first
 *   breakpoint and `50%` above it.
 *
 * Declaration order decides the winner when a shorthand and a longhand are both passed:
 * `<Box m={4} mt={1} />` emits `margin` then `margin-top`, so the longhand applies.
 */

type SpaceScale = readonly number[];

/** Only the slice of the design-system theme this module reads. */
export type ThemeWithScales = {
  space?: SpaceScale;
  breakpoints?: readonly string[];
};

export type StyleValue = string | number;

/**
 * A single value, or a mobile-first tuple of them.
 *
 * The first entry is the base value; each entry after it applies from the matching entry of
 * `theme.breakpoints` upwards. Entries that are `null` or `undefined` leave that breakpoint
 * alone, and entries past the last breakpoint are dropped.
 */
export type ResponsiveStyleValue<T = StyleValue> =
  | T
  | readonly (T | null | undefined)[];

/**
 * Used when the theme carries no breakpoints — outside `DSProvider`, essentially. Matches the
 * `styled-system` default the previous implementation fell back to.
 */
const DEFAULT_BREAKPOINTS: readonly string[] = ['40em', '52em', '64em'];

type Kind =
  /**
   * Index into `theme.space`, else pixels. A negative value indexes by its
   * magnitude and negates the result — margin only, since negative padding is
   * not a thing and `styled-system` never resolved it that way.
   */
  | 'margin'
  /** Index into `theme.space`, else pixels. Negatives pass straight to pixels. */
  | 'space'
  /** Numbers at or below 1 are fractions of the container, above 1 are pixels. */
  | 'size'
  /** Plain numeric length, rendered in pixels. */
  | 'length'
  /** Passed through untouched. */
  | 'keyword';

type StylePropRule = {
  readonly properties: readonly string[];
  readonly kind: Kind;
};

const rule = (kind: Kind, ...properties: string[]): StylePropRule => ({
  kind,
  properties,
});

/**
 * Every prop `Box` and `Flex` translate into CSS, keyed by the prop name callers write.
 *
 * Membership here is also what keeps a prop out of the DOM (see `shouldForwardStyleProp`), so
 * adding a row is the only step needed to support a new prop. The set is deliberately closed to
 * what is in use — `order`, `flexGrow`, `bg`, `lineHeight` and friends are absent because no
 * call site passes them.
 */
export const STYLE_PROPS: Readonly<Record<string, StylePropRule>> = {
  // Margin
  m: rule('margin', 'margin'),
  margin: rule('margin', 'margin'),
  mt: rule('margin', 'margin-top'),
  marginTop: rule('margin', 'margin-top'),
  mr: rule('margin', 'margin-right'),
  marginRight: rule('margin', 'margin-right'),
  mb: rule('margin', 'margin-bottom'),
  marginBottom: rule('margin', 'margin-bottom'),
  ml: rule('margin', 'margin-left'),
  marginLeft: rule('margin', 'margin-left'),
  mx: rule('margin', 'margin-left', 'margin-right'),
  marginX: rule('margin', 'margin-left', 'margin-right'),
  my: rule('margin', 'margin-top', 'margin-bottom'),
  marginY: rule('margin', 'margin-top', 'margin-bottom'),

  // Padding
  p: rule('space', 'padding'),
  padding: rule('space', 'padding'),
  pt: rule('space', 'padding-top'),
  paddingTop: rule('space', 'padding-top'),
  pr: rule('space', 'padding-right'),
  paddingRight: rule('space', 'padding-right'),
  pb: rule('space', 'padding-bottom'),
  paddingBottom: rule('space', 'padding-bottom'),
  pl: rule('space', 'padding-left'),
  paddingLeft: rule('space', 'padding-left'),
  px: rule('space', 'padding-left', 'padding-right'),
  paddingX: rule('space', 'padding-left', 'padding-right'),
  py: rule('space', 'padding-top', 'padding-bottom'),
  paddingY: rule('space', 'padding-top', 'padding-bottom'),

  // Gap — a design-system addition, on the same scale as the space props
  gap: rule('space', 'gap'),

  // Size
  width: rule('size', 'width'),
  height: rule('size', 'height'),
  minWidth: rule('size', 'min-width'),
  maxWidth: rule('size', 'max-width'),
  minHeight: rule('size', 'min-height'),
  maxHeight: rule('size', 'max-height'),

  // Layout
  display: rule('keyword', 'display'),
  overflow: rule('keyword', 'overflow'),
  overflowX: rule('keyword', 'overflow-x'),
  overflowY: rule('keyword', 'overflow-y'),

  // Flexbox
  alignItems: rule('keyword', 'align-items'),
  justifyContent: rule('keyword', 'justify-content'),
  flexDirection: rule('keyword', 'flex-direction'),
  flexWrap: rule('keyword', 'flex-wrap'),
  flex: rule('keyword', 'flex'),
  alignSelf: rule('keyword', 'align-self'),

  // Colour
  color: rule('keyword', 'color'),
  backgroundColor: rule('keyword', 'background-color'),
  opacity: rule('keyword', 'opacity'),

  // Typography
  fontSize: rule('length', 'font-size'),
  fontWeight: rule('keyword', 'font-weight'),
  textAlign: rule('keyword', 'text-align'),
};

/** Zero stays unitless, matching what the previous implementation emitted. */
const toPx = (value: number): string => (value === 0 ? '0' : `${value}px`);

const resolve = (
  kind: Kind,
  value: StyleValue,
  space: SpaceScale | undefined,
): string => {
  if (typeof value !== 'number') {
    return value;
  }

  switch (kind) {
    case 'margin': {
      // A negative margin indexes the scale by its magnitude and negates the
      // result, so `mx={-2}` is -12px on the default scale rather than -2px.
      // Out-of-scale magnitudes still fall back to pixels: `mt={-24}` is -24px.
      const magnitude = Math.abs(value);
      const scaled = space?.[magnitude] ?? magnitude;
      return toPx(value < 0 ? -scaled : scaled);
    }
    case 'space':
      return toPx(space?.[value] ?? value);
    case 'size':
      return value > 1 ? toPx(value) : `${value * 100}%`;
    case 'length':
      return toPx(value);
    default:
      return String(value);
  }
};

const toTuple = (value: unknown): readonly unknown[] =>
  Array.isArray(value) ? value : [value];

const declarationsOf = (block: Map<string, string>): string =>
  Array.from(block).reduce(
    (css, [property, value]) => `${css}${property}:${value};`,
    '',
  );

/**
 * Turns the style props on a component into a CSS declaration block, followed by one media
 * block per breakpoint that any tuple prop reached.
 *
 * Props are read in the order the caller wrote them, and a property written twice keeps its
 * first position but takes the last value — so `<Box ml={1} mx={4} />` emits one `margin-left`,
 * set to `24px`. That is both what the browser would compute and what the previous
 * implementation emitted.
 */
export const styleProps = (
  props: Record<string, unknown> & { theme?: ThemeWithScales },
): string => {
  const space = props.theme?.space;
  const breakpoints = props.theme?.breakpoints ?? DEFAULT_BREAKPOINTS;

  const base = new Map<string, string>();
  const atBreakpoint = breakpoints.map(() => new Map<string, string>());

  Object.keys(props).forEach((prop) => {
    const styleProp = STYLE_PROPS[prop];
    if (!styleProp) {
      return;
    }

    toTuple(props[prop]).forEach((value, index) => {
      if (value === undefined || value === null || value === '') {
        return;
      }

      // The first entry is the base value; the rest step up through the breakpoints.
      const target = index === 0 ? base : atBreakpoint[index - 1];
      if (!target) {
        return;
      }

      const resolved = resolve(styleProp.kind, value as StyleValue, space);
      styleProp.properties.forEach((property) => {
        target.set(property, resolved);
      });
    });
  });

  return atBreakpoint.reduce(
    (css, block, index) =>
      block.size
        ? `${css}@media screen and (min-width:${breakpoints[index]}){${declarationsOf(block)}}`
        : css,
    declarationsOf(base),
  );
};

/**
 * Keeps style props out of the rendered markup.
 *
 * The previous implementation let `width`, `height`, `color`, `opacity` and `fontWeight` reach
 * the DOM as attributes — `<div width="1" font-weight="500">` — because each is valid on *some*
 * element and styled-components' default filter is not element-aware. Filtering them here fixes
 * that; every other prop still goes through the default filter, so a consumer's own transient
 * props on `styled(Box)` are dropped exactly as before.
 */
export const shouldForwardStyleProp = (
  prop: string | number,
  isValidAttribute?: (prop: string | number) => boolean,
): boolean => {
  if (prop in STYLE_PROPS) {
    return false;
  }
  return isValidAttribute ? isValidAttribute(prop) : true;
};
