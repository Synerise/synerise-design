# Table (`@synerise/ds-table`)

> Feature-rich Ant Design 4.x table wrapper that adds a DS-styled title bar, row selection, row starring, multi-column sorting, grouped rows, tree rows, virtualized rendering, and infinite scroll.

## Package structure

```
src/
  Table.tsx                    — main DSTable component (default export); switches between GroupTable and DefaultTable
  Table.types.ts               — all public types (DSTableProps, DSColumnType, RowSelection, RowStar, Filter, Locale, …)
  Table.styles.ts              — styled-components for wrapper and header
  DefaultTable/
    DefaultTable.tsx           — wraps antd Table; injects sort buttons, row-star column, row-selection column, row tooltips
  GroupTable/
    GroupTable.tsx             — antd Table rendered with a custom body that groups rows under collapsible headers
    GroupTable.types.ts        — GroupType, GroupByType, GROUP_BY constant
    GroupTableBody/            — renders one expanded/collapsed group with its rows
    GroupTableHeader/          — renders a group's header row
  TreeTable/
    TreeTable.tsx              — DSTable wrapper that renders tree-indented rows; hardcoded indent 42 px
  VirtualTable/
    VirtualTable.tsx           — react-window FixedSizeList body injected via antd components.body; supports infinite scroll & sticky header
    VirtualTable.types.ts      — VirtualTableProps, VirtualTableRef, VirtualColumnType; Props alias is @deprecated
    VirtualTableRow.tsx        — renders one virtual row
    constants.ts               — HEADER_ROW_HEIGHT=64, EXPANDED_ROW_PROPERTY, LOAD_DATA_OFFSET=800
  TableHeader/
    TableHeader.tsx            — title bar: count, select-all checkbox, items menu, filters, search, custom button
    TableHeader.types.ts
    TableLimit/                — shows "X / limit" counter when selection.limit is set
    TableSelection.tsx         — select-all / invert checkbox area
  Cell/
    index.ts                   — re-exports all cell components as TableCell namespace
    Action/ActionCell          — flex container for action buttons; gapSize, contentAlign
    AvatarLabel/AvatarLabel    — avatar + title + optional labels row
    Copyable/CopyableCell      — value with copy-to-clipboard
    Editable/EditableCell      — inline text-input cell
    FlagLabel/FlagLabelCell    — country flag + label
    IconLabel/IconLabel        — icon + label
    IconTooltipCell/           — icon + label + tooltip icon
    InputNumber/InputNumberCell — wraps ds-input-number
    LabelsWithShowMore/        — shows N labels inline, rest in a modal
    Star/StarCell              — star toggle cell (standalone; not same as rowStar column)
    StatusLabel/StatusLabel    — ds-badge status dot + label
    TagIcon/TagIcon            — tag + icon cell
    TagsGroup/TagsGroup        — wraps ds-tags with loading/error states
  ColumnSortMenu/
    useSortState.ts            — useReducer managing multi-column sort state; exposes SortStateAPI
    columnWithSortButtons.tsx  — column decorator that injects sort buttons into column header
    groupedColumnsSort.ts      — sort logic for GroupTable rows
    SortRenderer.tsx           — renders 'default' | 'string' sort UI
    TitleWithSort.tsx
  FilterTrigger/
    FilterTrigger.tsx          — icon-based filter trigger rendered in the title bar right side
  InfiniteScroll/
    InfiniteLoaderItem.tsx     — shows loading/error/no-more-data row at the bottom (or top) of VirtualTable
    InfiniteLoaderItem.types.ts — InfiniteScrollProps type
    BackToTopButton.tsx        — exported directly; floats over virtual list
    OuterListElement.tsx       — outer wrapper for react-window List
    constants.ts               — infiniteLoaderItemHeight
    utils.ts
  RowSelection/
    RowSelectionColumn.tsx     — single-row checkbox rendered via antd rowSelection.renderCell
  hooks/
    useBulkSelection/          — counts selectable/selected records including children
    useRowKey/                 — normalises rowKey string | function
    useRowStar/                — manages starred keys, builds star column definition
  constants/
    Table.constants.ts         — SELECTION_ALL, SELECTION_INVERT, ITEM_RENDER_TYPE
    TableSkeleton.constants.tsx — skeleton column/row config for loading state
  utils/
    index.ts                   — re-exports all utils
    calculateColumnWidths.ts   — distributes table width across columns for VirtualTable
    columnWithCellTooltip.tsx  — wraps cell render in ds-tooltip when getCellTooltipProps is set
    getChildrenColumnName.ts
    getRecordSelectionStatus.ts
    getSkeletonProps.tsx       — builds skeleton columns/dataSource when loading=true
    getValueFromPath.ts
    isGrouped.ts
    isRecordSelectable.ts
    locale.ts                  — getDefaultLocale, useTableLocale, TableLocaleContext
  style/
    index.less                 — entry point; imports table.less
    table.less                 — antd overrides and DS-specific CSS
  modules.d.ts
```

