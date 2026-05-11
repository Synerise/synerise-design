# Button (`@synerise/ds-button`)

> Standalone button component with a DS type/mode/colour system, ripple animation, loading spinner, and specialised sub-variants (Toggle, Creator, Expander, Checkbox, Star).

## Package structure

```
src/
  BaseButton.tsx          — lightweight forwardRef button, generates ant-btn-* class names
  BaseButton.types.ts     — BaseButtonProps (extends ButtonHTMLAttributes)
  BaseButton.styles.ts    — styled.button with base layout styles, shouldForwardProp filter
  Button.tsx              — main DS component (forwardRef), adds ripple, spinner, focus ring
  Button.types.tsx        — ButtonProps, ButtonMode, ButtonType, StyledButton
  Button.styles.tsx       — StyledButton styled wrapper + variant colours + DS overrides
  Button.variants.ts      — 15 colour variant definitions (primary, ghost, danger, etc.)
  index.tsx               — public exports; attaches deprecated static sub-components
  ButtonToggle/           — two-state toggle button (activated / default)
  Checkbox/               — checkbox-style icon button (controlled + uncontrolled)
  Creator/                — "add item" dashed button with optional label (uses BaseButton)
  Expander/               — chevron expand/collapse icon button (uses BaseButton)
  Star/                   — star favourite toggle icon button
```

## Architecture

Three-layer styled-components chain:

1. **`BaseButton.styles.ts`** (`styled.button`) — base layout: height, font, border-radius, cursor, disabled, size classes. Single `&` specificity. Uses `shouldForwardProp` to filter DS-specific props from the native `<button>`.
2. **`BaseButton.tsx`** — renders `<S.Button>`, generates CSS class names (`ant-btn ant-btn-{type}`), handles loading delay, wraps text children in `<span>`.
3. **`Button.styles.tsx`** (`styled(BaseButton)`) — applies variant colours via `getVariantStyles()`, DS overrides (modes, error, custom-color, readOnly, ripple). Double `&&` specificity.

Sub-components that don't need ripple/spinner (Expander, Creator) use `BaseButton` directly. Sub-components that need the full DS button (Star, Checkbox) use `Button`.

### CSS class names

Preserves `ant-btn ant-btn-{type}` class name convention for compatibility with external packages that target these selectors (`table`, `modal`, `color-picker`, etc.). These are DS-internal conventions — antd is no longer a dependency.

### Icon colour inheritance

Icons use `currentColor` for fill/stroke. Button styles only set `color` on the button element — no direct `svg { fill }` overrides. Icons inherit automatically.

### Focus ring

Uses `:focus-visible` (not `:focus`) so the focus ring only appears on keyboard navigation, not mouse clicks. The `ButtonFocus` div renders an inset `box-shadow` overlay.

## Public exports

### `Button` (default)

