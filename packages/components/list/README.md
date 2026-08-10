---
id: list
title: List
---

List UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-list--default"></iframe>

## API

> **Note:** As of the antd-removal migration, `@synerise/ds-list` is DS-native. The `grid`,
> `pagination`, and `locale` props are no longer supported (they had no consumer usage) — the
> default "No data" empty state was removed, so consumers now render their own empty state.
> `List.Item.Meta` is not implemented. All other props below are preserved.

### List

| Property   | Description                                                                                                       | Type                         | Default              |
| ---------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------- |
| bordered   | Toggles rendering of the border around the list                                                                   | boolean                      | `false`              |
| dataSource | DataSource array or array of arrays for list                                                                      | `T[] \| T[][]`               | -                    |
| dashed     | Define type of divider line                                                                                       | boolean                      | `true`               |
| header     | List header renderer                                                                                              | string                       | -                    |
| itemLayout | The layout of list, default is horizontal, If a vertical list is desired, set the itemLayout property to vertical | string                       | -                    |
| loading    | Shows a loading indicator while the contents of the list are being fetched                                        | boolean / object             | `false`              |
| loadMore   | Shows a load more content                                                                                         | string / React.ReactNode     | -                    |
| options    | Options for radio group, if radio prop is provided                                                                | RadioGroupProps              | -                    |
| split      | Toggles rendering of the split under the list item                                                                | boolean                      | `true`               |
| renderItem | Customize list item when using dataSource                                                                         | item => ReactNode            | -                    |
| rowKey     | Item's unique key, could be a string or function that returns a string                                            | string / (record) = > string | key                  |
| radio      | Whether or not list should be wrapper with radio group                                                            | boolean                      | -                    |

### List.Item

| Property | Description                                               | Type                  | Default                      |
| -------- | --------------------------------------------------------- | --------------------- | ---------------------------- | --- |
| disabled | If element is disabled                                    | boolean               | -                            |
| icon     | Item will be prefixed with this element                   | JSX.Element           | -                            |
| danger   | If element should be marked as danger action (ie. delete) | boolean               | -                            |
| actions  | Actions for item, will be rendered at the end of the row  | React.ReactNode       | -                            |
| onSelect | Callback for selecting item                               | (e?: React.MouseEvent | React.KeyboardEvent) => void | -   |
| size     | Size of item in list                                      | `small` / `medium`    | `small`                      |

### List.Divider

| Property | Description         | Type    | Default |
| -------- | ------------------- | ------- | ------- |
| dashed   | Dash type of a line | boolean | `true`  |
