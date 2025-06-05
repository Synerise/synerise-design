---
id: column-manager
title: ColumnManager
---

ColumnManager UI Component

## Installation

```
npm i @synerise/ds-column-manager
or
yarn add @synerise/ds-column-manager
```

## Usage

```
import ColumnManager from '@synerise/ds-column-manager'

<ColumnManager />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-column-manager--default"></iframe>

## API

#### ColumnManager

| Property  | Description                                                                             | Type                                             | Default |
| --------- | --------------------------------------------------------------------------------------- | ------------------------------------------------ | ------- |
| hide      | Specify a callback that will be called when a user clicks mask, close or cancel button. | Function                                         | -       |
| visible   | Whether the ColumnManager is visible or not.                                            | boolean                                          | `false` |
| draggable | Set to false to disable column reordering                                               | boolean                                          | `true`  |
| onApply   | Specify a callback that will be called when a user clicks on `Apply` button             | (columns: <ColumnType extends Column>[]) => void | -       |
| columns   | Current columns configuration                                                           | <ColumnType extends Column>[]                    | []      |
| texts     | Object contains texts for buttons, title, confirms etc.                                 | ColumnManagerTexts                               | -       |

#### Column

| Property | Description                                    | Type                                        | Default |
| -------- | ---------------------------------------------- | ------------------------------------------- | ------- |
| id       | Id of column                                   | string                                      | -       |
| name     | Name of column                                 | string                                      | -       |
| visible  | Whether the column is visibile in table view   | boolean                                     | -       |
| readOnly | Set to true to disallow updating config        | boolean                                     | -       |
| type     | Type of data in column - renders relevant icon | 'text', 'number', 'date', 'boolean', 'list' | -       |

#### ColumnManagerTexts

| Property           | Description                   | Type      | Default          |
| ------------------ | ----------------------------- | --------- | ---------------- |
| title              | Manage columns title          | ReactNode | 'Manage columns' |
| searchPlaceholder  | Search input placeholder      | string    | 'Search'         |
| searchClearTooltip | Clear label                   | ReactNode | 'Clear'          |
| noResults          | No search results placeholder | ReactNode | 'No results'     |
| cancel             | Cancel button label           | ReactNode | 'Cancel'         |
| apply              | Apply button label            | ReactNode | 'Apply'          |
| clear              | Clear label                   | ReactNode | 'Clear'          |
| switchOn           | Switch on tooltip             | ReactNode | 'Switch on'      |
| switchOff          | Switch off tooltip            | ReactNode | 'Switch off'     |