## Public exports

```ts
// from src/index.ts
export default DSTable                    // main component
export { GroupedTable }                   // alias GroupTable
export { VirtualTable }
export { TreeTable }
export { TableCell }                      // namespace of all cell components
export { ItemsMenu }                      // styled container for bulk-action menu
export { BackToTopButton }               // for use with VirtualTable infinite scroll
export { GROUP_BY }                      // { value, ranges, interval, disabled }

// Types
export type {
  VirtualTableProps, VirtualTableRef, VirtualColumnType,
  RowSelection, RowType, SingleColumnSort, OnSortFn,
  Locale, DSColumnType, DSTableProps,
  ScrollProxyType, Selection, SelectionItem, CustomizeScrollBodyInfo,
}
```

### `DSTable` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode \| (() => ReactNode)` | — | Rendered in the left side of the title bar |
| `hideTitleBar` | `boolean` | — | Hides the entire title bar |
| `headerWithBorderTop` | `boolean` | — | Adds a border above the title bar |
| `loading` | `boolean` | `false` | When true renders skeleton rows instead of data |
| `skeletonProps` | `{ maxHeight?, headerHeight?, subheaderHeight?, cellHeight? }` | — | Customises the loading skeleton dimensions |
| `cellSize` | `'medium' \| 'small'` (or any string) | — | Adds `ds-table-cell-size-{value}` CSS class |
| `roundedHeader` | `boolean` | `false` | Adds `ds-table-rounded` CSS class |
| `columns` | `DSColumnType<T>[]` | — | Extends antd ColumnType with `sortRender`, `childRender`, `getCellTooltipProps` |
| `dataSource` | `T[]` | — | Row data |
| `dataSourceFull` | `T[]` | — | Full unfiltered data for accurate selection counts when `dataSource` is a subset |
| `dataSourceTotalCount` | `number` | — | Override the total count shown in title bar |
| `isCounterLoading` | `boolean` | — | Shows a skeleton in place of the item counter |
| `renderCustomCounter` | `(props: { count: number; content: ReactNode }) => ReactNode` | — | Replaces the default "N items" counter |
| `selection` | `RowSelection<T>` | — | See RowSelection below |
| `rowStar` | `RowStar<T>` | — | See RowStar below |
| `filters` | `Filter[]` | — | Filter trigger buttons rendered on the right of the title bar |
| `searchComponent` | `ReactNode` | — | Slot on the right side of the title bar |
| `filterComponent` | `ReactNode` | — | Slot on the right side of the title bar (before searchComponent) |
| `headerButton` | `ReactNode` | — | Button slot on the right side of the title bar |
| `itemsMenu` | `string \| ReactNode` | — | Shown in title bar when rows are selected (bulk actions) |
| `grouped` | `boolean` | — | When true and dataSource contains GroupType records, renders GroupTable |
| `hideGroupExpander` | `boolean` | — | Hides expand/collapse toggle in GroupTable |
| `initialGroupsCollapsed` | `boolean` | — | Groups start collapsed in GroupTable |
| `hideColumnNames` | `boolean` | — | Hides the column header row via CSS |
| `disableColumnNamesLineBreak` | `boolean` | — | Prevents column header text wrapping |
| `locale` | `Locale` | (react-intl defaults) | i18n overrides; merged with built-in defaults |
| `onSort` | `OnSortFn` | — | Called when any sort button is clicked |
| `renderSelectionTitle` | `(selection?, filters?) => ReactNode` | — | Replaces default selected-count title |
| `hideTitlePart` | `boolean` | — | Hides the count portion of the title bar (shows skeleton) |
| `getRowTooltipProps` | `(row: T) => TooltipProps \| false` | — | Wraps entire row in a tooltip |
| `emptyDataComponent` | `ReactNode` | `ds-result no-results` | Replaces default empty state |
| `pagination` | antd PaginationProps \| false | — | Pagination config; prev/next buttons use ds-button |
| + all antd TableProps | (except `title`, `subTitle`, `onSearch`, `itemsMenu`, `search`, `locale`, `columns`, `loading`) | — | Passed through to antd Table |

`DSTable.SELECTION_ALL` and `DSTable.SELECTION_INVERT` are string constants attached to the component.

### `DSColumnType<T>`

Extends antd `ColumnType<T>`:

