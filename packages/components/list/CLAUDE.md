# List (`@synerise/ds-list`)
> A generic **DS-native** list component (no antd), supporting nested/sectioned data sources, optional radio group wrapping, and styled sub-components for text items, item wrappers, and dividers. Reproduces antd `List`'s DOM + `.ant-list*` class hooks (`.ant-list`, `.ant-list-items`, `.ant-list-header`, `.ant-list-split`, `.ant-list-bordered`) side-by-side with `.ds-list*` hooks so existing consumer stylesheets keep working.

## Package structure
```
src/
 List.tsx — functional component, renders flat or nested (sectioned) DS-native list
 List.styles.ts — styled-components for the root/header/items(ul)/loading
 List.types.ts — ListPropsType<T> type definition (hand-written, no antd)
 index.ts — public entry point
 modules.d.ts — CSS/Less module declarations
 Elements/
 index.ts — re-exports TextItem, ItemWrapper, ListDivider
 Text/
 Text.tsx — List.Item styled <li> with icon, actions, size, disabled, danger support
 Text.styles.ts — styled-components for Text; defines ListItemType union
 ItemWrapper/
 ItemWrapper.tsx — generic padded wrapper div for arbitrary list row content
 ItemWrapper.styles.ts — styled-components for ItemWrapper
 Divider/
 Divider.tsx — thin wrapper around @synerise/ds-divider with horizontal padding
 Divider.styles.ts — styled-components for Divider
 __spec__/
 List.spec.tsx — Vitest tests
```

## Public exports

```ts
export { default } from './List'; // List functional component (default)
export type { ListPropsType } from './List.types';
export type { TextProps } from './Elements/Text/Text';
```

### Static sub-components on `List`
| Name | Component | Description |
|------|-----------|-------------|
| `List.Item` | `TextItem` | Styled `<li>` for text-based rows |
| `List.ItemWrapper` | `ItemWrapper` | Padded `<div>` wrapper for arbitrary row content (e.g. checkboxes, switches) |
| `List.Divider` | `ListDivider` | Horizontal rule between sections |

---

### `List<T>` (default export)

Hand-written props (`ListPropsType<T>`, no antd). Core props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataSource` | `T[] \| T[][]` | — | Flat array OR nested array of arrays. A nested array renders multiple DS-native list sections separated by `ListDivider`. Only the first section renders the `header`. |
| `radio` | `boolean` | `undefined` | Wraps the entire rendered list in `Radio.Group` |
| `options` | `RadioGroupProps` | `undefined` | Props forwarded to the `Radio.Group` wrapper; only used when `radio` is `true` |
| `dashed` | `boolean` | `undefined` | Controls the dashed style of the auto-rendered `ListDivider` between sections. Note: `ListDivider` defaults `dashed` to `true` when not supplied |

Supported antd-`List`-parity props: `bordered`, `header`, `renderItem`, `split`, `loading` (DS `Loader`), `loadMore`, `rowKey`, `itemLayout`, `size`, `className`, `style`, `children`. **Dropped in the de-antd migration (0 real consumer usage):** `grid`, `pagination`, and `locale`/`emptyText` (the default "No data" empty state was removed — consumers render their own) — reintroduce natively if a need appears. `List.Item.Meta` is not implemented (unused).

---

### `List.Item` / `TextItem`

Exported type: `TextProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `undefined` | Reduces opacity to 0.4, sets `cursor: not-allowed`, removes tabIndex |
| `icon` | `JSX.Element` | `undefined` | Rendered in `IconWrapper` before content; adjusts `ContentWrapper` left padding |
| `danger` | `boolean` | `undefined` | Colors text and icon `red-600`; hover background becomes `red-050` |
| `actions` | `ReactNode` | `undefined` | Rendered at the end of the row in a flex-1 container |
| `onSelect` | `(e?: MouseEvent \| KeyboardEvent) => void` | `undefined` | Called on click and on `Space` keyup |
| `size` | `'small' \| 'medium'` | `'small'` | `small`: padding `5px 12px 4px 7px`; `medium`: padding `12px` (left `12px` with icon, `16px` without) |
| `..htmlAttributes` | `HTMLLIElement attrs` | — | Spread onto the `<li>` element via `WithHTMLAttributes` |

---

### `List.Divider` / `ListDivider`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dashed` | `boolean` | `true` | Passed to `@synerise/ds-divider`. The divider is always rendered with `marginTop={8}` and `marginBottom={8}`. |

---

### `List.ItemWrapper` / `ItemWrapper`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | Wrapped in a `div` with `padding: 8px 12px` |

---

## Usage patterns

```tsx
import List from '@synerise/ds-list';

// Flat single-section list
<List
 header="Folders"
 dataSource={[{ text: 'Item 1' }]}
 renderItem={(item) => (
 <List.Item size="medium" icon={<Icon component={<FileM />} />} onSelect={() => {}}>
 {item.text}
 </List.Item>
 )}
/>

// Nested (multi-section) list — sections are separated by a ListDivider
<List
 header="Sections"
 dataSource={[[{ text: 'A' }], [{ text: 'B' }]]}
 dashed={false}
 renderItem={(item) => <List.Item>{item.text}</List.Item>}
/>

// With radio group
<List
 dataSource={[[{ value: 'a', label: 'Option A' }]]}
 radio
 options={{ defaultValue: 'a' }}
 renderItem={(item) => (
 <List.ItemWrapper>
 <Radio value={item.value}>{item.label}</Radio>
 </List.ItemWrapper>
 )}
/>

// Standalone divider (e.g. between two separate List instances)
<List.Divider />
<List.Divider dashed={false} />
```

## Implementation notes

- `List` is a **functional component** (function declaration with statics attached). Items are keyed by `rowKey` (or the item index) — no `uuid`.
- **Nested detection:** `isNestedArray` (also a named export from `./List`) checks `Array.isArray(array[0])`. An array of arrays renders as multiple DS-native list sections separated by `ListDivider`; only the first section renders the `header`.
- **`renderItem` contract preserved:** it receives the flattened per-item value + index and may return any node (typically `List.Item`). When no `renderItem` is given, `children` render instead. There is no built-in empty state — when there are no items and no children, nothing is rendered (consumers supply their own).
- **`footer` is omitted** from `ListPropsType` — it cannot be passed to `List`.
- `List.Item` spreads all extra props onto the underlying `<li>` via `WithHTMLAttributes<HTMLLIElement, ..>`. Items sit directly under `<ul class="ant-list-items">`, so `.ant-list-items > li` selectors keep working.
- The `ListDivider` wrapping `div` has `padding: 0 20px` to inset the rule; the `ItemWrapper` `div` has `padding: 8px 12px`.
- Tests use **Vitest** (`pnpm --filter @synerise/ds-list test`).

## Key dependencies

| Package | Role |
|---------|------|
| `@synerise/ds-radio` | `Radio.Group` wrapping when `radio` is `true`; `RadioGroupProps` type |
| `@synerise/ds-divider` | Underlying divider in `ListDivider` |
| `@synerise/ds-loader` | Loading indicator for the `loading` prop |
| `@synerise/ds-utils` | `WithHTMLAttributes` utility type |
