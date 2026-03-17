# ButtonGroup (`@synerise/ds-button-group`)

> Wraps a series of `ds-button` elements in an Ant Design `Button.Group`, adding optional title/description labels, horizontal alignment, full-width stretch, split-mode borders, error state, and compact/spaced layout control.

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
| `children` | `ReactNode` | `undefined` | Button elements to render inside the group. |
| `title` | `string` | `undefined` | Optional heading rendered above the button row. |
| `description` | `string` | `undefined` | Optional helper text rendered below the button row. |
| `size` | `'small' \| 'middle' \| 'large'` | `undefined` | Passed directly to Ant Design `Button.Group` to size all child buttons. |
| `buttonsPosition` | `'left' \| 'center' \| 'right'` | `'center'` | Horizontal alignment of the button row (`flex-start` / `center` / `flex-end`). |
| `fullWidth` | `boolean` | `undefined` | Container takes `width: 100%`; each button gets `flex: 1` to fill the space. |
| `compact` | `boolean` | `true` | `true` = zero gap between buttons with square corners; `false` = 8px gap with rounded corners. |
| `splitMode` | `boolean` | `undefined` | Adds 1px borders between adjacent `single-icon` buttons. Border colour and visibility vary per button type (see styling notes). |
| `error` | `boolean` | `undefined` | In `splitMode`, switches divider borders to `red-600` and adjusts hover shadows. |
| `disabled` | `boolean` | `undefined` | Passed to the container; used by CSS selectors inside `splitMode` to suppress hover effects. |
| `className` | `string` | `undefined` | Extra class on the container div (always includes `ds-button-group`). |

Also accepts all props from Ant Design `ButtonGroupProps` (e.g. `prefixCls`).

### `ButtonDivider`

Zero-props vertical divider. Renders a styled `ds-divider` with `type="vertical"`, `grey-300` border colour, `height: auto`, and zero margin. Drop it between buttons inside a `ButtonGroup` to visually separate them.

```tsx
<ButtonGroup>
  <Button>Left</Button>
  <ButtonDivider />
  <Button>Right</Button>
</ButtonGroup>
```

### Types

| Export | Description |
|--------|-------------|
| `ButtonGroupProps` | Full props interface |

## Usage patterns

```tsx
import ButtonGroup, { ButtonDivider } from '@synerise/ds-button-group';
import Button from '@synerise/ds-button';

// Basic
<ButtonGroup>
  <Button type="secondary">One</Button>
  <Button type="secondary">Two</Button>
  <Button type="secondary">Three</Button>
</ButtonGroup>

// Full-width, left-aligned, with title
<ButtonGroup title="Actions" fullWidth buttonsPosition="left">
  <Button type="primary">Save</Button>
  <Button type="secondary">Cancel</Button>
</ButtonGroup>

// Spaced (non-compact)
<ButtonGroup compact={false}>
  <Button type="secondary">A</Button>
  <Button type="secondary">B</Button>
</ButtonGroup>

// Split mode (icon buttons with dividers)
<ButtonGroup splitMode>
  <Button type="custom-color" color="blue" mode="single-icon"><Icon component={<EditM />} /></Button>
  <Button type="custom-color" color="blue" mode="single-icon"><Icon component={<TrashM />} /></Button>
</ButtonGroup>

// With visual ButtonDivider
<ButtonGroup compact={false}>
  <Button>Left</Button>
  <ButtonDivider />
  <Button>Right</Button>
</ButtonGroup>
```

## Styling

`ButtonGroup.styles.ts` uses `@synerise/ds-core` theme palette tokens.

- **`compact={true}` (default)** — `gap: 0`, buttons get `border-radius: 0`. Use `ds-button`'s `groupVariant` prop on individual buttons to round the outer corners.
- **`compact={false}`** — `gap: 8px`, each button gets `border-radius: 3px` independently.
- **`splitMode`** — adds CSS borders via class selectors targeting `.ds-button.single-icon.ant-btn-*`. The border is `rgba` white/grey so it appears as a subtle separation on coloured backgrounds. When `error=true`, borders switch to solid `red-600`.
- **`fullWidth`** — outer container is `width: 100%`, inner buttons get `flex: 1`.

## Key dependencies

- `antd/lib/button` (`Button.Group`) — provides the base flex group container and size prop passthrough
- `@synerise/ds-button` — expected child component
- `@synerise/ds-divider` — base for `ButtonDivider`

## Implementation notes

- **`compact` and `groupVariant` work together** — `compact` removes border-radius from the group container, but individual button corners must be manually controlled via `ds-button`'s `groupVariant` (`left-rounded`, `squared`, `right-rounded`) to achieve the typical pill-group appearance.
- **`splitMode` targets CSS classes directly** — the split-border logic uses Ant Design/DS class name selectors (`.ant-btn-custom-color`, `.ant-btn-primary`, etc.) rather than React props. Adding a new button type requires updating the styled-component CSS.
- **`disabled` prop is CSS-only** — it is passed to the styled `Container` and used in `:hover:not(:disabled)` selectors, but is not forwarded to `Button.Group` or child buttons. Individual `Button` components must be disabled separately.
- **`ButtonDivider` accepts no props** — it renders a fixed-style vertical divider. If custom colours or sizes are needed, create a local styled extension.
