# FlexBox (`@synerise/ds-flex-box`)

> Thin re-export of `Flex` and `Box` from `@rebass/grid` — provides CSS flexbox layout primitives styled with `styled-components` and `styled-system`.

## Package structure

```
src/
 index.ts — re-exports Flex, Box, BoxProps, FlexProps from @rebass/grid
```

No custom source — the entire package is a pass-through to `@rebass/grid ^6`.

## Public exports

### `Flex`

Flexbox container. Accepts all `BoxProps` plus flex-specific `styled-system` props.

### `Box`

Generic block/flex-item. Accepts `BoxProps`.

Both components accept standard HTML div attributes in addition to `styled-system` props.

Key `styled-system` prop categories (from `@rebass/grid`):

| Category | Example props |
|----------|--------------|
| Space | `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`, `p`, `pt`, … |
| Color | `color`, `bg` |
| Layout | `width`, `height`, `minWidth`, `maxWidth`, `display` |
| Flexbox | `alignItems`, `justifyContent`, `flexWrap`, `flexDirection` _(Flex only)_ |

### Type exports

`BoxProps`, `FlexProps` — re-exported from `@rebass/grid`.

## Usage patterns

```tsx
import { Flex, Box } from '@synerise/ds-flex-box';

<Flex alignItems="center" justifyContent="space-between" p={2}>
 <Box width={1 / 2}>Left</Box>
 <Box width={1 / 2}>Right</Box>
</Flex>
```

## Key dependencies

- `@rebass/grid ^6` — provides `Flex` and `Box` styled-components
- `@types/rebass__grid` — **devDependency on purpose, do not promote it to a dependency.** It is
  stale: it describes an older `@rebass/grid` prop set (`space`, `width`, `fontSize`, `color`,
  `flex`, `order`, `alignSelf`), while the installed 6.1.0 composes
  `space + color + layout + typography + flexbox` onto `Box` (and `Flex` is `Box` + `display:flex`).
  The types therefore reject props that work at runtime — `minWidth`, `maxWidth`, `height`, and any
  flexbox prop on `Box`. Shipping them to consumers broke ~97 call sites in `portal-ui-bridge`.
  Consumers get no `Box`/`Flex` prop types as a result, which is the status quo until
  `refactor/flex-box-drop-rebass` (synerise-design!3946) replaces `@rebass/grid` with a first-party
  typed prop table.
- `styled-components ^5` (peer) — rendering engine for `@rebass/grid`

## Implementation notes

- This package adds **no logic** — all behaviour comes from `@rebass/grid`. Refer to [rebass docs](https://rebassjs.org/grid) for the full prop API.
- Uses **Vitest**, like every other component package; there is no `jest.config.js`.
- `styled-system` values: numbers map to theme space scale; fractions map to percentage widths (e.g., `width={1/2}` → `50%`).