`forwardRef<HTMLButtonElement, ButtonProps>`. Extends `BaseButtonProps` (which extends `ButtonHTMLAttributes<HTMLButtonElement>`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `LiteralStringUnion<ButtonType>` | `'secondary'` | Visual style variant |
| `mode` | `LiteralStringUnion<ButtonModes>` | `undefined` | Icon/label layout |
| `color` | `string` | `'red'` | Colour token for `custom-color` / `custom-color-ghost` types |
| `iconColor` | `string` | `undefined` | Colour token for icon colour on secondary/tertiary/ghost types |
| `groupVariant` | `'left-rounded' \| 'squared' \| 'right-rounded'` | `undefined` | Corner rounding for button groups |
| `justifyContent` | `JustifyContentProperty` | `'center'` | CSS justify-content |
| `loading` | `boolean \| { delay?: number }` | `false` | Shows spinning overlay |
| `error` | `boolean` | `undefined` | Red error styling |
| `readOnly` | `boolean` | `undefined` | Disables ripple, freezes hover/focus styles |
| `tagProps` | `TagProps` | `undefined` | Renders a pill tag after the label |
| `tooltipProps` | `TooltipProps` | `undefined` | Wraps label in a tooltip |
| `onClick` | `(event: MouseEvent<HTMLElement>) => void` | `undefined` | Click handler (also triggers ripple) |

#### `ButtonType` values
`'primary' | 'secondary' | 'tertiary' | 'tertiary-white' | 'ghost-primary' | 'ghost' | 'ghost-white' | 'custom-color' | 'custom-color-ghost'`

Additional variant types handled by `Button.variants.ts`: `'danger' | 'success' | 'warning' | 'gray' | 'dark' | 'flat' | 'primary-on-blue'`

#### `ButtonMode` values
| Value | Description |
|-------|-------------|
| `'single-icon'` | 32×32px icon-only; no min-width |
| `'split'` | label + right icon with a divider |
| `'two-icons'` | left icon + label + right icon |
| `'label-icon'` | label then icon |
| `'icon-label'` | icon then label |

### `ButtonToggle`

Two-state button. Maps `activated` + `type` to underlying Button `type` internally.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activated` | `boolean` | `undefined` | Active/selected state |
| `type` | `'solid' \| 'ghost'` | `'solid'` | Style variant |

### `Creator`

"Add item" button with dashed border and `+` icon. Uses `BaseButton` directly. `forwardRef<HTMLButtonElement, CreatorProps>`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | `undefined` | Optional text label |
| `block` | `boolean` | `undefined` | Full-width layout |
| `labelAlign` | `'center' \| 'left'` | `'center'` | Label alignment |
| `status` | `CreatorStatus` | `undefined` | `Default`, `Error`, `Upload` |

### `Expander`

Chevron button for expand/collapse. Uses `BaseButton` directly.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `expanded` | `boolean` | `undefined` | Rotates chevron 180° |
| `size` | `'S' \| 'M'` | `'S'` | S=24px, M=32px |

### `Checkbox` (exported as `CheckboxButton`)

Checkbox icon-button. Uses `Button` (needs ripple/focus ring).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `undefined` | Controlled state |
| `defaultChecked` | `boolean` | `false` | Uncontrolled initial state |
| `indeterminate` | `boolean` | `undefined` | Indeterminate state |
| `hasError` | `boolean` | `undefined` | Error styling |
| `onChange` | `(checked: boolean) => void` | `undefined` | Change callback |

### `Star` (exported as `StarButton`)

Star favourite toggle. Uses `Button`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `boolean` | `undefined` | Filled star |
| `hasError` | `boolean` | `undefined` | Error styling |

### Types & constants

| Export | Description |
|--------|-------------|
| `ButtonProps` | Main button props interface |
| `StyledButton<T>` | Utility type for styled extensions |
| `ButtonToggleProps` | Props for ButtonToggle |
| `CreatorProps` | Props for Creator |
| `CreatorStatus` | Enum: `Default`, `Error`, `Upload` |
| `StarButtonProps` | Props for Star |
| `CheckboxButtonProps` | Props for Checkbox |
| `ExpanderProps` | Props for Expander |
| `ExpanderSize` | Record: `{ S: 24, M: 32 }` |
| `ButtonStyles` | Object of all styled-component exports for extension |

## Key dependencies

- `@synerise/ds-icon` — `SpinnerM`, `AngleDownS`, `AddM`, `StarM`/`StarFillM`, `CheckboxSelectedFillM`/`CheckboxIndeterminateM`
- `@synerise/ds-tag` — optional status tag inside button label
- `@synerise/ds-tooltip` — optional tooltip wrapping button label
- `classnames` — className composition in Creator and Expander
- `csstype` — `JustifyContentProperty` type

## Implementation notes

- **No antd dependency** — standalone implementation. `BaseButton` generates `ant-btn-*` class names for backward compatibility with external packages.
- **`LiteralStringUnion<T>`** — `type`, `mode`, `color`, `iconColor`, `groupVariant` use this utility from `ds-utils` (`T | (string & {})`), giving autocomplete while accepting arbitrary strings.
- **Ripple origin** — click handler computes `x/y` relative to nearest `.ant-btn` ancestor.
- **`readOnly` vs `disabled`** — `readOnly` keeps the button visually enabled but prevents interaction appearance changes. `disabled` is the standard HTML attribute.
- **`custom-color-ghost`** — has its own variant entry in `Button.variants.ts` (maps to ghost-primary base styles). Hover preserves the custom color instead of switching to blue.
- **`ButtonToggle` blurs after pointer-up** — `setTimeout(..., 200)` removes focus after mouse use.
- **`Checkbox` indeterminate click** — always transitions to `checked=true`.

## Deprecated

Static sub-components on the default export (`Button.Creator`, `Button.Expander`, `Button.Star`, `Button.Checkbox`) are deprecated. Use named imports instead.
