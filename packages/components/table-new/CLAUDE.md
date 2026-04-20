# table-new (`@synerise/ds-table-new`)

Data table component built on [@tanstack/react-table](https://tanstack.com/table) and [@tanstack/react-virtual](https://tanstack.com/virtual). Replaces the legacy `@synerise/ds-table`.

## Main components

- **`Table`** -- standard paginated table. Pagination defaults to `pageSize: 10`, configurable via `pagination` prop.
- **`VirtualTable`** -- virtualized table for large datasets with infinite scroll support.

Both share the same `SharedTableProps` type and most props are identical.

## Search

Three modes, configured via props on `Table` / `VirtualTable`:

| Mode | Props | State management | Selection preservation |
| --- | --- | --- | --- |
| **Built-in** | `matchesSearchQuery`, `searchProps`, `onSearchQueryChange` | Table manages query | Yes |
| **Custom + internal filter** | `filterData`, `searchComponent` | Consumer manages query | Yes |
| **External (legacy)** | `searchComponent` + pre-filtered `data` | Consumer manages everything | No |

- `matchesSearchQuery` takes precedence over `filterData` if both are provided.
- `searchComponent` takes precedence over built-in `SearchInput` rendering.
- When using built-in or custom search, selection operates on the full `data` array via `dataRef` in `useTable`.

## Selection

Enabled by passing `selectionConfig` to the table. Key types:

- `SelectionConfig<TData>` -- onChange, limit, hideSelectAll, fixed, selections, globalSelection, checkRowSelectionStatus, getSelectionTooltipProps.
- `SELECTION_ALL` / `SELECTION_INVERT` -- exported constants for the `selections` array.
- `selectedRowKeys` -- controlled selection state (prop on Table, not inside selectionConfig).

## Column definitions

- New code: use `ColumnDef` from `@tanstack/react-table` directly.
- Legacy migration: use `legacyColumnConfigAdapter` to convert `LegacyColumnType` configs.
- `DSColumnType` / `DSTableProps` are deprecated compatibility aliases.

Column meta extensions (via `meta` on ColumnDef):
- `sortRender`: `'default' | 'string'` or custom render function.
- `enableMultiSort`: boolean.
- `fixed`: `'left' | 'right'` for pinned columns.
- `getCellTooltipProps`: per-cell tooltip configuration.

## Cell components

All exported from `@synerise/ds-table-new` as named exports and under `TableCell` namespace:

- `ActionCell` -- action buttons with configurable gap and alignment
- `AvatarLabelCell` -- avatar with title, labels, loader
- `CopyableCell` -- text value with copy-to-clipboard
- `EditableCell` -- inline editable text
- `FlagLabelCell` -- country flag with label
- `IconLabelCell` -- icon with label, supports disabled state
- `IconTooltipCell` -- icon with tooltip
- `InputNumberCell` -- numeric input
- `LabelsWithShowMore` -- label list with "show more" modal
- `StarCell` -- star rating
- `StatusLabelCell` -- status dot with label
- `TagIconCell` -- tag with icon
- `TagsGroupCell` -- tag group with add/remove

## Key files

```
src/
  Table.tsx              -- Table component (paginated)
  VirtualTable.tsx       -- VirtualTable component (virtualized)
  Table.types.ts         -- all public and internal types
  Table.const.ts         -- constants (SELECTION_ALL, SELECTION_INVERT, defaults)
  Table.styles.ts        -- styled-components
  index.ts               -- public exports
  hooks/
    useTable.ts           -- core hook: TanStack table instance, selection, sorting, search, column sizing
    useTableSearch.ts     -- search/filter logic: manages query state, produces displayData
    useColumnSizing.ts    -- responsive column width calculation
    useDefaultTexts.ts    -- i18n text defaults
    useInfiniteScroll.ts  -- infinite scroll scroll-to-index logic
    useRowKey.ts          -- row key resolution (function or property name)
    useScrollSync.ts      -- horizontal scroll synchronization
  components/
    BaseTable/            -- shared table shell (header + columns + body + pagination)
    Cell/                 -- cell renderers (see above)
    ItemsMenu/            -- wrapper for the itemsMenu prop
    TableBody/            -- table body rendering
    TableColumns/         -- column header row with sorters
    TableHeader/          -- title bar with counter, selection dropdown, search, filter
    TableHorizontalScroll/ -- horizontal overflow container
    TableHorizontalScrollBar/ -- custom horizontal scrollbar
    TablePagination/      -- pagination controls
  contexts/
    SelectionContext       -- selection config context
    StickyContext           -- sticky header positioning context
    TableContext            -- table instance + virtualizer context
  types/
    table.d.ts             -- ColumnMeta module augmentation for TanStack
  utils/
    legacyColumnConfigAdapter -- converts LegacyColumnType[] to ColumnDef[]
    processColumns         -- prepends selection column, applies sorter meta
    arrayToTrueMap         -- string[] to Record<string, true>
    compareKeys            -- shallow key comparison for selection sync
    getChildrenColumnName  -- resolves expandable children accessor
    getPaginationConfig    -- normalizes pagination prop to TanStack config
    getDefaultSkeletonColumns -- generates skeleton columns for loading state
```

## Testing

- **Vitest** with jsdom environment.
- Test files in `src/__specs__/`: `Table.spec.tsx`, `VirtualTable.spec.tsx`, `data.ts` (test fixtures).
- Hook tests in `src/hooks/__specs__/`.

## Build

- Vite with shared `vite.config.base.ts`.
- Output: individual ESM files (`preserveModules`), TypeScript declarations via `vite-plugin-dts`.
- Package manager: pnpm.
