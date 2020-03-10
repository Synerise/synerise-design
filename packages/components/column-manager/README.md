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

| Property         | Description                                                                             | Type                            | Default |
| ---------------- | --------------------------------------------------------------------------------------- | ------------------------------- | ------- |
| hide             | Specify a callback that will be called when a user clicks mask, close or cancel button. | Function                        | -       |
| visible          | Whether the ItemFilter is visible or not.                                               | boolean                         | false   |
| onSave           | Specify a callback that will be called when a user saves new view                       | (savedView: SavedView) => void; | -       |
| onApply          | Specify a callback that will be called when a user clicks on `Apply` button             | (columns: Column[]) => void     | -       |
| columns          | Current columns configuration                                                           | Column[]                        | []      |
| texts            | Object contains texts for buttons, title, confirms etc.                                 | Texts                           | -       |
| itemFilterConfig | ItemFilter config                                                                       | ItemFilter                      | -       |

#### Column

| Property | Description                                                | Type                                        | Default |
| -------- | ---------------------------------------------------------- | ------------------------------------------- | ------- |
| id       | Id of column                                               | string                                      | -       |
| name     | Name of column                                             | string                                      | -       |
| visible  | Whether the column is visibile in table view               | boolean                                     | -       |
| type     | Type of data in column                                     | 'text', 'number', 'date', 'boolean', 'list' | -       |
| fixed    | Whether the column has fixed position or not in table view | 'left' , 'right'                            | -       |

#### Texts

| Property                   | Description                                | Type   | Default             |
| -------------------------- | ------------------------------------------ | ------ | ------------------- |
| title                      | Manage columns title                       | string | 'Manage columns'    |
| searchPlaceholder          | Search input placeholder                   | string | 'Search'            |
| noResults                  | No search results placeholder              | string | 'No results'        |
| visible                    | Visible group label                        | string | 'Visible'           |
| hidden                     | Hidden group label                         | string | 'Hidden'            |
| saveView                   | Save button label                          | string | 'Save view'         |
| cancel                     | Cancel button label                        | string | 'Cancel'            |
| apply                      | Apply button label                         | string | 'Apply'             |
| fixedLeft                  | Fixed left label                           | string | 'Fixed left'        |
| fixedRight                 | Fixed right label                          | string | 'Fixed right'       |
| clear                      | Clear label                                | string | 'Clear'             |
| viewDescription            | Label of new view name input field         | string | 'Description'       |
| viewName                   | Label of new view description input field  | string | 'View name'         |
| viewNamePlaceholder        | Placeholder of new name input field        | string | 'Name'              |
| viewDescriptionPlaceholder | Placeholder of new description input field | string | 'Description'       |
| mustNotBeEmpty             | Must not be empty error message            | string | 'Must not be empty' |
| searchClearTooltip         | Clear label                                | string | 'Clear'             |
