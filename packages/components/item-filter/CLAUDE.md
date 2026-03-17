# ItemFilter (`@synerise/ds-item-filter`)

> **Deprecated.** A right-side drawer that presents a virtualized, tab-categorised list of saved filter items with search, selection, rename, duplicate, and delete actions.

## Deprecation notice

Both the component and its types carry `@deprecated` JSDoc tags. No new features will be added. Prefer an alternative pattern if starting a new feature.

## Package structure

```
src/
  ItemFilter.tsx          — main component (default export); wraps Drawer + Tabs + react-window List
  ItemFilter.types.ts     — ItemFilterProps, Category, Item (exported)
  ItemFIlter.styles.ts    — styled-components: FiltersList, ItemFilterHeader  (note typo in filename)
  index.ts                — re-exports default + all named types
  modules.d.ts            — @testing-library/jest-dom augmentation (test setup only)
  __specs__/
    ItemFilter.spec.tsx   — Jest tests (uses renderWithProvider from @synerise/ds-core)
```

## Public exports

### Default export — `ItemFilter`

The component is wrapped with `injectIntl` (react-intl) and `withTheme` (styled-components) before export. Consumers must have an `IntlProvider` and a styled-components `ThemeProvider` (or `DSProvider`) in the tree.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `visible` | `boolean` | yes | — | Controls Drawer open/close state |
| `hide` | `() => void` | yes | — | Called when close button or Drawer mask is clicked |
| `fetchData` | `(category: Category) => void` | yes | — | Called by infinite-scroll Scrollbar when more items are needed |
| `selectItem` | `(params: { id: ReactText }) => void` | yes | — | Called when a list item is selected |
| `categories` | `Category[]` | yes | — | Tab definitions; each tab owns its items |
| `selectedItemId` | `string \| undefined` | yes | — | ID of the currently-selected item; floated to top of list |
| `loading` | `boolean` | no | — | Passed to Scrollbar to show loading state |
| `removeItem` | `(params: { id: ReactText }) => void` | no | — | Called on item delete |
| `editItem` | `(params: { id: ReactText; name: string }) => void` | no | — | Called on item rename |
| `duplicateItem` | `(params: { id: ReactText }) => void` | no | — | Called on item duplicate |
| `texts` | `{ [k: string]: string \| ReactNode }` | no | intl defaults | Override any UI string (see Texts section) |
| `search` | `{ onChange, onClear, value }` | no | — | Renders SearchBar below header when provided |
| `theme` | `{ [k: string]: string }` | no | — | **@deprecated** — theme is read from DSProvider |
| `maxToShowItems` | `number` | no | — | Accepted in type but **not used** in component implementation |

### Named type exports

| Symbol | Description |
|--------|-------------|
| `ItemFilterProps` | Full props type for the component |
| `Category` | `{ label: string; items: Item[]; hasMore: boolean }` |

`Item` (internal) extends `ItemProps` from `@synerise/ds-manageable-list` with an added `categories: string[]` field. It is **not** re-exported from the package index.

## `texts` keys

All keys fall back to react-intl message IDs when `texts` is not supplied.

| Key | intl ID |
|-----|---------|
| `title` | `DS.ITEM-FILTER.TITLE` |
| `activateItemTitle` | `DS.ITEM-FILTER.ACTIVATE-ITEM-TITLE` |
| `activate` | `DS.ITEM-FILTER.ACTIVATE` |
| `cancel` | `DS.ITEM-FILTER.CANCEL` |
| `deleteConfirmationTitle` | `DS.ITEM-FILTER.DELETE-CONFIRMATION-TITLE` |
| `deleteConfirmationDescription` | `DS.ITEM-FILTER.DELETE-CONFIRMATION-DESCRIPTION` |
| `deleteConfirmationNo` | `DS.ITEM-FILTER.DELETE-CONFIRMATION-NO` |
| `deleteConfirmationYes` | `DS.ITEM-FILTER.DELETE-CONFIRMATION-YES` |
| `noResults` | `DS.ITEM-FILTER.NO-RESULTS` |
| `searchPlaceholder` | `DS.ITEM-FILTER.SEARCH-PLACEHOLDER` |
| `searchClearTooltip` | `DS.ITEM-FILTER.SEARCH-CLEAR` |
| `more` | `DS.MANAGABLE-LIST.MORE` |
| `less` | `DS.MANAGABLE-LIST.LESS` |
| `itemActionRename` | `DS.MANAGABLE-LIST.ITEM-RENAME` |
| `itemActionDuplicate` | `DS.MANAGABLE-LIST.ITEM-DUPLICATE` |
| `itemActionDelete` | `DS.MANAGABLE-LIST.ITEM-DELETE` |

