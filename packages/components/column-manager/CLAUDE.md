# ColumnManager (`@synerise/ds-column-manager`)

> A drawer-based panel for managing table column visibility and order — supports search filtering, drag-to-reorder, per-column type icons, read-only columns, and full i18n.

## Package structure

```
src/
  ColumnManager.tsx                           — main component (Drawer + SearchBar + list + actions)
  ColumnManager.types.ts                      — Column, ColumnIconType, ColumnManagerTexts, ColumnManagerProps
  ColumnManager.styles.ts                     — styled Drawer, SearchBar, list wrapper
  index.ts                                    — public exports (default + all types via export *)
  ColumnManagerActions/
    ColumnManagerActions.tsx                  — footer with Cancel / Apply buttons
    ColumnManagerActions.types.ts
    ColumnManagerActions.styles.ts
  ColumnManagerItem/
    ColumnManagerItem.tsx                     — single row: drag handle + type icon + name + switch
    ColumManagerItem.types.ts                 — (typo in filename: Colum not Column)
    ColumnManagerItem.styles.ts
    ColumnManagerItem.const.tsx               — ICON_MAP, TYPES_WITH_ICONS, DEFAULT_ITEM_TYPE
  ColumnManagerList/
    ColumnManagerList.tsx                     — virtualised list (react-window) + sortable container
    ColumnManagerList.types.ts
    ColumnManager.style.ts                    — (inconsistent filename: no 's', no List prefix)
  ColumnManagerSortableItem/
    ColumnManagerSortableItem.tsx             — useSortable wrapper that injects drag props into ColumnManagerItem
    ColumnManagerSortableItem.types.ts
  hooks/
    useTranslations.ts                        — merges custom texts with react-intl defaults
  utils/
    matchesSearchQuery.ts                     — case-insensitive substring filter
  __specs__/
    ColumnManager.spec.tsx                    — Vitest tests
```

## Public exports

`index.ts` does `export * from './ColumnManager.types'` — all types are public.

### `ColumnManager` (default export)

Generic component: `ColumnManager<ColumnType extends Column>`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | — (required) | Controls drawer open/closed state |
| `hide` | `() => void` | — (required) | Called on close button, mask click, or Cancel |
| `onApply` | `(columns: ColumnType[]) => void` | — (required) | Called when user clicks Apply; receives the full (reordered/toggled) column list |
| `columns` | `ColumnType[]` | — (required) | Current column configuration |
| `texts` | `Partial<ColumnManagerTexts>` | see defaults below | Override any subset of UI strings |
| `draggable` | `boolean` | `true` | Enable drag-to-reorder; when `false` drag handles are hidden |

### `Column`

Shape every column object must satisfy:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | yes | Unique identifier |
| `name` | `string` | yes | Display name (also searched) |
| `visible` | `boolean` | yes | Whether the column is shown in the table |
| `readOnly` | `boolean` | no | Disables the visibility toggle switch |
| `type` | `ColumnIconType` | no | Renders a type icon; see `ICON_MAP` for supported values |

### `ColumnIconType`

`'text' | 'number' | 'date' | 'boolean' | 'list' | string`

Only the five named values have icons (`VarTypeStringM`, `VarTypeNumberM`, `VarTypeDateM`, `VarTypeBooleanM`, `VarTypeListM`). Any other string falls back to `DEFAULT_ITEM_TYPE = 'text'` for the icon.

### `ColumnManagerTexts`

All fields are `ReactNode` except `searchPlaceholder` which is `string`. Defaults (from `useTranslations`):

| Key | Default |
|-----|---------|
| `title` | `'Manage columns'` |
| `searchPlaceholder` | `'Search columns'` |
| `searchClearTooltip` | `'Clear'` |
| `noResults` | `'No results'` |
| `cancel` | `'Cancel'` |
| `apply` | `'Apply'` |
| `clear` | `'Clear'` |
| `switchOn` | `'Hide column'` |
| `switchOff` | `'Show column'` |

