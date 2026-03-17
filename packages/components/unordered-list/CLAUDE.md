# UnorderedList (`@synerise/ds-unordered-list`)

> A recursive, nestable unordered list with optional index formatter, prefix/suffix slots, and a section label.

## Package structure

```
src/
  Unordered-list.tsx        — main component; renders label + <ul> + items recursively
  Unordered-list.types.ts   — UnorderedListItem, UnorderedListProps, deprecated ListProps
  Unordered-list.styles.ts  — UnorderedList (ul), Label, ContentAbove styled components
  index.ts                  — public exports
  Elements/
    Item/Item.tsx           — single <li>; renders indexFormatter, prefixel, label, suffixel, and nested NestedList
    Item/Item.styles.ts     — ItemWrapper (li), IndexFormatterWrapper
  __specs__/
    Ordered-list.spec.tsx   — Jest tests (note: spec file is misnamed "Ordered-list")
```

## Public exports

### `UnorderedList` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `UnorderedListItem[]` | — (required) | Items to render |
| `indexFormatter` | `(index: number) => ReactNode` | — | Renders a custom prefix before each item (e.g. ` - `, ` ● `) |
| `text` | `ReactNode` | — | Optional section label rendered above the list via `FormFieldLabel` |
| `className` | `string` | — | CSS class on the root `<div>` |

### `UnorderedListItem`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Required unique key |
| `label` | `ReactNode` | Item display content |
| `index` | `number` | Numeric index passed to `indexFormatter` |
| `prefixel` | `ReactNode` | Rendered before `label` |
| `suffixel` | `ReactNode` | Rendered after `label` |
| `subMenu` | `UnorderedListItem[]` | Child items; renders a nested `UnorderedList` when present |
| `subMenuProps` | `Omit<UnorderedListProps, 'data'>` | Props forwarded to the nested `UnorderedList` (e.g. overriding `indexFormatter` for the sub-level) |
| `text` | `ReactNode` | Label for the nested list (passed down to nested `UnorderedList.text`) |

### `UnorderedListProps`

Type re-export.

### `ListProps` _(deprecated)_

`@deprecated` alias for `UnorderedListProps`. Do not use.

## Usage patterns

```tsx
import UnorderedList from '@synerise/ds-unordered-list';
import type { UnorderedListItem } from '@synerise/ds-unordered-list';

<UnorderedList
  text="Section heading"
  indexFormatter={(i) => ` ${i + 1}. `}
  data={[
    { id: '0', index: 0, label: 'Item A' },
    {
      id: '1', index: 1, label: 'Item B',
      subMenu: [{ id: '2', index: 0, label: 'Child B1' }],
    },
  ]}
/>
```

## Styling

`Unordered-list.styles.ts`. The `<ul>` styled component accepts an optional `listStyle` prop that sets `list-style-type`; this is **not** exposed on `UnorderedListProps` — it is an internal styled-component prop. Nested `<ul>` elements get `margin-left: 20px`.

## Key dependencies

- `@synerise/ds-form-field` — `FormFieldLabel` for the optional `text` section label
- `@synerise/ds-icon` — available for use as `prefixel`/`suffixel` (not imported in main component)

## Implementation notes

- **Circular dependency avoidance** — `Item` does not import `UnorderedList` directly. Instead, the parent passes `NestedList={UnorderedList}` as a prop to `Item`, breaking the circular reference.
- **`index` field on `UnorderedListItem` is overridden** — the parent maps over `data` and passes `index={i}` (the array index) to `Item`, discarding the `index` field from the item object: `data.map(({ index, ...item }, i) => <Item index={i} ...item />)`. The `index` field on the item itself is effectively unused.
- **Spec file is misnamed** — `__specs__/Ordered-list.spec.tsx` tests `UnorderedList` but is named "Ordered-list".
- **Test runner is Jest** (not Vitest).
