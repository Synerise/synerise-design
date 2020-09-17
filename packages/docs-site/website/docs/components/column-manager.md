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

| Property          | Description                                                                             | Type                                                      | Default   |
| ----------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------- | --------- |
| hide              | Specify a callback that will be called when a user clicks mask, close or cancel button. | Function                                                  | -         |
| visible           | Whether the ColumnManager is visible or not.                                            | boolean                                                   |`false`    |
| onSave            | Specify a callback that will be called when a user saves new view                       | (savedView: SavedView) => void;                           | -         |
| onApply           | Specify a callback that will be called when a user clicks on `Apply` button             | (columns: Column[], groupSettings: GroupSettings) => void | -         |
| columns           | Current columns configuration                                                           | Column[]                                                  | []        |
| texts             | Object contains texts for buttons, title, confirms etc.                                 | Texts                                                     | -         |
| itemFilterConfig  | ItemFilter config                                                                       | ItemFilter                                                | -         |
| savedViewsVisible | Whether the ItemFilter with saved views is visible                                      | boolean                                                   | -         |
| hideSavedViews    | Hide ItemFilter with saved views                                                        | ItemFilter                                                | -         |
| groupSettings     | Configuration of grouped data                                                           | GroupSettings or undefined                                | undefined |

#### Column

| Property | Description                                                | Type                                        | Default |
| -------- | ---------------------------------------------------------- | ------------------------------------------- | ------- |
| id       | Id of column                                               | string                                      | -       |
| key      | Key of data from dataSource                                | React.ReactText                             | -       |
| name     | Name of column                                             | string                                      | -       |
| visible  | Whether the column is visibile in table view               | boolean                                     | -       |
| type     | Type of data in column                                     | 'text', 'number', 'date', 'boolean', 'list' | -       |
| fixed    | Whether the column has fixed position or not in table view | 'left' , 'right', undefined                 | -       |
| group    | Whether the column has been grouped                        | boolean                                     | -       |

#### SavedView

| Property      | Description                        | Type                                | Default   |
| ------------- | ---------------------------------- | ----------------------------------- | --------- |
| meta          | Name and description of saved view | {name: string; description: string} | {}        |
| groupSettings | Configuration of grouped data      | GroupSettings                       | undefined |
| columns       | Current columns configuration      | Column[]                            | []        |

#### GroupSettings

| Property | Description            | Type     | Default |
| -------- | ---------------------- | -------- | ------- |
| column   | Column data            | Column   | -       |
| settings | Grouping configuration | Settings | -       |

#### Settings

| Property | Description                                                         | Type                                                 | Default |
| -------- | ------------------------------------------------------------------- | ---------------------------------------------------- | ------- |
| type     | Type of grouping                                                    | 'value', 'ranges', 'interval', 'disabled', undefined | -       |
| ranges   | Array of ranges if grouping by ranges is selected                   | Range[]                                              |`false`  |
| interval | Number of items in single group if grouping by interval is selected | number,`false`                                       |`false`  |

#### Range

| Property | Description             | Type                                     | Default |
| -------- | ----------------------- | ---------------------------------------- | ------- |
| from     | Lower boundary of range | {value: React.ReactText, error: string } | -       |
| to       | Upper boundary of range | {value: React.ReactText, error: string } | -       |

#### Texts

| Property                   | Description                                      | Type                     | Default                                                      |
| -------------------------- | ------------------------------------------------ | ------------------------ | ------------------------------------------------------------ |
| title                      | Manage columns title                             | string / React.ReactNode | 'Manage columns'                                             |
| searchPlaceholder          | Search input placeholder                         | string                   | 'Search'                                                     |
| searchClearTooltip         | Clear label                                      | string / React.ReactNode | 'Clear'                                                      |
| noResults                  | No search results placeholder                    | string / React.ReactNode | 'No results'                                                 |
| searchResults              | Search results title                             | string / React.ReactNode | 'Search results'                                             |
| visible                    | Visible group label                              | string / React.ReactNode | 'Visible'                                                    |
| hidden                     | Hidden group label                               | string / React.ReactNode | 'Hidden'                                                     |
| saveView                   | Save button label                                | string / React.ReactNode | 'Save view'                                                  |
| cancel                     | Cancel button label                              | string / React.ReactNode | 'Cancel'                                                     |
| apply                      | Apply button label                               | string / React.ReactNode | 'Apply'                                                      |
| fixedLeft                  | Fixed left label                                 | string / React.ReactNode | 'Fixed left'                                                 |
| fixedRight                 | Fixed right label                                | string / React.ReactNode | 'Fixed right'                                                |
| group                      | Group label                                      | string / React.ReactNode | 'Group'                                                      |
| clear                      | Clear label                                      | string / React.ReactNode | 'Clear'                                                      |
| viewName                   | Label of new view description input field        | string / React.ReactNode | 'View name'                                                  |
| viewDescription            | Label of new view name input field               | string / React.ReactNode | 'Description'                                                |
| viewNamePlaceholder        | Placeholder of new name input field              | string                   | 'Name'                                                       |
| viewDescriptionPlaceholder | Placeholder of new description input field       | string                   | 'Description'                                                |
| mustNotBeEmpty             | Must not be empty error message                  | string / React.ReactNode | 'Must not be empty'                                          |
| switchOn                   | Switch on tooltip                                | string / React.ReactNode | 'Switch on'                                                  |
| switchOff                  | Switch off tooltip                               | string / React.ReactNode | 'Switch off'                                                 |
| groupByValue               | Group by value option                            | string / React.ReactNode | 'Group by value'                                             |
| groupByRanges              | Group by ranges option                           | string / React.ReactNode | 'Group by ranges'                                            |
| groupByIntervals           | Group by intervals option                        | string / React.ReactNode | 'Group by intervals'                                         |
| groupDisabled              | Disable grouping option                          | string / React.ReactNode | 'Group disabled'                                             |
| groupTitle                 | Title of gropu settings modal                    | string / React.ReactNode | 'Table content group'                                        |
| selectPlaceholder          | Select grouping type placeholder                 | string                   | 'Select'                                                     |
| intervalPlaceholder        | Set interval input placeholder                   | string                   | 'Set interval'                                               |
| groupingType               | Select grouping type label                       | string / React.ReactNode | 'Set grouping type'                                          |
| groupingTypeTooltip        | Grouping type label tooltip                      | string / React.ReactNode | More details about grouping                                  |
| from                       | Range input label - from                         | string / React.ReactNode | 'From'                                                       |
| to                         | Range input label - to                           | string / React.ReactNode | 'To'                                                         |
| remove                     | Remove range tooltip                             | string / React.ReactNode | 'Remove'                                                     |
| addRange                   | Label of add range button                        | string / React.ReactNode | 'Add more'                                                   |
| errorEmptyRange            | Error message for empty range row                | string / React.ReactNode | 'You should fill one of these fields'                        |
| errorEmptyFromField        | Error message for empty 'From' field             | string / React.ReactNode | 'Only the "From" field in the first range can be left blank' |
| errorEmptyToField          | Error message for empty 'To' field               | string / React.ReactNode | 'Only the "To" field in the last range can be left blank'    |
| errorChooseGrouping        | Error message for non selection type of grouping | string / React.ReactNode | 'Error - Choose type of grouping'                            |
| errorInterval              | Error message for invalid interval value         | string / React.ReactNode | 'Error - Provide correct interval value'                     |
| errorRange                 | Error message for invalid range value            | string / React.ReactNode | 'Error - Provide correct value'                              |
