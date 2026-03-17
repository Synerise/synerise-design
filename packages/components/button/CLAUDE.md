# Button (`@synerise/ds-button`)

> Ant Design Button wrapper with a DS type/mode/colour system, ripple animation, loading spinner, and four specialised sub-variants (Toggle, Creator, Expander, Checkbox, Star).

## Package structure

```
src/
  Button.tsx            — main component (forwardRef)
  Button.types.tsx      — ButtonProps, ButtonMode enum, ButtonType, StyledButton
  Button.styles.tsx     — AntdButton styled wrapper + ripple/spinner helpers
  index.tsx             — public exports; attaches deprecated static sub-components to default
  ButtonToggle/         — two-state toggle button (activated / default)
  Checkbox/             — checkbox-style icon button (controlled + uncontrolled)
  Creator/              — "add item" dashed button with optional label (forwardRef)
  Expander/             — chevron expand/collapse icon button
  Star/                 — star favourite toggle icon button
  style/
    index.less          — global Ant Design button overrides
```

## Public exports

### `Button` (default)

`forwardRef<HTMLButtonElement, ButtonProps>`. All remaining Ant Design `ButtonProps` (except `type` and `ghost`) are forwarded.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `ButtonType` | `'secondary'` | Visual style. See ButtonType values below. |
| `mode` | `ButtonMode` | `undefined` | Icon/label layout. See ButtonMode values below. |
| `color` | `string` | `'red'` | Colour token (without hue) for `custom-color` / `custom-color-ghost` types. E.g. `'blue'`, `'green'`. |
| `iconColor` | `string` | `undefined` | Colour token for SVG icons on `secondary`, `tertiary`, `ghost` types (renders at `-600` hue). |
| `groupVariant` | `'left-rounded' \| 'squared' \| 'right-rounded'` | `undefined` | Used when buttons are joined in a group to control which corners are rounded. |
| `justifyContent` | `JustifyContentProperty` | `'center'` | CSS `justify-content` for the button's flex content. |
| `loading` | `boolean \| { delay?: number }` | `false` | Shows a spinning overlay and hides all other content. |
| `error` | `boolean` | `undefined` | Applies red error styling (background, border, text, icon). |
| `readOnly` | `boolean` | `undefined` | Disables ripple animation and freezes hover/focus styles (cursor: default). |
| `tagProps` | `TagProps` | `undefined` | Renders a `ds-tag` pill after the button label. Hidden in `single-icon` mode. |
| `tooltipProps` | `TooltipProps` | `undefined` | Wraps the button label in a `ds-tooltip`. |
| `onClick` | `(event: MouseEvent<HTMLElement>) => void` | `undefined` | Click handler. Also triggers ripple animation. |

#### `ButtonType` values
`'primary' | 'secondary' | 'tertiary' | 'tertiary-white' | 'ghost-primary' | 'ghost' | 'ghost-white' | 'custom-color' | 'custom-color-ghost'`

#### `ButtonMode` enum values
| Value | Constant |
|-------|----------|
| `'single-icon'` | `ButtonMode.SINGLE_ICON` — 32×32px icon-only; no min-width |
| `'split'` | `ButtonMode.SPLIT` — label + right icon with a divider |
| `'two-icons'` | `ButtonMode.TWO_ICONS` — left icon + label + right icon |
| `'label-icon'` | `ButtonMode.LABEL_ICON` — label then icon |
| `'icon-label'` | `ButtonMode.ICON_LABEL` — icon then label |

### `ButtonToggle`

Two-state button. Maps `activated` + `type` to underlying Button `type` prop internally.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activated` | `boolean` | `undefined` | Whether the button is in the active/selected state. |
| `type` | `'solid' \| 'ghost'` | `'solid'` | Style variant. `solid`: secondary↔primary swap; `ghost`: grey↔blue-050 swap. |

Inherits all `ButtonProps` except `type`, `danger`, `ghost`, `color`.

### `Creator`

"Add item" button with a dashed border and a `+` icon. `forwardRef<HTMLButtonElement, CreatorProps>`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | `undefined` | Optional text label next to the icon. |
| `block` | `boolean` | `undefined` | Full-width layout. |
| `labelAlign` | `'center' \| 'left'` | `'center'` | Label alignment when `block` is true. |
| `status` | `CreatorStatus` | `undefined` | Colour variant: `CreatorStatus.Default`, `.Error`, `.Upload`. |
| `disabled` | `boolean` | `undefined` | Disables the button. |
| `onClick` | `(event: MouseEvent<HTMLElement>) => void` | `undefined` | Click handler. |

### `Expander`

Chevron (`AngleDownS`) button for expand/collapse affordances.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `expanded` | `boolean` | `undefined` | Rotates the chevron 180° when true. |
| `size` | `'S' \| 'M'` | `'S'` | `S` = 24px, `M` = 32px (from `ExpanderSize` enum). |
| `disabled` | `boolean` | `undefined` | Disables the button. |
| `onClick` | `(event: MouseEvent<HTMLElement>) => void` | `undefined` | Click handler. |

### `Checkbox` (exported as `CheckboxButton`)

Icon-button that behaves like a checkbox (`role="checkbox"`, `aria-checked`). Supports both controlled and uncontrolled patterns.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `undefined` | Controlled checked state. |
| `defaultChecked` | `boolean` | `false` | Initial uncontrolled state. |
| `indeterminate` | `boolean` | `undefined` | Forces indeterminate state (`aria-checked="mixed"`). Clicking transitions to checked. |
| `hasError` | `boolean` | `undefined` | Error colour styling. |
| `onChange` | `(checked: boolean) => void` | `undefined` | Called with the next checked value after a click. |

### `Star` (exported as `StarButton`)

Star favourite toggle (`role="button"`, `aria-pressed`). Swaps between `StarM` and `StarFillM` icons.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `boolean` | `undefined` | Whether the star is filled. |
| `hasError` | `boolean` | `undefined` | Error colour styling on the icon. |
| `type` | `string` | `'ghost'` | Underlying Button type. |

### Types & enums

| Export | Description |
|--------|-------------|
| `ButtonProps` | Main button props interface |
| `StyledButton<T>` | Utility type for creating styled extensions of Button |
| `ButtonToggleProps` | Props for ButtonToggle |
| `CreatorProps` | Props for Creator |
| `CreatorStatus` | Enum: `Default`, `Error`, `Upload` |
| `StarButtonProps` | Props for Star |
| `CheckboxButtonProps` | Props for Checkbox |
| `ExpanderProps` | Props for Expander |
| `ExpanderSize` | Enum: `S = 24`, `M = 32` |
| `ButtonStyles` | Object of all styled-component exports (`Button`, `Creator`, `Checkbox`, `Expander`, `Star`) for styled-extension use |

## Usage patterns

```tsx
import Button, { ButtonToggle, Creator, Expander, Checkbox, Star } from '@synerise/ds-button';

