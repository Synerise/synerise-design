---
id: list
title: List
---

List UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-list--default"></iframe>

## API

### List

| Property   | Description                                                                                                       | Type                           | Default              |
| ---------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------ | -------------------- |
| dataSource | dataSource array of arrays for list                                                                               | any[][]                        | -                    |
| radio      | whether or not list should be wrapper with radio group                                                            | boolean                        | -                    |
| options    | options for radio group, if radio prop is provided                                                                | RadioGroupProps                | -                    |
| bordered   | Toggles rendering of the border around the list                                                                   | boolean                        | false                |
| grid       | The grid type of list. You can set grid to something like {gutter: 16, column: 4}                                 | object                         | -                    |
| header     | List header renderer                                                                                              | string                         | ReactNode            | - |
| itemLayout | The layout of list, default is horizontal, If a vertical list is desired, set the itemLayout property to vertical | string                         | -                    |
| rowKey     | Item's unique key, could be a string or function that returns a string                                            | string\Function(record):string | key                  |
| loading    | Shows a loading indicator while the contents of the list are being fetched                                        | boolean\object                 | false                |
| loadMore   | Shows a load more content                                                                                         | string                         | ReactNode            | - |
| locale     | i18n text including empty text                                                                                    | object                         | emptyText: 'No Data' |
| pagination | Pagination config, hide it by setting it to false                                                                 | boolean                        | object               | false |
| split      | Toggles rendering of the split under the list item                                                                | boolean                        | true                 |
| renderItem | customize list item when using dataSource                                                                         | item => ReactNode              | -                    |
| dashed     | Define type of divider line                                                                                       | boolean                        | true                 |

### List.TextItem

| Property | Description                                               | Type      | Default |
| -------- | --------------------------------------------------------- | --------- | ------- |
| disabled | if element is disabled                                    | boolean   | -       |
| icon     | item will be prefixed with this element                   | ReactNode | -       |
| danger   | if element should be marked as danger action (ie. delete) | boolean   | -       |
| actions  | actions for item, will be rendered at the end of the row  | ReactNode | -       |
| onSelect | callback for selecting item                               | Function  | -       |

### List.Divider

| Property | Description         | Type    | Default |
| -------- | ------------------- | ------- | ------- |
| dashed   | dash type of a line | boolean | true    |

### List.ItemWrapper

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |

