---
id: table
title: Table
---

Table UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-table--default"></iframe>

## API

### Table

| Property               | Description                                                                                                                                                                                                                   | Type                                                                    | Default                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| bordered               | Whether to show all table borders                                                                                                                                                                                             | boolean                                                                 | `false`                                                                      |
| childrenColumnName     | The column contains children to display                                                                                                                                                                                       | string\[]                                                               | children                                                                     |
| columns                | Columns of table                                                                                                                                                                                                              | [ColumnProps](https://git.io/vMMXC)\[]                                  | -                                                                            |
| components             | Override default table elements                                                                                                                                                                                               | [TableComponents](https://git.io/fANxz)                                 | -                                                                            |
| dataSource             | Data record array to be displayed                                                                                                                                                                                             | any\[]                                                                  | -                                                                            |
| defaultExpandAllRows   | Expand all rows initially                                                                                                                                                                                                     | boolean                                                                 | `false`                                                                      |
| defaultExpandedRowKeys | Initial expanded row keys                                                                                                                                                                                                     | string\[]                                                               | -                                                                            |
| expandedRowKeys        | Current expanded row keys                                                                                                                                                                                                     | string\[]                                                               | -                                                                            |
| expandedRowRender      | Expanded container render for each row                                                                                                                                                                                        | Function(record, index, indent, expanded):ReactNode                     | -                                                                            |
| expandIcon             | Customize row expand Icon. Ref [example](http://react-component.github.io/table/examples/expandIcon.html)                                                                                                                     | Function(props):ReactNode                                               | -                                                                            |
| expandRowByClick       | Whether to expand row by clicking anywhere in the whole row                                                                                                                                                                   | boolean                                                                 | `false`                                                                      |
| footer                 | Table footer renderer                                                                                                                                                                                                         | Function(currentPageData)                                               |                                                                              |
| indentSize             | Indent size in pixels of tree data                                                                                                                                                                                            | number                                                                  | 15                                                                           |
| loading                | Loading status of table                                                                                                                                                                                                       | boolean\[object]                                                        | `false`                                                                      |
| locale                 | i18n text including filter, sort, empty text, etc                                                                                                                                                                             | object                                                                  | filterConfirm: 'Ok' <br> filterReset: 'Reset' <br> emptyText: 'No Data' <br> |
| pagination             | Config of pagination. You can ref table pagination [config](#pagination) or full [`pagination`](/components/pagination/) document, hide it by setting it to `false`                                                           | object                                                                  |                                                                              |
| rowClassName           | Row's className                                                                                                                                                                                                               | Function(record, index):string                                          | -                                                                            |
| rowKey                 | Row's unique key, could be a string or function that returns a string                                                                                                                                                         | string\Function(record):string                                          | `key`                                                                        |
| rowSelection           | Row selection [config](#rowSelection)                                                                                                                                                                                         | object                                                                  | null                                                                         |
| scroll                 | Set horizontal or vertical scrolling, can also be used to specify the width and height of the scroll area, could be number, percent value, `true` and ['max-content'](https://developer.mozilla.org/en-US/docs/Web/CSS/width) | { x: number \ true, y: number }                                         | -                                                                            |
| showHeader             | Whether to show table header                                                                                                                                                                                                  | boolean                                                                 | `true`                                                                       |
| size                   | Size of table                                                                                                                                                                                                                 | `default` \ `middle` \ `small`                                          | `default`                                                                    |
| title                  | Table title renderer                                                                                                                                                                                                          | string/ReactNode                                                        |                                                                              |
| subTitle               | Table subtitle renderer                                                                                                                                                                                                       | string/ReactNode                                                        |                                                                              |
| onChange               | Callback executed when pagination, filters or sorter is changed                                                                                                                                                               | Function(pagination, filters, sorter, extra: { currentDataSource: [] }) |                                                                              |
| onExpand               | Callback executed when the row expand icon is clicked                                                                                                                                                                         | Function(expanded, record)                                              |                                                                              |
| onExpandedRowsChange   | Callback executed when the expanded rows change                                                                                                                                                                               | Function(expandedRows)                                                  |                                                                              |
| onHeaderRow            | Set props on per header row                                                                                                                                                                                                   | Function(column, index)                                                 | -                                                                            |
| onRow                  | Set props on per row                                                                                                                                                                                                          | Function(record, index)                                                 | -                                                                            |
| onSearch               | Callback executed when the search input change                                                                                                                                                                                | Function(event)                                                         | -                                                                            |
| getPopupContainer      | the render container of dropdowns in table                                                                                                                                                                                    | (triggerNode) => HTMLElement                                            | `() => TableHtmlElement`                                                     |

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

| Property                      | Description                                                                                                                                                                                                 | Type                                            | Default                 | Version |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------- | ------- |
| align                         | specify which way that column is aligned                                                                                                                                                                    | 'left' \ 'right' \ 'center'                     | 'left'                  | 3.3.2   |
| className                     | className of this column                                                                                                                                                                                    | string                                          | -                       |         |
| colSpan                       | Span of this column's title                                                                                                                                                                                 | number                                          |                         |         |
| dataIndex                     | Display field of the data record, could be set like `a.b.c`, `a[0].b.c[1]`                                                                                                                                  | string                                          | -                       |         |
| defaultSortOrder              | Default order of sorted values                                                                                                                                                                              | 'ascend' \ 'descend'                            | -                       |         |
| filterDropdown                | Customized filter overlay                                                                                                                                                                                   | ReactNode                                       | -                       |         |
| filterDropdownVisible         | Whether `filterDropdown` is visible                                                                                                                                                                         | boolean                                         | -                       |         |
| filtered                      | Whether the `dataSource` is filtered                                                                                                                                                                        | boolean                                         | `false`                 |         |
| filteredValue                 | Controlled filtered value, filter icon will highlight                                                                                                                                                       | string\[]                                       | -                       |         |
| filterIcon                    | Customized filter icon                                                                                                                                                                                      | ReactNode\(filtered: boolean) => ReactNode      | `false`                 |         |
| filterMultiple                | Whether multiple filters can be selected                                                                                                                                                                    | boolean                                         | `true`                  |         |
| filters                       | Filter menu config                                                                                                                                                                                          | object\[]                                       | -                       |         |
| fixed                         | Set column to be fixed: `true`(same as left) `'left'` `'right'`                                                                                                                                             | boolean\string                                  | `false`                 |         |
| key                           | Unique key of this column, you can ignore this prop if you've set a unique `dataIndex`                                                                                                                      | string                                          | -                       |         |
| render                        | Renderer of the table cell. The return value should be a ReactNode, or an object for [colSpan/rowSpan config](#components-table-demo-colspan-rowspan)                                                       | Function(text, record, index) {}                | -                       |         |
| sorter                        | Sort function for local sort, see [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)'s compareFunction. If you need sort buttons only, set to `true` | Function\boolean                                | -                       |         |
| sortOrder                     | Order of sorted values: `'ascend'` `'descend'` `false`                                                                                                                                                      | boolean\string                                  | -                       |         |
| sortDirections                | supported sort way, could be `'ascend'`, `'descend'`                                                                                                                                                        | Array                                           | `['ascend', 'descend']` | 3.15.2  |
| title                         | Title of this column                                                                                                                                                                                        | ReactNode\({ sortOrder, filters }) => ReactNode | -                       |         |
| width                         | Width of this column                                                                                                                                                                                        | string\number                                   | -                       |         |
| onCell                        | Set props on per cell                                                                                                                                                                                       | Function(record, rowIndex)                      | -                       |         |
| onFilter                      | Callback executed when the confirm filter button is clicked                                                                                                                                                 | Function                                        | -                       |         |
| onFilterDropdownVisibleChange | Callback executed when `filterDropdownVisible` is changed                                                                                                                                                   | function(visible) {}                            | -                       |         |
| onHeaderCell                  | Set props on per header cell                                                                                                                                                                                | Function(column)                                | -                       |         |

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

### rowSelection

Properties for row selection.

| Property              | Description                                                                                                                         | Type                                                  | Default    |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ---------- |
| columnWidth           | Set the width of the selection column                                                                                               | string\number                                         | `60px`     |
| columnTitle           | Set the title of the selection column                                                                                               | string\React.ReactNode                                | -          |
| fixed                 | Fixed selection column on the left                                                                                                  | boolean                                               | -          |
| getCheckboxProps      | Get Checkbox or Radio props                                                                                                         | Function(record)                                      | -          |
| hideDefaultSelections | Remove the default `Select All` and `Select Invert` selections when [custom selection](#components-table-demo-row-selection-custom) | boolean                                               | `false`    |
| selectedRowKeys       | Controlled selected row keys                                                                                                        | string\[]\number[]                                    | \[]        |
| selections            | Custom selection [config](#rowSelection), only displays default selections when set to `true`                                       | object\[]\boolean                                     | -          |
| type                  | `checkbox` or `radio`                                                                                                               | `checkbox` \ `radio`                                  | `checkbox` |
| onChange              | Callback executed when selected rows change                                                                                         | Function(selectedRowKeys, selectedRows)               | -          |
| onSelect              | Callback executed when select/deselect one row                                                                                      | Function(record, selected, selectedRows, nativeEvent) | -          |
| onSelectAll           | Callback executed when select/deselect all rows                                                                                     | Function(selected, selectedRows, changeRows)          | -          |
| onSelectInvert        | Callback executed when row selection is inverted                                                                                    | Function(selectedRows)                                | -          |

### selection

| Property | Description                                      | Type                        | Default |
| -------- | ------------------------------------------------ | --------------------------- | ------- |
| key      | Unique key of this selection                     | string                      | -       |
| text     | Display text of this selection                   | string\React.ReactNode      | -       |
| onSelect | Callback executed when this selection is clicked | Function(changeableRowKeys) | -       |
