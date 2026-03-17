# ItemsRoll (`@synerise/ds-items-roll`)

> Panel component that displays a paginated, searchable list of items with optional grouping, hover-reveal remove icons, a header toolbar (count, search, change-selection, custom actions), and a footer (show more/less + clear-all confirmation).

## Package structure

```
src/
  ItemsRoll.tsx                     — main component (named + default export)
  ItemsRoll.types.ts                — ItemsRollProps, ItemRollElement, ItemsRollGroup, Texts
  ItemsRoll.styles.ts               — all card/list styled-components
  index.ts                          — public exports
  Extras/                           — three-dot actions dropdown (internal)
  ItemsRollComponents/
    Header.tsx / Header.types.ts    — toolbar: count, search, change-selection button, extras
    Footer.tsx / Footer.types.ts    — show-more/show-less/clear-all controls
    List.tsx / List.types.ts        — flat or grouped item list
    ListItem.tsx / ListItem.types.ts / ListItem.styles.ts — single item row
    ItemRemoveIcon.tsx / *.types.ts / *.styles.ts — hover-reveal remove icon
```

## Public exports

### `ItemsRoll` (default export)

Rendered inside `@synerise/ds-panel` with `radius={3} p={12}`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `ItemRollElement[]` | — | **Required.** List items to render |
| `maxToShowItems` | `number` | `10` | Number of items shown initially; resets visible count when changed |
| `showMoreStep` | `number` | `10` | How many items to load per "show more" click |
| `useFooter` | `boolean` | `undefined` | Show footer with show-more/less and clear-all controls |
| `isDisabled` | `boolean` | `undefined` | Hides remove icon per item and clear-all button (passes `undefined` to callbacks) |
| `groups` | `ItemsRollGroup[]` | `undefined` | Enables grouped view; each string corresponds to `item.group`; items without a matching group are hidden |
| `actions` | `ItemRollElement<ActionItemType>[]` | `undefined` | Items for a three-dot dropdown in the header right area |
| `changeSelectionIcon` | `(props: SVGProps<SVGSVGElement>) => JSX.Element` | `EditM` | Icon for the "change selection" button |
| `changeSelectionDropdownProps` | `Omit<DropdownProps, 'children'>` | `undefined` | Wraps the change-selection button in a `@synerise/ds-dropdown` |
| `customSidebarActions` | `ReactNode` | `undefined` | Extra controls rendered in header right, between search and extras |
| `hideSearch` | `boolean` | `undefined` | Hide the search input |
| `onSearch` | `(value: string) => void` | `undefined` | Search input change handler |
| `onSearchClear` | `() => void` | `undefined` | Search clear handler |
| `searchValue` | `string` | `undefined` | Controlled search value |
| `searchPlaceholder` | `string` | `undefined` | Placeholder for search input |
| `onClearAll` | `() => void` | `undefined` | Called after user confirms the clear-all popconfirm (hidden when `isDisabled`) |
| `onChangeSelection` | `() => void` | `undefined` | Click handler for the change-selection button; omitting hides the button |
| `onItemClick` | `(id: string, group?: string) => void` | `undefined` | Called when a list item is clicked |
| `onItemRemove` | `(id: string, group?: string) => void` | `undefined` | Called when the hover-reveal remove icon is clicked (hidden when `isDisabled`) |
| `renderCount` | `(count: number) => ReactNode` | `undefined` | Custom renderer for the items count displayed in the header |
| `texts` | `{ [k in Texts]?: ReactNode }` | `undefined` | Partial override for any i18n string; merges with defaults from `react-intl` |
| `className` | `string` | `undefined` | CSS class on the panel wrapper |
| `style` | `CSSProperties` | `undefined` | Inline style on the panel wrapper |
| `intl` | `IntlShape` | — | **@deprecated** — component now uses `useIntl()` internally |
| `useVirtualizedList` | `boolean` | — | **@deprecated** — virtualized list was removed; prop is accepted but ignored |
| `virtualizedRowHeight` | `number` | — | **@deprecated** — ignored |
| `virtualizedRowWidth` | `number` | — | **@deprecated** — ignored |

### Type exports

`ItemRollElement`, `ItemsRollGroup`, `ItemsRollProps`

#### `ItemRollElement<BaseType>`

```ts
type ItemRollElement<BaseType extends ListItemProps | MenuItemProps = ListItemProps> =
  BaseType & { id: string; group?: string };
```

`id` is required and used as the React `key` and callback argument. `group` ties the item to a group defined in the `groups` prop.

#### `Texts` keys

`changeSelectionLabel` · `clearAllLabel` · `itemsLabel` · `moreLabel` · `noResultsLabel` · `popconfirmNoLabel` · `popconfirmTitleLabel` · `popconfirmYesLabel` · `removeTooltipLabel` · `searchClearTooltipLabel` · `showLabel` · `showLessLabel`

All default to translated strings via `react-intl` message IDs under the `DS.ITEMS-ROLL.*` namespace.

## Usage patterns

```tsx
import ItemsRoll from '@synerise/ds-items-roll';

// Minimal — flat list with search
<ItemsRoll
  items={[{ id: '1', name: 'Segment A' }, { id: '2', name: 'Segment B' }]}
  onSearch={setSearch}
  onSearchClear={() => setSearch('')}
  searchValue={search}
  useFooter
/>

// Grouped list with remove support
<ItemsRoll
  items={items}
  groups={['Group A', 'Group B']}
  onItemRemove={(id, group) => removeItem(id, group)}
  onChangeSelection={openPicker}
  useFooter
  maxToShowItems={5}
  showMoreStep={5}
/>
```

## Key dependencies

- `@synerise/ds-panel` — outer card wrapper (radius + padding)
- `@synerise/ds-list-item` — `GroupItem`, `ListContextProvider`, `DSListItem` for rows
- `@synerise/ds-dropdown` — change-selection dropdown wrapper and actions menu
- `@synerise/ds-popconfirm` — clear-all confirmation dialog
- `@synerise/ds-search/dist/Elements` — `SearchInput` (**deep path — fragile**)
- `react-intl` — `useIntl()` for default label translations

## Implementation notes

- **Groups and ungrouped items:** When `groups` is provided, only items whose `item.group` matches a value in the array are rendered. Items without a matching group are silently hidden.
- **Pagination state:** `visibleItemsAmount` state is reset to `maxToShowItems` via `useEffect` whenever the `maxToShowItems` prop changes.
- **`isDisabled` behaviour:** Passes `undefined` for `onItemRemove` and `onClearAll` to child components — it does not render disabled UI; it fully hides the controls.
- **Footer visibility:** Footer only renders when `useFooter={true}` AND `visibleItems.length > 0`. The footer divider is hidden when in search mode and `itemsCount <= maxToShowItems`.
- **Antd class selectors:** `ListWrapper` styled-component targets `.ant-menu-*` and `.-item-group*` class selectors directly for group title and divider styling — these will break if the antd Menu is replaced.
- **Deep import:** `Header.tsx` imports `SearchInput` from `@synerise/ds-search/dist/Elements` — a fragile internal path that breaks if `ds-search` restructures its dist output.
- **Deprecated props:** `useVirtualizedList`, `virtualizedRowHeight`, `virtualizedRowWidth` exist in `ListProps` but are never read in `List.tsx`. `intl` prop is accepted at the top level but never forwarded anywhere (component uses `useIntl()` hook directly).
- Uses **Jest** (not Vitest) — `jest.config.js` present.
