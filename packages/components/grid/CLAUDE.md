# Grid (`@synerise/ds-grid`)

> A responsive CSS Grid layout component. The grid adapts its column count to the current breakpoint (via `@synerise/ds-utils`'s `useBreakpoint`), and each `Grid.Item` declares how many columns it should span at each breakpoint.

## Package structure

```
src/
  Grid.tsx              — root component; manages breakpoint state, provides GridContext
  Grid.types.ts         — GridProps and GridItemProps
  Grid.styles.ts        — GridContainer and GridItem styled-components
  Grid.context.ts       — GridContext (DimensionsWithBreakpoint)
  Grid.const.ts         — DEFAULT_GUTTER (24), DEFAULT_COLUMNS_NUMBER (24)
  index.ts              — default export only
  GridItem/
    GridItem.tsx        — Grid.Item sub-component; reads context and resolves column span
  __specs__/
    Grid.spec.tsx       — render and item-count tests
```

## Public exports

### `Grid` (default)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gutter` | `number` | `24` | Gap between grid cells (px). Applied as both `grid-row-gap` and `grid-column-gap`. |
| `style` | `CSSProperties` | `undefined` | Inline style on the grid container. |
| `children` | `ReactNode \| ReactNode[]` | `undefined` | Grid items or other content. |

The grid container renders as `display: grid` with `grid-template-columns: repeat(N, 1fr)` where N is the column count for the current breakpoint (from `useBreakpoint`). Falls back to `DEFAULT_COLUMNS_NUMBER` (24) when no breakpoint is matched.

### `Grid.Item`

Sub-component attached as a static property. Reads breakpoint from `GridContext`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `xxl` | `number` | `undefined` | Columns to span at `xxl` breakpoint (screen > 1600px, max 24 cols). `0` = `display: none`. |
| `xl` | `number` | `undefined` | Columns to span at `xl` breakpoint (screen > 1280px, max 16 cols). `0` = `display: none`. |
| `lg` | `number` | `undefined` | Columns to span at `lg` breakpoint (screen > 960px, max 12 cols). `0` = `display: none`. |
| `md` | `number` | `undefined` | Columns to span at `md` breakpoint (screen > 768px, max 8 cols). `0` = `display: none`. |
| `sm` | `number` | `undefined` | Columns to span at `sm` breakpoint (screen > 320px, max 8 cols). `0` = `display: none`. |
| `xs` | `number` | `undefined` | Columns to span at `xs` breakpoint (screen ≤ 320px, max 4 cols). `0` = `display: none`. |
| `contentWrapper` | `boolean` | `undefined` | When `true`, centers the item horizontally within the grid using explicit `grid-column-start`/`end`. Also wraps children in a flex column and adds `margin-bottom: 24px` to each child. |
| `children` | `ReactNode \| ReactNode[]` | `undefined` | |

## Usage patterns

```tsx
import Grid from '@synerise/ds-grid';

<Grid gutter={24}>
  <Grid.Item xxl={8} xl={8} lg={6} md={4} sm={8} xs={4}>
    <Card>...</Card>
  </Grid.Item>
  <Grid.Item xxl={8} xl={4} lg={6} md={4} sm={8} xs={4}>
    <Card>...</Card>
  </Grid.Item>
  <Grid.Item xxl={8} xl={4} lg={0} md={0} sm={0} xs={0}>
    {/* Hidden at lg and below */}
    <Card>...</Card>
  </Grid.Item>
</Grid>

// contentWrapper — centers content block and stacks children
<Grid>
  <Grid.Item xxl={12} contentWrapper>
    <FormSection />
    <FormSection />
  </Grid.Item>
</Grid>
```

## Context / Provider

`GridContext` is created in `Grid.context.ts` and holds a `DimensionsWithBreakpoint` value (current window dimensions + breakpoint data from `@synerise/ds-utils`). `Grid` provides it; `Grid.Item` consumes it via `useContext`. No external Provider is needed.

> **SSR warning:** `Grid.context.ts` sets the context default value using `window.innerWidth` and `window.innerHeight` directly in `createContext(...)`. This will throw in Node/SSR environments.

## Styling

`GridContainer` uses `grid-template-columns: repeat(N, 1fr)` where N is the active breakpoint's column count. `GridItem` uses `grid-column: span N` and sets `display: none` when `columns === 0`. When `contentWrapper` is true, explicit start/end positions center the item: `start = (maxColumns - columns) / 2 + 1`.

No theme tokens are used in grid styles — layout values are computed from props.

## Key dependencies

- `@synerise/ds-utils` (`useBreakpoint`) — provides current window dimensions and the active breakpoint object (with `name` and `columns`). The breakpoint determines how many columns the grid renders.

## Implementation notes

- **Breakpoint fallback in `GridItem`** — when no span prop is defined for the current breakpoint, `GridItem` walks _forward_ through `['xxl', 'xl', 'lg', 'md', 'sm', 'xs']` to find the next defined breakpoint with a higher index (i.e., a smaller screen size). It does **not** fall back to larger breakpoints.
- **`columns=0` hides the item** — the CSS sets `display: none` when the computed span is 0. This is how items are hidden at specific breakpoints.
- **Column count vs span** — the number of available columns (from the breakpoint object) and the span value (from the item's props) are separate concepts. The grid container column count changes with the breakpoint; the item span is resolved independently per breakpoint.
- **`contentWrapper` centering formula** — `grid-column-start = (maxColumns - columns) / 2 + 1`. This only works correctly when `(maxColumns - columns)` is even. Odd differences will produce a non-integer (e.g., `1.5`), which browsers may round.
- **Uses Jest** (not Vitest) — `package.json` has `"test": "jest"`. Not yet migrated.
