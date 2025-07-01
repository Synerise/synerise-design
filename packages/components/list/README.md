---
id: list
title: List
---

List UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-list--default"></iframe>

## API

### List

| Property   | Description                                                                                                       | Type                         | Default              |
| ---------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------- |
| bordered   | Toggles rendering of the border around the list                                                                   | boolean                      | `false`              |
| dataSource | DataSource array of arrays for list                                                                               | any[][]                      | -                    |
| dashed     | Define type of divider line                                                                                       | boolean                      | `true`               |
| grid       | The grid type of list. You can set grid to something like {gutter: 16, column: 4}                                 | object                       | -                    |
| header     | List header renderer                                                                                              | string                       | -                    |
| itemLayout | The layout of list, default is horizontal, If a vertical list is desired, set the itemLayout property to vertical | string                       | -                    |
| loading    | Shows a loading indicator while the contents of the list are being fetched                                        | boolean / object             | `false`              |
| loadMore   | Shows a load more content                                                                                         | string / React.ReactNode     | -                    |
| locale     | i18n text including empty text                                                                                    | object                       | emptyText: 'No Data' |
| options    | Options for radio group, if radio prop is provided                                                                | RadioGroupProps              | -                    |
| pagination | Pagination config, hide it by setting it to`false`                                                                | boolean                      | object               |
| split      | Toggles rendering of the split under the list item                                                                | boolean                      | `true`               |
| renderItem | Customize list item when using dataSource                                                                         | item => ReactNode            | -                    |
| rowKey     | Item's unique key, could be a string or function that returns a string                                            | string / (record) = > string | key                  |
| radio      | Whether or not list should be wrapper with radio group                                                            | boolean                      | -                    |

### List.TextItem

| Property | Description                                               | Type                  | Default                      |
| -------- | --------------------------------------------------------- | --------------------- | ---------------------------- | --- |
| disabled | If element is disabled                                    | boolean               | -                            |
| icon     | Item will be prefixed with this element                   | React.ReactNode       | -                            |
| danger   | If element should be marked as danger action (ie. delete) | boolean               | -                            |
| actions  | Actions for item, will be rendered at the end of the row  | React.ReactNode       | -                            |
| onSelect | Callback for selecting item                               | (e?: React.MouseEvent | React.KeyboardEvent) => void | -   |
| size     | Size of item in list                                      | `small` / `medium`    | `medium`                     |

### List.Divider

| Property | Description         | Type    | Default |
| -------- | ------------------- | ------- | ------- |
| dashed   | Dash type of a line | boolean | `true`  |
