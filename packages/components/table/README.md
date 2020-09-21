---
id: table
title: Table
---

Table UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-table--default"></iframe>

## API

### Table

| Property               | Description                                                                                                                                                                                                                   | Type                                                                    | Default                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| bordered               | Whether to show all table borders                                                                                                                                                                                             | boolean                                                                 | `false`                                                                            |
| childrenColumnName     | The column contains children to display                                                                                                                                                                                       | string / []                                                             | children                                                                           |
| columns                | Columns of table                                                                                                                                                                                                              | [ColumnProps](https://git.io/vMMXC)\[]                                  | -                                                                                  |
| components             | Override default table elements                                                                                                                                                                                               | [TableComponents](https://git.io/fANxz)                                 | -                                                                                  |
| dataSource             | Data record array to be displayed                                                                                                                                                                                             | any / []                                                                | -                                                                                  |
| defaultExpandAllRows   | Expand all rows initially                                                                                                                                                                                                     | boolean                                                                 | `false`                                                                            |
| defaultExpandedRowKeys | Initial expanded row keys                                                                                                                                                                                                     | string / []                                                             | -                                                                                  |
| expandedRowKeys        | Current expanded row keys                                                                                                                                                                                                     | string / []                                                             | -                                                                                  |
| expandedRowRender      | Expanded container render for each row                                                                                                                                                                                        | (record, index, indent, expanded) => React.ReactNode                    | -                                                                                  |
| expandIcon             | Customize row expand Icon. Ref [example](http://react-component.github.io/table/examples/expandIcon.html)                                                                                                                     | (props) => React.ReactNode                                              | -                                                                                  |
| expandRowByClick       | Whether to expand row by clicking anywhere in the whole row                                                                                                                                                                   | boolean                                                                 | `false`                                                                            |
| footer                 | Table footer renderer                                                                                                                                                                                                         | (currentPageData) => React.ReactNode                                    |                                                                                    |
| indentSize             | Indent size in pixels of tree data                                                                                                                                                                                            | number                                                                  | 15                                                                                 |
| loading                | Loading status of table                                                                                                                                                                                                       | boolean / object                                                        | `false`                                                                            |
| locale                 | i18n text including filter, sort, empty text, etc                                                                                                                                                                             | object                                                                  | filterConfirm: 'Ok' <br /> filterReset: 'Reset' <br /> emptyText: 'No Data' <br /> |
| pagination             | Config of pagination. You can ref table pagination [config](#pagination) or full [`pagination`](/components/pagination/) document, hide it by setting it to `false`                                                           | object                                                                  |                                                                                    |
| rowClassName           | Row's className                                                                                                                                                                                                               | (record, index: number) => string                                       | -                                                                                  |
| rowKey                 | Row's unique key, could be a string or function that returns a string                                                                                                                                                         | string / (record) => string                                             | `key`                                                                              |
| scroll                 | Set horizontal or vertical scrolling, can also be used to specify the width and height of the scroll area, could be number, percent value, `true` and ['max-content'](https://developer.mozilla.org/en-US/docs/Web/CSS/width) | { x: number / true, y: number }                                         | -                                                                                  |
| showHeader             | Whether to show table header                                                                                                                                                                                                  | boolean                                                                 | `true`                                                                             |
| size                   | Size of table                                                                                                                                                                                                                 | `default` / `middle` / `small`                                          | `default`                                                                          |
| title                  | Table title renderer                                                                                                                                                                                                          | string / React.ReactNode                                                |                                                                                    |
| hideTitleBar           | Wheter to hide table title bar                                                                                                                                                                                                | boolean                                                                 | -                                                                                  |
| headerWithBorderTop    | Wheter to add line above table title bar                                                                                                                                                                                      | boolean                                                                 | -                                                                                  |
| itemsMenu              | Components or text visible when any of table itams are selected, usually used for bulk actions                                                                                                                                | string / React.ReactNode                                                | -                                                                                  |
| search                 | Search query                                                                                                                                                                                                                  | string                                                                  | -                                                                                  |
| cellSize               | Defines padding size of each row in table                                                                                                                                                                                     | `small` / `medium` / `default`                                          | `default`                                                                          |
| roundedHeader          | Wheter to round table header                                                                                                                                                                                                  | boolean                                                                 | `false`                                                                            |
| selection              | Config of rows selection                                                                                                                                                                                                      | RowSelection                                                            | -                                                                                  |
| filters                | Array of filters cofings, earch of them will be rendered in table title bar                                                                                                                                                   | Filter[]                                                                | -                                                                                  |
| searchComponent        | SearchComponent                                                                                                                                                                                                               | React.ReactNode                                                         | -                                                                                  |
| filterComponent        | FilterItemComponent                                                                                                                                                                                                           | React.ReactNode                                                         | -                                                                                  |
| grouped                | Whether to render table as GroupedTable of DefaultTable                                                                                                                                                                       | boolean                                                                 | -                                                                                  |
| onChange               | Callback executed when pagination, filters or sorter is changed                                                                                                                                                               | (pagination, filters, sorter, extra: { currentDataSource: [] }) => void |                                                                                    |
| onExpand               | Callback executed when the row expand icon is clicked                                                                                                                                                                         | (expanded, record) => void                                              |                                                                                    |
| onExpandedRowsChange   | Callback executed when the expanded rows change                                                                                                                                                                               | (expandedRows) => void                                                  |                                                                                    |
| onHeaderRow            | Set props on per header row                                                                                                                                                                                                   | (column, index) => object                                               | -                                                                                  |
| onRow                  | Set props on per row                                                                                                                                                                                                          | (record, index) => object                                               | -                                                                                  |
| onSearch               | Callback executed when the search input change                                                                                                                                                                                | (event) => void                                                         | -                                                                                  |
| getPopupContainer      | the render container of dropdowns in table                                                                                                                                                                                    | (triggerNode) => HTMLElement                                            | `() => TableHtmlElement`                                                           |

### VirtualTable

| Property     | Description                                 | Type                                   | Default |
| ------------ | ------------------------------------------- | -------------------------------------- | ------- |
| columns      | Columns of table                            | [ColumnProps](https://git.io/vMMXC)\[] | -       |
| scroll       | Whether the table can be scrollable, config | {x?: number, y: number}                | -       |
| onRowClick   | Callback executed when row is clicked       | (row) => void                          | -       |
| cellHeight   | Defines height of single cell               | number                                 | -       |
| initialWidth | Initial width of table                      | number                                 | -       |

### TreeTable

Display tree structure data in Table when there is field key children in dataSource.

### GroupTable

This type of table requires a specific type of dataSource which has to contain a structure as the following:

| Property  | Description                                      | Type                                        | Default |
| --------- | ------------------------------------------------ | ------------------------------------------- | ------- |
| column    | Key of grouped column                            | string                                      | -       |
| key       | Key of group                                     | React.ReactText                             | -       |
| value     | Value of group ex. specific value or group name  | React.ReactText\boolean\object              | -       |
| rows      | Data of items in group, like standard dataSource | any[]                                       | -       |
| groupType | Type of active grouping                          | `value` / `ranges` / `interval` / undefined | -       |

#### RowSelection

| Property        | Description                                      | Type                                                            | Default |
| --------------- | ------------------------------------------------ | --------------------------------------------------------------- | ------- |
| fixed           | Whether to show selection column as fixed or not | boolean                                                         | -       |
| selectedRowKeys | Array of selected row keys                       | React.ReactText                                                 | []      |
| selections      | Selections options available in table title      | SelectionItem[]                                                 | -       |
| onChange        | Callback executed when selection changes         | (selectedRowKeys: React.ReactText[], selectedRows: T[]) => void | -       |

#### SelectionItem

Type which contains: DSTable.SELECTION_ALL | DSTable.SELECTION_INVERT | Selection | null | undefined;

#### Selection

Allows to create custom selection

| Property | Description                                      | Type       | Default |
| -------- | ------------------------------------------------ | ---------- | ------- |
| key      | Unique key of this selection                     | string     | -       |
| label    | Display name of this selection                   | string     | -       |
| onClick  | Callback executed when this selection is clicked | () => void | -       |

#### Filter

| Property    | Description                                             | Type                                                           | Default |
| ----------- | ------------------------------------------------------- | -------------------------------------------------------------- | ------- |
| tooltips    | Object contains varius tooltips titles                  | {default: string, clear: string, define: string, list: string} | -       |
| openedLabel | Label visible list of filters is opened                 | string                                                         | -       |
| key         | Key of filter                                           | string                                                         | -       |
| icon        | Icon of filter                                          | React.ReactNode                                                | -       |
| showList    | Function executed when user clicks on showList icon     | () => void                                                     | -       |
| show        | Function executed when user clicks on filter icon       | () => void                                                     | -       |
| handleClear | Function executed when user clicks on clear filter icon | () => void                                                     | -       |
| selected    | Name of selected filter                                 | {name: string}                                                 | -       |
| disabled    | Whether to disable filter icon                          | boolean                                                        | -       |

#### onRow usage

Same as `onRow` `onHeaderRow` `onCell` `onHeaderCell`

```jsx
<Table
  onRow={(record, rowIndex) => {
    return {
      onClick: event => {}, // click row
      onDoubleClick: event => {}, // double click row
      onContextMenu: event => {}, // right button click row
      onMouseEnter: event => {}, // mouse enter row
      onMouseLeave: event => {}, // mouse leave row
    };
  }}
  onHeaderRow={column => {
    return {
      onClick: () => {}, // click header row
    };
  }}
/>
```

### Column

One of the Table `columns` prop for describing the table's columns, Column has the same API.

| Property                      | Description                                                                                                                                                                                                 | Type                                                          | Default                 | Version |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------- | ------- |
| align                         | specify which way that column is aligned                                                                                                                                                                    | `left` / `right` / `center`                                   | `left`                  | 3.3.2   |
| className                     | className of this column                                                                                                                                                                                    | string                                                        | -                       |         |
| colSpan                       | Span of this column's title                                                                                                                                                                                 | number                                                        |                         |         |
| dataIndex                     | Display field of the data record, could be set like `a.b.c`, `a[0].b.c[1]`                                                                                                                                  | string                                                        | -                       |         |
| defaultSortOrder              | Default order of sorted values                                                                                                                                                                              | `ascend` / `descend`                                          | -                       |         |
| filterDropdown                | Customized filter overlay                                                                                                                                                                                   | ReactNode                                                     | -                       |         |
| filterDropdownVisible         | Whether `filterDropdown` is visible                                                                                                                                                                         | boolean                                                       | -                       |         |
| filtered                      | Whether the `dataSource` is filtered                                                                                                                                                                        | boolean                                                       | `false`                 |         |
| filteredValue                 | Controlled filtered value, filter icon will highlight                                                                                                                                                       | string / []                                                   | -                       |         |
| filterIcon                    | Customized filter icon                                                                                                                                                                                      | React.ReactNode / (filtered: boolean) => React.ReactNode      | `false`                 |         |
| filterMultiple                | Whether multiple filters can be selected                                                                                                                                                                    | boolean                                                       | `true`                  |         |
| filters                       | Filter menu config                                                                                                                                                                                          | object / []                                                   | -                       |         |
| fixed                         | Set column to be fixed: `true`(same as left) `'left'` `'right'`                                                                                                                                             | boolean / string                                              | `false`                 |         |
| itemsMenu                     | Component with menu for selected items                                                                                                                                                                      | React.ReactNode                                               | -                       |         |
| key                           | Unique key of this column, you can ignore this prop if you've set a unique `dataIndex`                                                                                                                      | string                                                        | -                       |         |
| render                        | Renderer of the table cell. The return value should be a ReactNode, or an object for [colSpan/rowSpan config](#components-table-demo-colspan-rowspan)                                                       | (text, record, index) => React.ReactNode                      | -                       |         |
| search                        | Search input value                                                                                                                                                                                          | string                                                        | -                       |         |
| sorter                        | Sort function for local sort, see [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)'s compareFunction. If you need sort buttons only, set to `true` | (a,b) => boolean / boolean                                    | -                       |         |
| sortOrder                     | Order of sorted values: `'ascend'` `'descend'` `false`                                                                                                                                                      | boolean / string                                              | -                       |         |
| sortDirections                | supported sort way, could be `'ascend'`, `'descend'`                                                                                                                                                        | Array                                                         | `['ascend', 'descend']` | 3.15.2  |
| title                         | Title of this column                                                                                                                                                                                        | React.ReactNode / ({ sortOrder, filters }) => React.ReactNode | -                       |         |
| width                         | Width of this column                                                                                                                                                                                        | string / number                                               | -                       |         |
| onCell                        | Set props on per cell                                                                                                                                                                                       | (record, rowIndex: number) => object                          | -                       |         |
| onFilter                      | Callback executed when the confirm filter button is clicked                                                                                                                                                 | () => void                                                    | -                       |         |
| onFilterDropdownVisibleChange | Callback executed when `filterDropdownVisible` is changed                                                                                                                                                   | (visible: boolean) => void                                    | -                       |         |
| onHeaderCell                  | Set props on per header cell                                                                                                                                                                                | (column) => object                                            | -                       |         |

### ColumnGroup

| Property | Description               | Type             | Default |
| -------- | ------------------------- | ---------------- | ------- |
| title    | Title of the column group | string\ReactNode | -       |

### pagination

Properties for pagination.

| Property | Description                          | Type                      | Default  |
| -------- | ------------------------------------ | ------------------------- | -------- |
| position | specify the position of `Pagination` | 'top' \ 'bottom' \ 'both' | 'bottom' |

More about pagination, please check [`Pagination`](/components/pagination/).