// Standard button
<Button type="primary" onClick={handleClick}>Save</Button>

// Icon + label
<Button type="secondary" mode="icon-label">
  <Icon component={<EditM />} />
  Edit
</Button>

// Custom colour
<Button type="custom-color" color="green">Confirm</Button>

// Loading
<Button type="primary" loading>Saving…</Button>

// Toggle
<ButtonToggle activated={isOn} onClick={() => setIsOn(v => !v)}>
  Bold
</ButtonToggle>

// Creator
<Creator label="Add item" onClick={handleAdd} />

// Expander
<Expander expanded={open} onClick={() => setOpen(v => !v)} />

// Checkbox (uncontrolled)
<Checkbox defaultChecked onChange={(checked) => console.log(checked)} />

// Star (controlled)
<Star active={starred} onClick={() => setStarred(v => !v)} />

// Group variant
<Button type="secondary" groupVariant="left-rounded">Left</Button>
<Button type="secondary" groupVariant="squared">Mid</Button>
<Button type="secondary" groupVariant="right-rounded">Right</Button>
```

## Deprecated

The static sub-components on the default export (`Button.Creator`, `Button.Expander`, `Button.Star`, `Button.Checkbox`) are deprecated. Use named imports instead:

```tsx
// ❌ deprecated
import Button from '@synerise/ds-button';
<Button.Creator />

// ✅ preferred
import { Creator } from '@synerise/ds-button';
<Creator />
```

## Styling

`Button.styles.tsx` wraps Ant Design's `Button` with styled-components using `@synerise/ds-core` theme palette tokens. Notable internals:

- `AntdButton` — the main styled wrapper; maps `type='custom-color-ghost'` to Ant Design `ghost-primary` internally via `@ts-expect-error`.
- `RippleEffect` — `position: absolute` span that animates from click position, duration 500ms (`RIPPLE_ANIMATION_TIME`). Disabled when `readOnly`.
- `ButtonFocus` — inset `box-shadow` overlay for focus ring (replaces browser default outline).
- `Spinner` — absolute overlay with a rotating `SpinnerM` icon; all other children hidden via `opacity: 0` when `loading`.

## Key dependencies

- `antd/lib/button` — base component
- `@synerise/ds-icon` — `SpinnerM`, `CloseM`, `AngleDownS`, `AddM`, `StarM`/`StarFillM`, `CheckboxSelectedFillM`/`CheckboxIndeterminateM`
- `@synerise/ds-tag` — optional status tag rendered inside button label
- `@synerise/ds-tooltip` — optional tooltip wrapping button label
- `classnames` — used in Creator and Expander for className composition
- `csstype` — provides `JustifyContentProperty` type for `justifyContent`

## Implementation notes

- **`LiteralStringUnion<T>`** — `type`, `mode`, `color`, `iconColor`, `groupVariant` all use this utility type from `ds-utils`. It equals `T | (string & {})`, giving autocomplete hints while still accepting arbitrary strings.
- **Ripple origin** — the click handler computes `x/y` relative to the nearest `.ant-btn` ancestor (not the event target itself). If no `.ant-btn` is found, ripple and `onClick` do not fire.
- **`readOnly` vs `disabled`** — `readOnly` keeps the button visually enabled but prevents interaction appearance changes and suppresses the ripple. `disabled` is the standard Ant Design prop that disables all interaction.
- **`custom-color-ghost` internal mapping** — passed as `ghost-primary` to Ant Design. The styled-component then overrides colour/fill with the `customColor` token.
- **`ButtonToggle` blurs after pointer-up** — `setTimeout(..., 200)` removes focus after release to avoid persistent focus ring on mouse use.
- **`Checkbox` indeterminate click** — clicking an indeterminate checkbox always transitions to `checked=true` (not back to unchecked), regardless of the previous state.
- **`ButtonMode` enum is NOT re-exported from index** — it is exported from `Button.types.tsx` but `index.tsx` only re-exports the type. Import it directly: `import { ButtonMode } from '@synerise/ds-button/dist/Button.types'` or use the string literals.
