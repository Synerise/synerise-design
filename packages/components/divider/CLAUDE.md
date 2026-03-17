# Divider (`@synerise/ds-divider`)

> A visual separator that renders an SVG-based horizontal or vertical line, with optional uppercase text labels above and/or below it.

## Package structure

```
src/
  Divider.tsx           — main component (renders labels + Line)
  Divider.types.ts      — DividerProps interface, DividerType union
  Divider.styles.ts     — Label styled component (Title from ds-typography)
  index.ts              — public exports
  components/
    Line.tsx            — SVG line element with accessibility role
    Line.styles.tsx     — styled wrapper with margin/orientation logic
    Line.const.ts       — SVG attribute presets for horizontal/vertical types
  __specs__/
    Divider.spec.tsx    — render, label, and margin tests
```

## Public exports

### `Divider` (default export)

Primary component. Accepts all native `HTMLDivElement` attributes via `WithHTMLAttributes` from `@synerise/ds-utils`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation of the divider line |
| `dashed` | `boolean` | `false` | Renders line as dashed (`strokeDasharray="1 2"`) instead of solid |
| `hiddenLine` | `boolean` | `false` | Hides the SVG line; only labels are rendered |
| `labelAbove` | `ReactNode` | — | Text/node rendered above the line, styled as uppercase grey `Title` level 7 |
| `labelBelow` | `ReactNode` | — | Text/node rendered below the line, styled as uppercase grey `Title` level 7 |
| `marginTop` | `number` | `0` | Top margin of the line in px |
| `marginBottom` | `number` | `0` | Bottom margin of the line in px |
| `withSideMargin` | `boolean` | — | Adds `12px` left/right margin to horizontal dividers |
| `className` | `string` | — | Forwarded to the inner `Line` wrapper element |
| `style` | `React.CSSProperties` | — | Forwarded to the inner `Line` wrapper element |

No `forwardRef` — the component does not expose a DOM ref.

### `DividerProps`

TypeScript interface re-exported for consumers that need to type props.

## Usage patterns

```tsx
import Divider from '@synerise/ds-divider';

// Horizontal solid line
<Divider marginTop={16} marginBottom={16} />

// Dashed with side margin
<Divider dashed withSideMargin />

// With labels
<Divider labelAbove="Section title" labelBelow="More info" withSideMargin />

// Vertical (inline)
<span>Left</span>
<Divider type="vertical" />
<span>Right</span>

// Line hidden — labels only
<Divider hiddenLine labelAbove="Category" />
```

## Styling

Styles are split between two files:
- `Divider.styles.ts` — `Label`: extends `Title` from `@synerise/ds-typography` with uppercase transform, `grey-500` colour, fixed height/margin.
- `Line.styles.tsx` — `Line` wrapper div: controls `display`, margins, width/height, and line colour (`grey-300` solid / `grey-400` dashed) via `@synerise/ds-core` theme tokens.

Vertical dividers switch to `display: inline-block` with `height: 0.9em` (relative to surrounding font size) and a fixed `8px` horizontal margin — these are not configurable via props.

## Key dependencies

- `@synerise/ds-typography` — `Title` used for label rendering
- `@synerise/ds-utils` — `WithHTMLAttributes` utility type
- `@synerise/ds-core` — theme palette tokens consumed in styled-components

## Implementation notes

- The line is rendered as an **SVG** (not `<hr>`). `vectorEffect="non-scaling-stroke"` keeps the stroke at exactly 2px regardless of SVG viewport scaling.
- CSS class names are added automatically to the line wrapper: `ds-divider-line`, `ds-divider-horizontal`/`ds-divider-vertical`, `ds-divider-solid`/`ds-divider-dashed`. These can be targeted in integration tests or for external overrides.
- `role="separator"` is applied to the `Line` wrapper for accessibility.
- `className` and `style` props are forwarded to the inner `Line` element, **not** to the outer React Fragment wrapper — `labelAbove`/`labelBelow` sit outside the classed element.
- Vertical divider height (`0.9em`) is hardcoded and inherits from the parent font size; there is no `height` prop.
