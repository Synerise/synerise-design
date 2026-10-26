# FlexBox (`@synerise/ds-flex-box`)

> `Box` and `Flex` — the layout primitives. Own implementation, no runtime dependencies.

Replaced `@rebass/grid` (last published August 2019) and its `styled-system` pipeline with a
first-party style-prop engine covering exactly the props in use. Output is byte-identical to the
old implementation across all 176 audited prop/value combinations; the only behavioural change is
that style props no longer leak into the DOM.

## Package structure

```
src/
  styleProps.ts   — the style-prop engine: prop table, value resolution, DOM filtering
  Box.tsx         — Box (styled.div)
  Box.types.ts    — BoxStyleProps, BoxProps
  Flex.tsx        — Flex (styled(Box) + display:flex)
  Flex.types.ts   — FlexStyleProps, FlexProps
  index.ts
```

There is no `*.styles.ts`: these components have no JSX and no static stylesheet — `styleProps.ts`
*is* the styling layer.

## Public exports

`Box`, `Flex`, and the types `BoxProps`, `BoxStyleProps`, `FlexProps`, `FlexStyleProps`,
`StyleValue`, `ResponsiveStyleValue`. `STYLE_PROPS` is exported for tooling that needs to know
which props are style props.

Both accept every style prop below plus standard `div` attributes, `as` and `ref`.

| Category | Props |
|----------|-------|
| Margin | `m`/`margin`, `mt`/`marginTop`, `mr`/`marginRight`, `mb`/`marginBottom`, `ml`/`marginLeft`, `mx`/`marginX`, `my`/`marginY` |
| Padding | `p`/`padding`, `pt`/`paddingTop`, `pr`/`paddingRight`, `pb`/`paddingBottom`, `pl`/`paddingLeft`, `px`/`paddingX`, `py`/`paddingY` |
| Gap | `gap` (`Flex`) |
| Size | `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight` |
| Layout | `display`, `overflow`, `overflowX`, `overflowY` |
| Flexbox | `alignItems`, `justifyContent`, `flexDirection`, `flexWrap`, `flex`, `alignSelf` |
| Paint | `color`, `backgroundColor`, `opacity`, `fontSize`, `fontWeight`, `textAlign` |

## Value semantics

Three rules, all inherited from `styled-system` and all easy to get wrong:

- **Space props index `theme.space`** (`[0, 8, 12, 16, 24, 32, 48, 64]`). `ml={1}` is **8px**, not
  1px; `padding={4}` is **24px**. A number past the end of the scale falls back to pixels, which is
  why `mt={24}` is 24px. `gap` is on the same scale.
- **Negative margins scale; negative padding does not.** `mx={-2}` is **-12px** (magnitude indexes
  the scale, then the result is negated), while `p={-2}` is plain `-2px`. That asymmetry is
  `styled-system`'s, reproduced deliberately — `UTM.tsx` in puib relies on the margin half.
- **Size props read numbers at or below 1 as fractions.** `width={1}` is `100%`, `width={1 / 2}` is
  `50%`, `width={588}` is `588px`. Note `width={0}` is `0%`.
- **Tuples are mobile-first breakpoints.** `width={[1, 1 / 2]}` is `100%` up to
  `theme.breakpoints[0]` (768px) and `50%` above it. `null` skips a breakpoint; entries past the
  last breakpoint are dropped. The one exception is **`color`, which is typed as a plain string**:
  it is the only style prop `div` also declares, and styled-components intersects rather than
  replaces, so a tuple there would type as `string & readonly string[]` and break every consumer
  that writes `styled(Box)`. No call site passes a tuple to `color`.

Zero stays unitless (`my={0}` → `margin-top:0`). Strings always pass through, so `mx="auto"` and
`padding="0 24px"` work.

## Adding a prop

Add one row to `STYLE_PROPS` in `styleProps.ts`, pick its `kind`, and add it to the matching group
in `Box.types.ts`. Membership in `STYLE_PROPS` is also what keeps the prop out of the DOM, so
nothing else is needed. The set is deliberately closed to props that are actually used — `order`,
`flexGrow`, `bg` and `lineHeight` are absent because no call site passes them.

## Usage patterns

```tsx
import { Box, Flex } from '@synerise/ds-flex-box';

<Flex alignItems="center" justifyContent="space-between" gap={2} p={2}>
  <Box width={1 / 2}>Left</Box>
  <Box width={1 / 2} mt={24}>
    Right
  </Box>
</Flex>;
```

## Gotchas

- **`styled(Box)` and `styled(Flex)` still work unchanged.** `Box` is a real styled component, so a
  consumer's `styled(Box)` folds into it and lands in a later stylesheet group — winning at equal
  specificity, exactly as before. ~640 call sites in `portal-ui-bridge` depend on this.
- **`display: flex` beats a `display` prop on `Flex`**, because it sits in `Flex`'s own block after
  `Box`'s. Same precedence as the old implementation. Use `Box` if you need a different `display`.
- **Style props no longer reach the DOM.** The old implementation rendered
  `<div width="1" font-weight="500">` — `width`, `height`, `color`, `opacity` and `fontWeight` are
  valid attributes on *some* element, so styled-components' element-agnostic filter forwarded them.
  Anything targeting those attributes in CSS or tests will no longer match.
- **A consumer's own transient props are still filtered.** `shouldForwardStyleProp` chains to
  styled-components' default validator, so `styled(Box)<{ hasError: boolean }>` keeps working
  without leaking `hasError`.
- **Keyword prop types are hand-written unions, not `CSSProperties['alignItems']`.** An indexed
  access into `CSSProperties` resolves to a `csstype.Property.*` alias that TypeScript cannot name
  through a pnpm path when emitting declarations, so every downstream `styled(Box)` fails with
  TS2742. Keep new keyword props on the local `Keyword<>` helper.
- **Prefer the design system's media-query helpers** (`MEDIA_FROM`/`MEDIA_TO` in `@synerise/ds-core`)
  over responsive tuples for anything beyond a one-off width.

## Key dependencies

None at runtime. `styled-components ^5` and `@synerise/ds-core` are peers — the latter supplies
`theme.space` and `theme.breakpoints` through `DSProvider`. Outside a provider the engine falls back
to pixels for space props and to `styled-system`'s `[40em, 52em, 64em]` breakpoints.
