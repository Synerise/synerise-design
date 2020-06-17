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
| ----------------  | --------------------------------------------------------------------------------------- | -------------------------------                           | -------   |
| hide              | Specify a callback that will be called when a user clicks mask, close or cancel button. | Function                                                  | -         |
| visible           | Whether the ColumnManager is visible or not.                                            | boolean                                                   | false     |
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

| Property      | Description                                                | Type                                        | Default   |
| --------      | ---------------------------------------------------------- | ------------------------------------------- | -------   |
| meta          | Name and description of saved view                         | {name: string; description: string}         | {}        |
| groupSettings | Configuration of grouped data                              | GroupSettings                               | undefined |
| columns       | Current columns configuration                              | Column[]                                    | []        |


#### GroupSettings

| Property | Description                                                | Type                                        | Default |
| -------- | ---------------------------------------------------------- | ------------------------------------------- | ------- |
| column   | Column data                                                | Column                                      | -       |
| settings | Grouping configuration                                     | Settings                                    | -       |

#### Settings

| Property | Description                                                         | Type                                                 | Default | 
| -------- | ----------------------------------------------------------          | -------------------------------------------          | ------- | 
| type     | Type of grouping                                                    | 'value', 'ranges', 'interval', 'disabled', undefined | -       | 
| ranges   | Array of ranges if grouping by ranges is selected                   | Range[]                                              | false   | 
| interval | Number of items in single group if grouping by interval is selected | number, false                                        | false   |

#### Range

| Property | Description                                                | Type                                        | Default | 
| -------- | ---------------------------------------------------------- | ------------------------------------------- | ------- | 
| from     | Lower boundary of range                                    | {value: React.ReactText, error: string }    | -       | 
| to       | Upper boundary of range                                    | {value: React.ReactText, error: string }    | -       |  


#### Texts

| Property                   | Description                                      | Type   | Default                                                      | 
| -------------------------- | ------------------------------------------       | ------ | -------------------                                          | 
| title                      | Manage columns title                             | string | 'Manage columns'                                             | 
| searchPlaceholder          | Search input placeholder                         | string | 'Search'                                                     | 
| searchClearTooltip         | Clear label                                      | string | 'Clear'                                                      | 
| noResults                  | No search results placeholder                    | string | 'No results'                                                 | 
| searchResults              | Search results title                             | string | 'Search results'                                             | 
| visible                    | Visible group label                              | string | 'Visible'                                                    | 
| hidden                     | Hidden group label                               | string | 'Hidden'                                                     | 
| saveView                   | Save button label                                | string | 'Save view'                                                  | 
| cancel                     | Cancel button label                              | string | 'Cancel'                                                     | 
| apply                      | Apply button label                               | string | 'Apply'                                                      | 
| fixedLeft                  | Fixed left label                                 | string | 'Fixed left'                                                 | 
| fixedRight                 | Fixed right label                                | string | 'Fixed right'                                                | 
| group                      | Group label                                      | string | 'Group'                                                      | 
| clear                      | Clear label                                      | string | 'Clear'                                                      | 
| viewName                   | Label of new view description input field        | string | 'View name'                                                  | 
| viewDescription            | Label of new view name input field               | string | 'Description'                                                | 
| viewNamePlaceholder        | Placeholder of new name input field              | string | 'Name'                                                       | 
| viewDescriptionPlaceholder | Placeholder of new description input field       | string | 'Description'                                                | 
| mustNotBeEmpty             | Must not be empty error message                  | string | 'Must not be empty'                                          | 
| switchOn                   | Switch on tooltip                                | string | 'Switch on'                                                  | 
| switchOff                  | Switch off tooltip                               | string | 'Switch off'                                                 | 
| groupByValue               | Group by value option                            | string | 'Group by value'                                             | 
| groupByRanges              | Group by ranges option                           | string | 'Group by ranges'                                            | 
| groupByIntervals           | Group by intervals option                        | string | 'Group by intervals'                                         | 
| groupDisabled              | Disable grouping option                          | string | 'Group disabled'                                             | 
| groupTitle                 | Title of gropu settings modal                    | string | 'Table content group'                                        | 
| selectPlaceholder          | Select grouping type placeholder                 | string | 'Select'                                                     | 
| intervalPlaceholder        | Set interval input placeholder                   | string | 'Set interval'                                               | 
| groupingType               | Select grouping type label                       | string | 'Set grouping type'                                          | 
| groupingTypeTooltip        | Grouping type label tooltip                      | string | More details about grouping                                  | 
| from                       | Range input label - from                         | string | 'From'                                                       | 
| to                         | Range input label - to                           | string | 'To'                                                         | 
| remove                     | Remove range tooltip                             | string | 'Remove'                                                     | 
| addRange                   | Label of add range button                        | string | 'Add more'                                                   | 
| errorEmptyRange            | Error message for empty range row                | string | 'You should fill one of these fields'                        | 
| errorEmptyFromField        | Error message for empty 'From' field             | string | 'Only the "From" field in the first range can be left blank' | 
| errorEmptyToField          | Error message for empty 'To' field               | string | 'Only the "To" field in the last range can be left blank'    | 
| errorChooseGrouping        | Error message for non selection type of grouping | string | 'Error - Choose type of grouping'                            | 
| errorInterval              | Error message for invalid interval value         | string | 'Error - Provide correct interval value'                     | 
| errorRange                 | Error message for invalid range value            | string | 'Error - Provide correct value'                              | 
