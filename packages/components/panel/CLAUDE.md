# Panel (`@synerise/ds-panel`)

> A styled container with an optional label that wraps `Box` from `@synerise/ds-flex-box` and applies a white background, border or shadow, and configurable border radius.

## Package structure

```
src/
  Panel.tsx        — component implementation (forwardRef, outer div + optional Label + PanelWrapper)
  Panel.types.ts   — PanelProps type definition (Omit<BoxProps, 'label'> & BaseLabelProps + panel-specific props)
  Panel.const.ts   — DEFAULT_RADIUS (8) and DEFAULT_PADDING (8) constants
  Panel.styles.ts  — PanelWrapper styled-component (extends Box), Label styled-component (extends FormFieldLabel)
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

`forwardRef<HTMLDivElement, PanelProps>` — renders an outer `div` (receives `ref`, `className`, `style`) containing an optional `FormFieldLabel` and a `PanelWrapper` (styled `Box`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `radius` | `number` | `8` | Border radius in pixels applied to the wrapper |
| `greyBackground` | `boolean` | `undefined` | When `true`: applies a drop shadow (`box-shadow: 0 4px 12px 0 rgba(35,41,54,0.04)`); when `false`/absent: applies a `1px solid grey-200` border |
| `label` | `React.ReactNode` | `undefined` | Label rendered above the panel via `FormFieldLabel` |
| `tooltip` | `React.ReactNode` | `undefined` | Tooltip content shown next to the label (info icon trigger) |
| `tooltipConfig` | `TooltipProps` | `undefined` | Extra config for the label tooltip |
| `children` | `React.ReactNode` | — | Panel content |
| `className` | `string` | `undefined` | CSS class applied to the outer wrapper div |
| `style` | `React.CSSProperties` | `undefined` | Inline styles applied to the outer wrapper div |
| `ref` | `React.Ref<HTMLDivElement>` | — | Forwarded to the outer wrapper div |
| _(all `BoxProps`)_ | — | — | Space, layout, and color props from `@rebass/grid` (e.g. `p`, `m`, `width`, `display`, `alignItems`, …); `p` defaults to `8` via `DEFAULT_PADDING`. Note: `label` is omitted from `BoxProps` since `BaseLabelProps` provides it. |

## Usage patterns

```tsx
import Panel from '@synerise/ds-panel';

// Default — white background, 1px grey-200 border, 8px radius, 8px padding
<Panel>
  <ListItem>Item</ListItem>
</Panel>

// With label and tooltip
<Panel label="Section Title" tooltip="More info about this section">
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

- The outer element is a plain `div` that receives `ref`, `className`, and `style`.
- `PanelWrapper` extends `Box` from `@synerise/ds-flex-box` (which re-exports `@rebass/grid`), so all `styled-system` space/layout props work.
- `Label` extends `FormFieldLabel` from `@synerise/ds-form-field` with `margin-bottom: 8px`.
- Background is always `theme.palette.white`.
- `greyBackground` toggles between a border and a box-shadow — it does **not** change the background colour despite its name.
- `$radius` is passed as a transient styled-components prop (prefixed `$`) to avoid forwarding to the DOM.
- Default padding (`p={8}`) is set at the component level and can be overridden via `BoxProps`.

## Key dependencies

- `@synerise/ds-flex-box` (workspace) — provides `Box` and `BoxProps`
- `@synerise/ds-form-field` (workspace) — provides `FormFieldLabel` and `BaseLabelProps`
- `@synerise/ds-core` (peer) — theme provider required for `theme.palette` tokens
- `react >=16.9.0 <= 18.3.1` (peer)

## Implementation notes

- Uses **Jest** (not Vitest) — `jest.config.js` present.
- No internal state — purely a presentational wrapper.
- `PanelProps` is defined as `Omit<BoxProps, 'label'> & BaseLabelProps & { radius?; greyBackground? }` — `label` is omitted from `BoxProps` to avoid conflict with `BaseLabelProps.label`.
- The component destructures `label`, `tooltip`, `tooltipConfig`, `color`, `className`, `style` from props; remaining props are spread onto `PanelWrapper` as `BoxProps`.
- `greyBackground` is passed through to the `PanelWrapper` styled-component without a `$` prefix but does not leak to the DOM — `Box` from rebass filters unknown props via `shouldForwardProp`.