| Added prop | Type | Description |
|------------|------|-------------|
| `fixed` | `'left' \| 'right'` | Overrides antd (removes boolean) |
| `sortRender` | `'default' \| 'string' \| SortButtonsRenderer<T>` | Controls sort UI; `'default'` = numeric/generic, `'string'` = A-Z/Z-A |
| `childRender` | `(value, row, index) => ReactNode` | VirtualTable only — alternative render for expanded child rows |
| `getCellTooltipProps` | `(row: T) => TooltipProps \| false` | Wraps cell content in ds-tooltip |

### `RowSelection<T>`

Extends antd `TableRowSelection<T>`:

| Prop | Type | Description |
|------|------|-------------|
| `selectedRowKeys` | `Key[]` | Required (unlike antd where it's optional) |
| `onChange` | `(keys: Key[], rows: T[]) => void` | Required |
| `selections` | `SelectionItem[]` | SELECTION_ALL / SELECTION_INVERT / custom Selection / null |
| `fixed` | `boolean` | Fixes selection column |
| `limit` | `number` | Max allowed selection count |
| `independentSelectionExpandedRows` | `boolean` | Allows selecting parent and child rows independently |
| `checkRowSelectionStatus` | `(record: T) => { disabled?: boolean; unavailable?: boolean }` | Per-row selection state |
| `getSelectionTooltipProps` | `(record: T) => TooltipProps \| false` | Per-row checkbox tooltip |
| `globalSelection` | `{ isSelected: boolean; onChange: (selected: boolean) => void }` | "Select all pages" flag for paginated/infinite tables |

### `RowStar<T>`

| Prop | Type | Description |
|------|------|-------------|
| `starredRowKeys` | `string[]` | Required — currently starred keys |
| `onChange` | `(starredRowKeys: string[], starredKey: string, isStarred: boolean) => void` | — |
| `onClick` | `(e: MouseEvent) => void` | — |
| `renderCell` | `ColumnType<T>['render']` | Override star column cell renderer |
| `className` | `string` | — |
| `disableForExpandedRows` | `boolean` | Hides star on child rows |

### `VirtualTable`

`DSTableProps<T>` plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cellHeight` | `number` | `52` | Fixed height of every row in px |
| `initialWidth` | `number` | `0` | Initial container width before ResizeObserver fires |
| `scroll` | `{ x?: number; y: number }` | — | `y` is required; sets visible list height |
| `infiniteScroll` | `InfiniteScrollProps` | — | Enables bidirectional infinite loading |
| `onRowClick` | `(row: T) => void` | — | Row click handler |
| `onListRefChange` | `(ref: RefObject<List>) => void` | — | **Deprecated** — fires on every render |
| `onItemsRendered` | `ListOnItemsRenderedProps => void` | — | react-window callback |
| `onScrollToRecordIndex` | `(index: number, callback?: () => void) => void` | — | Override scroll-to-item behaviour |
| `sticky` | `DSTableProps.sticky & { scrollThreshold?, offsetHeader?, getContainer: () => HTMLDivElement }` | — | Sticky header with DS-managed scrollbar |

`VirtualTable` accepts a `ref` of type `VirtualTableRef`:
```ts
{ virtualListRef, outerListRef, horizontalScrollRef, scrollToTop(), scrollTo(top) }
```

### `InfiniteScrollProps`

| Prop | Type | Description |
|------|------|-------------|
| `hasMore` | `boolean` | More items available below |
| `isLoading` | `boolean` | Currently fetching |
| `hasError` | `boolean` | Fetch failed |
| `nextPage` | `InfiniteScrollState` | State for bottom loader |
| `prevPage` | `InfiniteScrollState` | State for top loader (prepend) |
| `maxScroll` | `number` | Max virtual scroll offset for triggering load |
| `showBackToTopButton` | `boolean` | — |
| `render` | `(state) => ReactElement` | Custom loader/error/end renderer |
| `onScrollEndReach` | `() => void` | Triggered near bottom |
| `onScrollTopReach` | `() => void` | Triggered near top (for bidirectional scroll) |
| `onRetryButtonClick` | `(position) => void` | — |
| `onBackToTop` | `() => void` | — |

### `TableCell` namespace

Accessed as `import { TableCell } from '@synerise/ds-table'`:

| Name | Key props |
|------|-----------|
| `ActionCell` | `children`, `gapSize?: number`, `contentAlign?: 'left'\|'right'\|'center'` |
| `AvatarLabelCell` | `avatar`, `title`, `labels?`, `icon?`, `avatarAction?`, `avatarLink?`, `ellipsis?`, `maxWidth?`, `disabled?` |
| `CopyableCell` | `value`, `confirmMessage`, `tooltipTimeout` |
| `EditableCell` | `value?`, `onChange`, `placeholder?` |
| `FlagLabelCell` | `countryCode`, `label` |
| `IconLabelCell` | `label?`, `icon?`, `disabled?` |
| `IconTooltipCell` | `label?`, `icon?`, `tooltipIcon?`, `tooltip?`, `disabled?` |
| `InputNumberCell` | `inputNumberProps?`, `disabled?` |
| `LabelsWithShowMore` | `items`, `numberOfVisibleItems`, `labelKey`, `renderItem`, `texts`, `loading?` |
| `StarCell` | `children`, `active?`, `onClick?`, `starTooltip?` |
| `StatusLabelCell` | `label`, `status?`, `customColor?`, `disabled?` |
| `TagIconCell` | `children`, `disabled?` |
| `TagsGroupCell` | `tagsProps?`, `disabled?`, `isLoading?`, `isError?` |

### `ItemsMenu`

Thin styled wrapper (`children: ReactNode`). Renders bulk-action menu items alongside the selection count in the title bar.

### `GroupedTable` (alias: `GroupTable`)

Use via `<Table grouped dataSource={groupedData} />` or directly as `<GroupedTable />`.

`dataSource` must be `GroupType<T>[]`:
```ts
{ column: string; key: string | number; value: string | number | boolean | object; rows: T[]; groupType: GroupByType }
```
`GROUP_BY` constant: `{ value, ranges, interval, disabled }`.

Additional props beyond `DSTableProps`: `addItem?`, `hideGroupExpander?`, `initialGroupsCollapsed?`.

## Usage patterns

```tsx
import Table, { TableCell, VirtualTable, TreeTable, GroupedTable, ItemsMenu } from '@synerise/ds-table';
import type { DSTableProps, DSColumnType, RowSelection } from '@synerise/ds-table';

// Basic table
const columns: DSColumnType<Row>[] = [
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Name',
    sorter: true,
    sortRender: 'string', // renders A-Z / Z-A buttons
    render: (value, row) => <TableCell.AvatarLabelCell avatar={<Avatar />} title={value} />,
  },
];

