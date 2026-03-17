# List (`@synerise/ds-list`)
> A generic list component built on Ant Design's List, supporting nested/sectioned data sources, optional radio group wrapping, and styled sub-components for text items, item wrappers, and dividers.

## Package structure
```
src/
  List.tsx                            — class component (PureComponent), renders flat or nested (sectioned) AntdList
  List.types.ts                       — ListPropsType<T> type definition
  index.ts                            — public entry point
  modules.d.ts                        — CSS/Less module declarations
  Elements/
    index.ts                          — re-exports TextItem, ItemWrapper, ListDivider
    Text/
      Text.tsx                        — List.Item styled <li> with icon, actions, size, disabled, danger support
      Text.styles.ts                  — styled-components for Text; defines ListItemType union
    ItemWrapper/
      ItemWrapper.tsx                 — generic padded wrapper div for arbitrary list row content
      ItemWrapper.styles.ts           — styled-components for ItemWrapper
    Divider/
      Divider.tsx                     — thin wrapper around @synerise/ds-divider with horizontal padding
      Divider.styles.ts               — styled-components for Divider
  style/
    index.less                        — Less entry point (imported via side-effect in List.tsx)
    list.mixin.less                   — Less mixins for list styles
  __spec__/
    List.spec.tsx                     — Jest tests
```

## Public exports

```ts
export { default } from './List';              // List class component (default)
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

Extends Ant Design `ListProps<T>` — omits `dataSource` and `footer`, adds:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataSource` | `T[] \| T[][]` | — | Flat array OR nested array of arrays. A nested array renders multiple `AntdList` sections separated by `ListDivider`. Only the first section renders the `header`. |
| `radio` | `boolean` | `undefined` | Wraps the entire rendered list in `Radio.Group` |
| `options` | `RadioGroupProps` | `undefined` | Props forwarded to the `Radio.Group` wrapper; only used when `radio` is `true` |
| `dashed` | `boolean` | `undefined` | Controls the dashed style of the auto-rendered `ListDivider` between sections. Note: `ListDivider` defaults `dashed` to `true` when not supplied |

All other `ListProps<T>` from antd (e.g. `bordered`, `header`, `renderItem`, `split`, `grid`, `pagination`, `loading`, `loadMore`, `locale`, `rowKey`, `itemLayout`) are forwarded directly to `AntdList`.

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
| `...htmlAttributes` | `HTMLLIElement attrs` | — | Spread onto the `<li>` element via `WithHTMLAttributes` |

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

- `List` is a **class component** (`React.PureComponent`) — not a functional component. A stable `uuid` key is generated in the constructor for the single-section render path.
- **Nested detection:** `isNestedArray` (also a named export from `./List`) checks `array[0] instanceof Array`. An array of arrays is rendered as multiple `AntdList` instances; subsequent sections have `header` forced to `null`.
- **`footer` is omitted** from `ListPropsType` — it cannot be passed to `List`.
- `List.Item` spreads all extra props onto the underlying `<li>` via `WithHTMLAttributes<HTMLLIElement, ...>`.
- The `ListDivider` wrapping `div` has `padding: 0 20px` to inset the rule; the `ItemWrapper` `div` has `padding: 8px 12px`.
- Tests use **Jest** (not Vitest) — see `jest.config.js`.

## Key dependencies

| Package | Role |
|---------|------|
| `antd` (peer) | `AntdList`, `RadioGroupProps` base types |
| `@synerise/ds-radio` | `Radio.Group` wrapping when `radio` is `true` |
| `@synerise/ds-divider` | Underlying divider in `ListDivider` |
| `@synerise/ds-utils` | `WithHTMLAttributes` utility type |
| `uuid` | Stable + per-render keys for `React.Fragment` nodes |
