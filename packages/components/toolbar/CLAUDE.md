# Toolbar (`@synerise/ds-toolbar`)

> A horizontal container for grouping action buttons, labels, and dividers into visually separated groups — typically used as a floating or fixed canvas/editor toolbar.

## Package structure

```
src/
  Toolbar.tsx          — root container (flex row, 8px gap)
  Toolbar.types.ts     — all prop types for Toolbar, ToolbarGroup, ToolbarButton, ToolbarLabel, ToolbarDivider
  Toolbar.styles.ts    — styled-components for all sub-components
  components/
    index.ts           — re-exports all sub-components
    ToolbarButton/
      ToolbarButton.tsx  — button with optional Badge and Tooltip wrapping
    ToolbarDivider/
      ToolbarDivider.tsx — vertical separator line
    ToolbarGroup/
      ToolbarGroup.tsx   — card-like group with white background and shadow
    ToolbarLabel/
      ToolbarLabel.tsx   — centred text label (e.g. zoom percentage)
  __specs__/
    Toolbar.spec.tsx
    ToolbarButton.spec.tsx
    ToolbarGroup.spec.tsx
```

## Public exports

`index.ts` exports:

- `default` — `Toolbar` (default export)
- `ToolbarGroup`
- `ToolbarButton`
- `ToolbarLabel`
- `ToolbarDivider`
- `ToolbarProps` (type)

### `Toolbar`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Content rendered inside the toolbar |
| ...htmlAttributes | `HTMLAttributes<HTMLDivElement>` | — | Spread onto the root `<div>` |

### `ToolbarGroup`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Buttons, labels, and dividers inside this group |
| isCompact | `boolean` | `false` | Removes the 4px gap between children when `true` |
| ...htmlAttributes | `HTMLAttributes<HTMLDivElement>` | — | Spread onto the root `<div>` |

### `ToolbarButton`

Extends `ButtonProps` from `@synerise/ds-button` with `type` overridden.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `'ghost-primary' \| 'ghost' \| 'custom-color-ghost'` | `'ghost'` | Button variant; defaults to `'ghost'` when not set |
| tooltipProps | `TooltipProps` | — | When provided, wraps the button in `@synerise/ds-tooltip` |
| badgeProps | `BadgeProps` | — | When provided, wraps the button in `@synerise/ds-badge` |
| mode | `ButtonProps['mode']` | — | Inherited from `ds-button` — use `'single-icon'` or `'icon-label'` |
| tagProps | `ButtonProps['tagProps']` | — | Inherited from `ds-button` — renders a coloured tag on the button |

> Note: `type` is omitted from `ButtonProps` and re-declared with the three ghost variants only.

### `ToolbarLabel`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Label text (e.g. `"100%"`) |
| ...htmlAttributes | `HTMLAttributes<HTMLDivElement>` | — | Spread onto the root `<div>` |

### `ToolbarDivider`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ...htmlAttributes | `HTMLAttributes<HTMLDivElement>` | — | Spread onto the root `<div>` |

> Renders a 1px vertical line that extends 4px above and below its container to fill the `ToolbarGroup` padding.

## Usage patterns

```tsx
import Toolbar, { ToolbarGroup, ToolbarButton, ToolbarLabel, ToolbarDivider } from '@synerise/ds-toolbar';
import Icon, { StepBackM, StepForwardM, AddM, RemoveM } from '@synerise/ds-icon';

// Basic toolbar with compact zoom group
<Toolbar>
  <ToolbarGroup>
    <ToolbarButton mode="single-icon">
      <Icon component={<StepBackM />} />
    </ToolbarButton>
    <ToolbarButton mode="single-icon">
      <Icon component={<StepForwardM />} />
    </ToolbarButton>
  </ToolbarGroup>

  <ToolbarGroup isCompact>
    <ToolbarButton mode="single-icon">
      <Icon component={<AddM />} />
    </ToolbarButton>
    <ToolbarLabel>100%</ToolbarLabel>
    <ToolbarButton mode="single-icon">
      <Icon component={<RemoveM />} />
    </ToolbarButton>
  </ToolbarGroup>
</Toolbar>

// Button with badge and tooltip
<ToolbarButton
  mode="icon-label"
  badgeProps={{ count: '5', outlined: true }}
  tooltipProps={{ title: 'Issues' }}
>
  <Icon component={<WarningM />} />
  Issues
</ToolbarButton>

// Divider inside a group (SchedulerToolbar pattern)
<ToolbarGroup>
  <ToolbarButton type="ghost" mode="icon-label">...</ToolbarButton>
  <ToolbarDivider />
  <ToolbarButton type="ghost" mode="single-icon">...</ToolbarButton>
</ToolbarGroup>
```

## Styling

- `Toolbar` — `display: flex; gap: 8px` — a flat flex row of groups.
- `ToolbarGroup` — white background, `padding: 4px`, `border-radius: 3px`, drop-shadow using `grey-900` at 4% opacity. Default inner gap is `4px`; `isCompact` removes it.
- `ToolbarLabel` — centred flex container, `padding: 0 12px`, medium weight, `grey-600` text colour.
- `ToolbarDivider` — 1px wide, `height: calc(100% + 8px)`, `margin: -4px 0` to bleed through the group's 4px padding; colour `grey-200`.
- All colour values come from the styled-components theme (`props.theme.palette`).

## Key dependencies

- `@synerise/ds-button` — `ToolbarButton` renders a `<Button>` with `type="ghost"` as the base.
- `@synerise/ds-badge` — conditionally wraps `ToolbarButton` when `badgeProps` is provided.
- `@synerise/ds-tooltip` — conditionally wraps `ToolbarButton` (or the Badge-wrapped button) when `tooltipProps` is provided.
- `@synerise/ds-utils` — provides `WithHTMLAttributes` helper type.

## Implementation notes

- `ToolbarButton` internally always passes `type="ghost"` to the underlying `<Button>`. The `type` prop on `ToolbarButtonProps` is typed as the three ghost variants but the component does not forward it to `<Button>` — the actual `type` prop passed to `Button` is hardcoded to `"ghost"`. If a different ghost variant is needed, the caller must handle it via another mechanism.
- Wrapping order when both `badgeProps` and `tooltipProps` are set: `Tooltip > Badge > Button`.
- Tests use Jest (not Vitest) — `jest.config.js` is present at the package root.