<Table<Row>
  title="Users"
  columns={columns}
  dataSource={rows}
  rowKey="id"
  selection={selection}
  locale={{ pagination: { items: 'users' } }}
/>

// Virtual table with infinite scroll
<VirtualTable<Row>
  ref={tableRef}
  columns={columns}
  dataSource={rows}
  scroll={{ y: 600 }}
  cellHeight={52}
  initialWidth={800}
  infiniteScroll={{
    hasMore: true, isLoading: false, hasError: false,
    onScrollEndReach: fetchNextPage,
  }}
/>

// Tree table
<TreeTable<Row> columns={columns} dataSource={rows} rowKey="id" />

// Grouped table
<Table<GroupType<Row>>
  grouped
  columns={columns}
  dataSource={[{ column: 'status', key: 'active', value: 'Active', rows: [...], groupType: 'value' }]}
/>
```

## Styling / Key dependencies / Implementation notes

- **Ant Design 4.x** is the rendering engine. `DefaultTable` and `GroupTable` render `antd/lib/table` directly. DSTable wraps DefaultTable/GroupTable.
- `VirtualTable` replaces antd's body with a `react-window` `FixedSizeList`. All rows must have the same height (`cellHeight`). Expanded rows are flattened into the list array with an `expandedChild` marker property.
- **Skeleton loading**: when `loading=true`, `getSkeletonProps` replaces `dataSource` with fake rows of `<Skeleton>` cells. The real data is never rendered until `loading` is false.
- **Sort state** is managed locally via `useSortState` (useReducer). Columns need a unique `key` when `sorter` is set; a dev-mode warning fires otherwise. Multi-column sort requires `sorter: { compare, multiple: <priority> }`.
- **Selection column** (64 px wide) is prepended by `DefaultTable`/`VirtualTable` via antd's `rowSelection.renderCell`, not as a real column — so it is not included in `columns`.
- **Row star column** is also prepended (via `useRowStar`) separately from the DS `rowStar` prop. In VirtualTable, selection and star columns are sliced off `mergedColumns` before passing to antd to avoid double-rendering.
- **`TableLocaleContext`** is provided by DSTable so deeply nested cell components can access locale without prop drilling.
- **`onListRefChange`** on VirtualTable fires on every render (missing deps array), documented internally as deprecated.
- **`fixed` in DSColumnType** narrows antd's `boolean | string` to `'left' | 'right'` only — passing `true` (antd shorthand for `'left'`) will cause a TypeScript error.
- Uses `react-intl` for all UI strings. The component must be wrapped in an `IntlProvider`.
- The package uses **Jest** (not Vitest) — `"test": "jest"` in package.json.
