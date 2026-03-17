# Panel (`@synerise/ds-panel`)

> A simple styled container that wraps `Box` from `@synerise/ds-flex-box` and applies a white background, border or shadow, and configurable border radius.

## Package structure

```
src/
  Panel.tsx        — component implementation (forwardRef wrapper around PanelWrapper)
  Panel.types.ts   — PanelProps type definition
  Panel.const.ts   — DEFAULT_RADIUS (8) and DEFAULT_PADDING (8) constants
  Panel.styles.ts  — PanelWrapper styled-component (extends Box)
  index.ts         — public exports: default Panel, PanelProps
  modules.d.ts     — SVG/asset module declarations
  __specs__/
    Panel.test.tsx — Jest tests
```

## Public exports

```ts
export { default } from './Panel';        // Panel component
export type { PanelProps } from './Panel.types';
```

### `Panel`

`forwardRef<HTMLDivElement, PanelProps>` — renders as a `div` via `Box`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `radius` | `number` | `8` | Border radius in pixels applied to the wrapper |
| `greyBackground` | `boolean` | `undefined` | When `true`: applies a drop shadow (`box-shadow: 0 4px 12px 0 rgba(35,41,54,0.04)`); when `false`/absent: applies a `1px solid grey-200` border |
| `children` | `React.ReactNode` | — | Panel content |
| `ref` | `React.Ref<HTMLDivElement>` | — | Forwarded to the underlying DOM div |
| _(all `BoxProps`)_ | — | — | Space, layout, and color props from `@rebass/grid` (e.g. `p`, `m`, `width`, `display`, `alignItems`, …); `p` defaults to `8` |

## Usage patterns

```tsx
import Panel from '@synerise/ds-panel';

// Default — white background, 1px grey-200 border, 8px radius, 8px padding
<Panel>
  <ListItem>Item</ListItem>
</Panel>

// Grey background variant (shadow instead of border)
<Panel greyBackground>
  <ListItem>Item</ListItem>
</Panel>

// Custom radius and padding
<Panel radius={16} p={24}>
  Content
</Panel>

// Ref forwarding
const ref = React.createRef<HTMLDivElement>();
<Panel ref={ref}>Content</Panel>
```

## Styling

- Extends `Box` from `@synerise/ds-flex-box` (which re-exports `@rebass/grid`), so all `styled-system` space/layout props work.
- Background is always `theme.palette.white`.
- `greyBackground` toggles between a border and a box-shadow — it does **not** change the background colour despite its name.
- `$radius` is passed as a transient styled-components prop (prefixed `$`) to avoid forwarding to the DOM.
- Default padding (`p={8}`) is set at the component level and can be overridden via `BoxProps`.

## Key dependencies

- `@synerise/ds-flex-box` (workspace) — provides `Box` and `BoxProps`
- `@synerise/ds-core` (peer) — theme provider required for `theme.palette` tokens
- `react >=16.9.0 <= 18.3.1` (peer)

## Implementation notes

- Uses **Jest** (not Vitest) — `jest.config.js` present.
- No internal state — purely a presentational wrapper.
- `greyBackground` is declared on both the `PanelProps` type and the `PanelWrapper` styled-component props, so it is forwarded to the DOM. Consider adding a `$` prefix in a future refactor to avoid the unknown-prop React warning.
