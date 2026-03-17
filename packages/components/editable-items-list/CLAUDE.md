# EditableItemsList (`@synerise/ds-editable-items-list`)

> Generic list component where each row is caller-rendered, with a hover-revealed delete icon and an "Add" button at the bottom.

## Package structure

```
src/
  EditableItemsList.tsx        — main generic component
  EditableItemsList.types.ts   — EditableItemsListProps<T>
  EditableItemsList.style.ts   — RowWrapper + CrudWrapper styled-components
  index.ts                     — public exports
  __specs__/
    EditableItemsList.spec.tsx — Vitest tests
```

## Public exports

### `EditableItemsList` (default export)

Generic component: `EditableItemsList<T extends { id: string }>`. Not a `forwardRef`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `renderRowElement` | `(index: number, data: T) => ReactElement \| null` | — | **Required.** Renders content for each row |
| `items` | `T[]` | `[]` | Items to display. Each must have a unique `id: string` |
| `addButtonLabel` | `string \| ReactNode` | — | **Required.** Label for the Add button |
| `addButtonIcon` | `ReactNode` | `undefined` | Custom icon for the Add button. Defaults to `<Add3M />` in blue |
| `addButtonProps` | `Partial<ButtonProps>` | `undefined` | Overrides for the Add button. Merged on top of `{ type: 'ghost-primary', style: { transition: 'none' } }` |
| `onAdd` | `MouseEventHandler<HTMLElement>` | — | **Required.** Called when Add button is clicked |
| `minRowLength` | `number` | `1` | Delete button is hidden while `items.length <= minRowLength` |
| `maxRowLength` | `number` | `undefined` | Add button is disabled once `items.length >= maxRowLength` |
| `deleteTooltip` | `string` | `undefined` | Tooltip on the delete icon |
| `onDelete` | `(id: string, index: number) => void` | — | **Required.** Called with item `id` and `index` when delete is clicked |

### `EditableItemsListProps` (type export)

The props interface above, parameterised as `EditableItemsListProps<T extends { id: string }>`.

## Usage patterns

```tsx
import EditableItemsList from '@synerise/ds-editable-items-list';

type Rule = { id: string; value: string };

<EditableItemsList<Rule>
  items={rules}
  renderRowElement={(index, item) => (
    <input value={item.value} onChange={e => updateRule(index, e.target.value)} />
  )}
  addButtonLabel="Add rule"
  onAdd={() => addRule()}
  onDelete={(id, index) => removeRule(index)}
  minRowLength={1}
  maxRowLength={10}
  deleteTooltip="Remove rule"
/>
```

## Styling

Styles in `EditableItemsList.style.ts`. No design-system tokens — layout only:
- `RowWrapper`: flex row with `padding-bottom: 16px`; child delete button hidden by default, revealed on `:hover`
- `CrudWrapper`: `visibility: hidden` by default, `visibility: visible` on parent hover

## Key dependencies

- `@synerise/ds-cruds` — provides the delete icon button (`onRemove` + `removeTooltip`). Only the remove action is used; edit/other Cruds operations are not wired.
- `@synerise/ds-button` — Add button, defaulting to `type="ghost-primary"`

## Implementation notes

- **Delete visibility:** The delete (`CrudWrapper`) is rendered in the DOM at all times but hidden via `visibility: hidden`. It only becomes visible on hover — and only when `items.length > minRowLength`. At or below the minimum, the `CrudWrapper` is not rendered at all.
- **Add button defaults:** A `DEFAULT_ADD_BUTTON_PROPS` constant sets `type: 'ghost-primary'` and `style: { transition: 'none' }`. `addButtonProps.style` is shallow-merged (not replaced), so individual style keys override but others persist.
- **Generic constraint:** `T` must extend `{ id: string }`. Item identity for `key` and for `onDelete` is taken from `item.id`.
- **Row key:** Rows are keyed by `item.id` — duplicate IDs will cause React reconciliation issues.
- **No state:** Fully controlled — `items` array managed by the caller; this component has no internal list state.
