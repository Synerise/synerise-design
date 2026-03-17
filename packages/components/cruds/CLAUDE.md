# Cruds (`@synerise/ds-cruds`)

> A row of icon-button actions (add, edit, duplicate, delete, move, etc.) for list/table items, where each action is rendered only when its corresponding callback is provided.

## Package structure

```
src/
  Cruds.tsx           — main component; conditionally renders SingleAction per callback
  Cruds.types.ts      — CrudsProps interface, CrudsSubComponents type
  Cruds.styles.tsx    — CrudsContainer, IconWrapper styled-components
  SingleAction.tsx    — tooltip-wrapped icon button used for each action
  SingleAction.types.ts — SingleActionProps
  index.ts            — default export only (Cruds)
```

## Public exports

### `Cruds` (default export)

`React.FC<CrudsProps> & { CustomAction: typeof SingleAction }`

Each action is rendered **only when its corresponding `on*` callback is provided** — there are no separate `visible` flags.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onAdd` | `(event?: MouseEvent) => void` | — | Renders add button (AddS icon) |
| `onEdit` | `(event?: MouseEvent) => void` | — | Renders edit button (EditS icon) |
| `onDuplicate` | `(event?: MouseEvent) => void` | — | Renders duplicate button (DuplicateS icon) |
| `onDelete` | `(event?: MouseEvent) => void` | — | Renders delete button (TrashS icon, red) |
| `onRemove` | `(event?: MouseEvent) => void` | — | Renders remove button (CloseS icon, red) |
| `onMove` | `(event?: MouseEvent) => void` | — | Renders drag-handle button (DragHandleM icon) |
| `onMoveUp` | `(event?: MouseEvent) => void` | — | Renders move-up button (ArrowUpS icon) |
| `onMoveDown` | `(event?: MouseEvent) => void` | — | Renders move-down button (ArrowDownS icon) |
| `onPreview` | `() => void` | — | Renders preview button (ShowM icon); **no event parameter** |
| `addTooltip` | `ReactNode` | — | Tooltip content for the add button |
| `editTooltip` | `ReactNode` | — | Tooltip content for the edit button |
| `duplicateTooltip` | `ReactNode` | — | Tooltip content for the duplicate button |
| `deleteTooltip` | `ReactNode` | — | Tooltip content for the delete button |
| `removeTooltip` | `ReactNode` | — | Tooltip content for the remove button |
| `moveTooltip` | `ReactNode` | — | Tooltip content for the move button |
| `moveUpTooltip` | `ReactNode` | — | Tooltip content for the move-up button |
| `moveDownTooltip` | `ReactNode` | — | Tooltip content for the move-down button |
| `previewTooltip` | `ReactNode` | — | Tooltip content for the preview button |
| `moveUpInactive` | `boolean` | — | Disables move-up button visually (grey, no pointer) |
| `moveDownInactive` | `boolean` | — | Disables move-down button visually (grey, no pointer) |

All additional HTML `div` attributes are spread onto the root `CrudsContainer`.

### `Cruds.CustomAction`

Sub-component for adding custom actions with the same visual style. Internally calls `SingleAction` directly (not via JSX, just a function call wrapper).

Props (`SingleActionProps`):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | — | **Required.** Tooltip content |
| `icon` | `ReactNode` | — | **Required.** Icon element |
| `onClick` | `() => void` | — | **Required.** Click handler |
| `className` | `string` | — | CSS class applied to the icon wrapper |
| `inactive` | `boolean` | — | Disables visually (grey, no pointer) |
| `iconSize` | `number` | `24` | Icon size in px |

Also accepts all HTML `div` attributes via `WithHTMLAttributes<HTMLDivElement, ...>`.

## Usage patterns

```tsx
import Cruds from '@synerise/ds-cruds';
import { Settings2S } from '@synerise/ds-icon';

// Standard actions — only provided callbacks render
<Cruds
  onAdd={handleAdd}
  onEdit={handleEdit}
  onDelete={handleDelete}
  addTooltip="Add"
  editTooltip="Edit"
  deleteTooltip="Delete"
/>

// Move up/down with inactive state
<Cruds
  onMoveUp={handleMoveUp}
  onMoveDown={handleMoveDown}
  moveUpInactive={isFirst}
  moveDownInactive={isLast}
  moveUpTooltip="Move up"
  moveDownTooltip="Move down"
/>

// Custom action via Cruds.CustomAction
<Cruds onEdit={handleEdit} editTooltip="Edit">
  <Cruds.CustomAction
    title="Settings"
    icon={<Settings2S />}
    onClick={handleSettings}
  />
</Cruds>
```

> Note: `Cruds.CustomAction` is a static sub-component on the `Cruds` function — it is **not** a child renderer. Custom actions must be rendered separately alongside `<Cruds>`, or `Cruds.CustomAction` used directly.

## Styling

Styles live in `Cruds.styles.tsx`. Uses `theme.palette` from `@synerise/ds-core` (requires styled-components `ThemeProvider`):

- `.add`, `.edit`, `.duplicate`, `.move`, `.moveup`, `.movedown` — `grey-600` fill, `blue-600` on hover
- `.delete`, `.remove` — `red-600` fill (no hover change)
- `inactive` state — `grey-300` fill, `cursor: default`, pointer-events disabled

The root `CrudsContainer` has `className="ds-cruds"` applied unconditionally.

## Key dependencies

- `@synerise/ds-icon` — all action icons plus the `Icon` wrapper component
- `@synerise/ds-tooltip` — imported directly from `@synerise/ds-tooltip/dist/Tooltip` (deep import, not the package root) — wraps each `SingleAction`
- `@synerise/ds-utils` — `WithHTMLAttributes` utility type used by `SingleActionProps`

## Implementation notes

- **Click events stop propagation** — `SingleAction` calls `event.stopPropagation()` before invoking `onClick`. This is intentional for row-level actions inside clickable table rows, but means parent click handlers will not fire.
- **`onPreview` has no event parameter** (`() => void`) while all other callbacks accept `(event?: MouseEvent<HTMLElement>) => void`. This asymmetry is in the types.
- **`Cruds.CustomAction` is not a proper React component** — it is assigned as `(props) => SingleAction(props) as ReactElement`, calling `SingleAction` as a plain function. Avoid using it as a child of `<Cruds>` (it won't render inline there); use it as a standalone rendered element.
- **Render order is fixed** in source: moveUp → moveDown → add → edit → preview → duplicate → delete → move → remove. There is no prop to reorder actions.
- **`inactive` only applies to `moveUp` and `moveDown`** via dedicated props on `Cruds`. For other actions, use `Cruds.CustomAction` with `inactive` if needed, or omit the callback to hide the button entirely.
- **Deep import of ds-tooltip** (`/dist/Tooltip`) bypasses the package index — this could break if the tooltip package restructures its dist output.