### `ColumnManagerProps<ColumnType extends Column>`

Type export for consumers that need to type the props.

## Usage patterns

```tsx
import ColumnManager, { type Column } from '@synerise/ds-column-manager';
import { useState } from 'react';

type MyColumn = Column & { key: string };

const [visible, setVisible] = useState(false);
const [columns, setColumns] = useState<MyColumn[]>([
  { id: 'name', key: 'name', name: 'Name', visible: true },
  { id: 'status', key: 'status', name: 'Status', visible: false, readOnly: true },
  { id: 'date', key: 'date', name: 'Date', visible: true, type: 'date' },
]);

<ColumnManager
  visible={visible}
  hide={() => setVisible(false)}
  columns={columns}
  onApply={(updated) => {
    setColumns(updated);
    setVisible(false);
  }}
  draggable
  texts={{ title: 'Manage columns' }}
/>
```

## Styling

- `ColumnManager.styles.ts` — styled `@synerise/ds-drawer` wrapper (fixed width `338px`), styled `@synerise/ds-search-bar` (height `52px`), flex list wrapper.
- `ColumnManagerItem.styles.ts` — hover reveals drag handle (opacity transition), adds `grey-050` background and a `blue-600` left border on hover.
- `ColumnManager.style.ts` (list) — `FixedSizeList` gets `blue-050` background and `blue-600` inset box-shadow; `user-select: none` when `isDragging`.
- All colours via `theme.palette` tokens; no hardcoded hex values.

## Custom hooks

### `useTranslations`

Calls `useIntl()` to produce fully resolved text defaults, then shallow-merges `texts` override on top. Returns a complete `ColumnManagerTexts` object. Requires a `react-intl` `IntlProvider` somewhere in the tree (supplied by `@synerise/ds-core`'s `DSProvider`).

## Key dependencies

- `@synerise/ds-drawer` — outer panel shell (header, content, `DrawerHeader`, `DrawerHeaderBar`, `DrawerContent`)
- `@synerise/ds-search-bar` — search input in the header area
- `@synerise/ds-sortable` — `SortableContainer` + `useSortable` for drag-and-drop reordering
- `react-window` (`FixedSizeList`) — virtualisation for large column lists
- `@synerise/ds-scrollbar` — scrollbar with `withDnd` prop (required for correct drag behaviour inside virtualised list)
- `@synerise/ds-result` — empty state rendered when search yields no columns
- `@synerise/ds-switch` — `RawSwitch` for column visibility toggle
- `react-intl` — i18n (via `useTranslations`)

## Implementation notes

- **State is local until Apply** — toggling visibility or reordering columns updates internal `currentColumns` state only. The parent's `columns` prop is not mutated until `onApply` fires. Clicking Cancel (or closing) resets `currentColumns` back to the incoming `columns` prop.
- **`columns` prop sync** — two `useEffect`s keep internal state in sync: one when `columns` changes, one when `visible` becomes `false` (resets to latest `columns`). The second prevents stale state after Cancel.
- **Search only filters display** — `filteredColumns` (passed to the list) is derived from `currentColumns` via `useMemo`. Reordering while a search is active operates on IDs only and re-sorts the full `currentColumns` array, so hidden items are not lost.
- **Drag + virtualisation** — `ColumnManagerList` passes `Scrollbar` as the `outerElementType` of `FixedSizeList` with `withDnd` so the drag library can interact with the scroll container.
- **Filename typo** — `ColumnManagerItem/ColumManagerItem.types.ts` is missing an `n` (Col**um** vs Col**umn**). Do not rename without updating all imports.
- **Style file inconsistency** — the list style file is `ColumnManagerList/ColumnManager.style.ts` (no `List` suffix, no trailing `s`). All other packages use `<ComponentName>.styles.ts`.
- **Test runner is Vitest** — `__specs__/ColumnManager.spec.tsx` uses `vi.mock` and `import { describe, it, expect } from 'vitest'`.
