# ButtonGroup (`@synerise/ds-button-group`)

> Wraps a series of `ds-button` elements in a flex container, adding optional title/description labels, horizontal alignment, full-width stretch, split-mode borders, error state, and compact/spaced layout control.

## Package structure

```
src/
  ButtonGroup.tsx           — main component
  ButtonGroup.types.ts      — ButtonGroupProps
  ButtonGroup.styles.ts     — Container, Title, Description styled components
  ButtonDivider/
    ButtonDivider.tsx        — zero-props vertical divider between buttons
    ButtonDivider.styles.tsx — styled ds-divider
  index.ts                  — public exports
```

## Public exports

### `ButtonGroup` (default)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | Button elements to render inside the group |
| `title` | `string` | `undefined` | Optional heading above the button row |
| `description` | `string` | `undefined` | Optional helper text below the button row |
| `size` | `'small' \| 'middle' \| 'large'` | `undefined` | Size class applied to the group container |
| `buttonsPosition` | `'left' \| 'center' \| 'right'` | `'center'` | Horizontal alignment |
| `fullWidth` | `boolean` | `undefined` | Container `width: 100%`, buttons `flex: 1` |
| `compact` | `boolean` | `true` | `true` = zero gap, square middle corners, rounded outer corners; `false` = 8px gap, all corners rounded |
| `splitMode` | `boolean` | `undefined` | Adds 1px borders between adjacent `single-icon` buttons |
| `error` | `boolean` | `undefined` | In `splitMode`, switches borders to `red-600` |
| `disabled` | `boolean` | `undefined` | CSS-only, suppresses hover effects in splitMode |
| `className` | `string` | `undefined` | Extra class (always includes `ds-button-group`) |

### `ButtonDivider`

Zero-props vertical divider. Renders a styled `ds-divider` with `type="vertical"`.

### Types

| Export | Description |
|--------|-------------|
| `ButtonGroupProps` | Full props interface |

## Styling

- **`compact={true}`** — `gap: 0`, inner buttons `border-radius: 0`, first child gets `3px 0 0 3px`, last child gets `0 3px 3px 0`.
- **`compact={false}`** — `gap: 8px`, each button `border-radius: 3px`.
- **`splitMode`** — CSS borders via `.ant-btn-*` class selectors.
- **`fullWidth`** — outer `width: 100%`, inner buttons `flex: 1`.

## Key dependencies

- `@synerise/ds-button` — expected child component
- `@synerise/ds-divider` — base for `ButtonDivider`

## Implementation notes

- **No antd dependency** — `Button.Group` replaced with a plain `<div className="ant-btn-group">`.
- **`compact` corner rounding** — handled by CSS `:first-child` / `:last-child` selectors on the group container. Individual `groupVariant` props on buttons are no longer required for basic groups.
- **`splitMode` targets CSS classes** — uses `.ant-btn-*` selectors. Adding a new button type requires updating the styled-component CSS.
- **`disabled` is CSS-only** — not forwarded to child buttons. Disable buttons individually.
