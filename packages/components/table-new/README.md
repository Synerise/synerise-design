---
id: table-new
title: TableNew
---

TableNew UI Component

A data table component for the Synerise Design System built on top of [@tanstack/react-table](https://tanstack.com/table) and [@tanstack/react-virtual](https://tanstack.com/virtual). It provides two variants: a standard paginated `Table` and a virtualized `VirtualTable` for large datasets with infinite scrolling.

## Installation
```
npm i @synerise/ds-table-new
or
yarn add @synerise/ds-table-new
or
pnpm add @synerise/ds-table-new
```

## Usage

### Standard paginated table

```tsx
import { Table } from '@synerise/ds-table-new';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age' },
];

const data = [
  { name: 'John', age: 28 },
  { name: 'Jane', age: 32 },
];

<Table data={data} columns={columns} pagination={{ pageSize: 10 }} />
```

### Virtualized table with infinite scroll

```tsx
import { VirtualTable } from '@synerise/ds-table-new';

<VirtualTable
  data={data}
  columns={columns}
  scroll={{ y: 500 }}
  infiniteScroll={{
    hasMore: true,
    isLoading: false,
    hasError: false,
    onScrollEndReach: () => loadMore(),
  }}
/>
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-table-new--default"></iframe>

## Exports

| Export | Description |
| --- | --- |
| `Table` | Standard paginated table component |
| `VirtualTable` | Virtualized table for large/infinite datasets |
| `TableCell` | Pre-built cell renderers |
| `legacyColumnConfigAdapter` | Utility to convert legacy column configs to TanStack format |

## API

### Shared props (Table & VirtualTable)

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `data` | Array of row data | `TData[]` | **required** |
| `columns` | Column definitions (TanStack ColumnDef) | `ColumnDef<TData, TValue>[]` | **required** |
| `title` | Table title rendered in the header bar | `ReactNode` | - |
| `rowKey` | Unique row identifier — function or property name | `((row: TData) => string) \| keyof TData` | - |
| `selectionConfig` | Row selection configuration (onChange, limit, etc.) | `SelectionConfig<TData>` | - |
| `selectedRowKeys` | Currently selected row keys | `string[]` | - |
| `onRowClick` | Row click handler | `(row: TData, event: MouseEvent) => void` | - |
| `onSort` | Sort change handler | `OnSortFn` | - |
| `isLoading` | Show loading skeleton | `boolean` | - |
| `cellHeight` | Estimated row height in px | `number` | - |
| `className` | CSS class for styled-components composition | `string` | - |
| `showHeader` | Show or hide the table header bar | `boolean` | - |
| `itemsMenu` | Rendered next to title when rows are selected (batch actions) | `ReactNode` | - |
| `searchComponent` | Search input rendered on the right side of the header | `ReactNode` | - |
| `filterComponent` | Filter controls rendered on the right side of the header | `ReactNode` | - |
| `headerButton` | Button rendered in the header | `ReactNode` | - |
| `cardStyles` | Render table with rounded corners and shadow | `boolean` | - |
| `headerWithBorderTop` | Render top border on the table header | `boolean` | - |
| `hideColumnNames` | Hide the column header row | `boolean` | - |
| `hideTitleBar` | Hide the entire title bar | `boolean` | - |
| `hideTitlePart` | Hide only the title, keep the counter | `boolean` | - |
| `disableColumnNamesLineBreak` | Apply `white-space: nowrap` to column header cells | `boolean` | - |
| `isCounterLoading` | Show skeleton in place of total count | `boolean` | - |
| `dataSourceTotalCount` | Total row count (useful when server-side) | `number` | - |
| `emptyDataComponent` | Custom empty state component | `ReactNode` | - |
| `texts` | Override default i18n text labels | `Partial<TableTexts>` | - |
| `expandable` | Tree/expandable row configuration | `Expandable<TData>` | - |
| `renderSelectionTitle` | Custom selection title renderer | `(selection?) => ReactNode` | - |
| `renderCustomCounter` | Custom counter renderer | `CustomCounterFn` | - |

### Table-only props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `pagination` | Pagination config or `false` to disable | `boolean \| TablePaginationConfig` | `{ pageSize: 10 }` |

### VirtualTable-only props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `scroll` | Scroll container dimensions `{ x?, y }` | `{ x?: number; y: number }` | - |
| `infiniteScroll` | Infinite scroll configuration | `InfiniteScrollProps` | - |
| `stickyHeader` | Stick header to top on scroll | `boolean` | - |
| `sticky` | Advanced sticky configuration with scroll container | `{ scrollThreshold?; offsetHeader?; getContainer }` | - |
| `tableRef` | Ref exposing `scrollToTop`, `scrollTo`, `scrollToIndex`, `getDimensions` | `RefObject<VirtualTableRef>` | - |
| `scrollElementRef` | External scroll container ref | `MutableRefObject<HTMLDivElement \| null>` | - |
| `onItemsRendered` | Callback with `{ visibleStartIndex }` as rows are virtualized | `(props: OnItemsRenderedProps) => void` | - |
| `onScrollToRecordIndex` | Callback when scrolling to a specific record index | `(recordIndex, callback?) => void` | - |

### SelectionConfig

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `onChange` | Called when selection changes | `(selectedRowKeys: string[], selectedRows: TData[]) => void` | **required** |
| `limit` | Maximum number of selectable rows | `number` | - |
| `hideSelectAll` | Hide "select all" checkbox | `boolean` | - |
| `fixed` | Fix selection column position | `boolean` | - |
| `selections` | Custom selection menu items | `SelectionItem[]` | - |
| `globalSelectionOnChange` | Handler for "select all across pages" | `(selected: boolean) => void` | - |
| `globalSelected` | Current global selection state | `boolean` | - |
| `checkRowSelectionStatus` | Per-row disabled/unavailable check | `(record: TData) => { disabled?; unavailable? }` | - |
| `independentSelectionExpandedRows` | Treat expanded child rows as independent selections | `boolean` | - |

### InfiniteScrollProps

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `hasMore` | Whether more data is available | `boolean` | **required** |
| `isLoading` | Whether data is currently loading | `boolean` | **required** |
| `hasError` | Whether the last fetch errored | `boolean` | **required** |
| `onScrollEndReach` | Called when user scrolls to bottom | `() => void` | - |
| `onScrollTopReach` | Called when user scrolls to top | `() => void` | - |
| `showBackToTopButton` | Show "back to top" button | `boolean` | - |
| `onBackToTop` | Called when "back to top" is clicked | `() => void` | - |
| `onRetryButtonClick` | Called when retry button is clicked | `(position: 'TOP' \| 'BOTTOM') => void` | - |
| `prevPage` | State for bidirectional infinite scroll (loading previous pages) | `InfiniteScrollState` | - |
| `maxScroll` | Maximum scroll height | `number` | - |
| `render` | Custom loader renderer | `(state: InfiniteScrollState) => ReactElement` | - |