## Usage patterns

```tsx
import ItemFilter from '@synerise/ds-item-filter';
import type { Category } from '@synerise/ds-item-filter';

const categories: Category[] = [
  {
    label: 'All filters',
    hasMore: true,
    items: [
      {
        id: '001',
        name: 'My Filter',
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        categories: ['All filters'],
        user: { firstname: 'Jan', lastname: 'Nowak' },
        created: '2024-01-01',
      },
    ],
  },
];

<ItemFilter
  visible={isOpen}
  hide={() => setIsOpen(false)}
  categories={categories}
  selectedItemId={selectedId}
  fetchData={(category) => loadMore(category)}
  selectItem={({ id }) => setSelectedId(String(id))}
  removeItem={({ id }) => deleteFilter(id)}
  editItem={({ id, name }) => renameFilter(id, name)}
  duplicateItem={({ id }) => duplicateFilter(id)}
  search={{ value: query, onChange: setQuery, onClear: () => setQuery('') }}
/>
```

## Styling

- `FiltersList` — full-height container; overrides `ItemContainer` from `@synerise/ds-manageable-list` to enforce `max-height: 48px`, remove `box-shadow`, and apply `grey-050` background.
- `ItemFilterHeader` — flex row with space-between for title + close button; `padding-bottom: 24px`.
- Drawer fixed width: **676px**.
- List item height: **48px** with **16px** margin-bottom (total row size 64px for `react-window`).
- List padding: **24px** on each side.
- Imports internal styled component via `@synerise/ds-manageable-list/dist/Item/ContentItem/ContentItem.styles` — a **fragile dist import** that bypasses the public API.

## Key dependencies

| Package | Role |
|---------|------|
| `@synerise/ds-drawer` | Drawer shell |
| `@synerise/ds-tabs` | Category tabs |
| `@synerise/ds-manageable-list` | `FilterItem` row component + `ItemProps` type |
| `@synerise/ds-scrollbar` | Infinite-scroll wrapper |
| `@synerise/ds-search-bar` | Optional search input |
| `@synerise/ds-result` | Empty-state display |
| `react-window` (`FixedSizeList`) | Virtualised list |
| `react-intl` (`injectIntl`) | i18n for default text strings |
| `styled-components` (`withTheme`) | Theme injection (deprecated pattern) |

## Implementation notes

- **Selected item sorting:** when `selectedItemId` is set, the active category's items are sorted so the selected item appears first (stable sort, `useMemo`).
- **Scroll sync:** `Scrollbar` handles the actual scroll event; a `UIEvent` handler forwards `scrollTop` to the `react-window` list ref via `listRef.current.scrollTo()`.
- **`fetchData` suppressed during search:** `hasMore` is passed to `Scrollbar` only when `!search?.value`, preventing pagination calls while filtering.
- **`maxToShowItems` is a dead prop** — declared in `ItemFilterProps` but never read inside `ItemFilter.tsx`.
- **Filename typo:** styles file is `ItemFIlter.styles.ts` (capital I in "FIlter") — matched throughout the codebase consistently but is a persistent typo.
- **Test runner:** uses Jest (not Vitest) — see `jest.config.js`. Tests live in `src/__specs__/`.
