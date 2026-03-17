# OrderedList (`@synerise/ds-ordered-list`)
> Recursive ordered list component supporting arbitrary nesting, custom index formatting, and optional prefixel/suffixel slots per item.

## Package structure
```
src/
  Ordered-list.tsx       — root component; renders <ol> with optional header label, maps data to Item
  Ordered-list.types.ts  — OrderedListItem, OrderedListProps, ListProps (deprecated alias)
  Ordered-list.styles.ts — styled <ol> (OrderedList) and header wrapper (ContentAbove)
  index.ts               — public exports
  Elements/
    Item/
      Item.tsx           — memoized list item; renders index, prefixel, label, suffixel, and recursive NestedList
      Item.styles.ts     — ItemWrapper (<li>), IndexFormatterWrapper (<span>)
  __specs__/
    Ordered-list.spec.tsx — Jest tests (nested items, indexFormatter, prefix/suffix)
```

## Public exports
```ts
export { default } from './Ordered-list';          // default export: OrderedList component
export type { OrderedListItem, OrderedListProps };  // named type exports
```

`ListProps` is exported from the types file but **not** re-exported from `index.ts`. It is marked `@deprecated` — use `OrderedListProps` instead.

### `OrderedList` (default export)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `OrderedListItem[]` | — (required) | Array of items to render |
| `indexFormatter` | `(index: number) => ReactNode` | `undefined` | Custom renderer for the item index; falls back to the raw zero-based number |
| `listStyle` | `string` | `undefined` | CSS `list-style-type` value applied to `<ol>` and all nested `<ol>` elements; defaults to `'none'` when omitted |
| `text` | `ReactNode` | `undefined` | Optional label rendered above the list via `FormFieldLabel` |

### `OrderedListItem`
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | yes | Used as React `key` |
| `label` | `ReactNode` | yes | Item content |
| `index` | `number` | yes | Passed to `indexFormatter`; **ignored** in the root component — the map index `i` is used instead |
| `prefixel` | `ReactNode` | no | Rendered before the label |
| `suffixel` | `ReactNode` | no | Rendered after the label |
| `subMenu` | `OrderedListItem[]` | no | Child items; triggers a recursive `OrderedList` |
| `subMenuProps` | `Omit<OrderedListProps, 'data'>` | no | Props forwarded to the nested `OrderedList` (overrides inherited `text`, `indexFormatter`, `listStyle`) |
| `listStyle` | `string` | no | Per-item list style (forwarded to the nested list) |
| `text` | `ReactNode` | no | Header label for the nested list |

## Usage patterns
```tsx
import OrderedList from '@synerise/ds-ordered-list';
import type { OrderedListItem } from '@synerise/ds-ordered-list';

const items: OrderedListItem[] = [
  { id: '1', index: 0, label: 'First item' },
  { id: '2', index: 1, label: 'Second item' },
  {
    id: '3',
    index: 2,
    label: 'Parent item',
    subMenu: [
      { id: '4', index: 0, label: 'Child item' },
    ],
  },
];

// Basic usage with a decimal formatter
<OrderedList
  data={items}
  text="List Header"
  indexFormatter={(i) => `${i + 1}. `}
/>

// Without index display
<OrderedList data={items} indexFormatter={() => ''} />

// Native browser list counters via listStyle
<OrderedList data={items} listStyle="decimal" />
```

## Styling
- Styled-components only; no Less/CSS files at runtime.
- `listStyle` maps directly to the CSS `list-style-type` property. When omitted, `list-style-type: none` is set at every level; custom index rendering via `indexFormatter` is then the only numbering mechanism.
- Nested `<ol>` elements receive `margin-left: 10px` and `padding: 5px 0 5px 12px`.
- `ContentAbove` wrapper has `margin-bottom: 8px; min-height: 18px`.

## Key dependencies
- `@synerise/ds-form-field` — `FormFieldLabel` used for the optional `text` header
- `@synerise/ds-icon` — listed as a dependency in `package.json` but not imported in any source file (likely a transitive or leftover dependency)

## Implementation notes
- **Recursive rendering without circular imports:** `OrderedList` passes itself as a `NestedList` prop to `Item`, avoiding a direct circular import between the two files.
- **`index` field on `OrderedListItem` is effectively unused at the root level** — the component uses the map iteration index `i` instead of `item.index`. The field is still passed through to nested levels via `subMenu` items.
- `Item` is wrapped in `React.memo`.
- Tests use Jest (not Vitest) — `jest.config.js` is present and the `test` script calls `jest` directly.
