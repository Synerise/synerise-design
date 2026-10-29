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
| `splitMode` | `boolean` | `undefined` | Adds a 1px divider before `single-icon` buttons, coloured like Button `mode="split"` |
| `error` | `boolean` | `undefined` | In `splitMode`, switches borders to `--ds-buttons-error-border` |
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
- **`splitMode`** — the divider is `border-left: 1px solid var(--ds-button-split-separator)`, a property each ds-button sets from its type (and `color` for `custom-color`). Secondary keeps its own inset-shadow seam.
- **`fullWidth`** — outer `width: 100%`, inner buttons `flex: 1`.

## Key dependencies

- `@synerise/ds-button` — expected child component
- `@synerise/ds-divider` — base for `ButtonDivider`

## Implementation notes

- **No antd dependency** — `Button.Group` replaced with a plain `<div className="ant-btn-group">`.
- **`compact` corner rounding** — handled by CSS `:first-child` / `:last-child` selectors on the group container. Individual `groupVariant` props on buttons are no longer required for basic groups.
- **`splitMode` divider colour comes from the button** — a new button type only needs an entry in ds-button's `splitSeparatorTokens`. The hover/focus and `error` rules still use `.ant-btn-*` selectors.
- **`disabled` is CSS-only** — not forwarded to child buttons. Disable buttons individually.
