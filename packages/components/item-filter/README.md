---
id: item-filter
title: ItemFilter
---

ItemFilter UI Component

## Installation

```
npm i @synerise/ds-item-filter
or
yarn add @synerise/ds-item-filter
```

## Usage

```
import ItemFilter from '@synerise/ds-item-filter'

<ItemFilter
    visible={true}
    hide={() => {}}
    texts={TEXTS}
    removeItem={(props) => {}}
    editItem={(props) => {}}
    selectItem={(props) => {}}
    duplicateItem={(props) => {}}
    selectedItemId="0001"
    categories={CATEGORIES}
    fetchData={(category) => {}}
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-item-filter--default"></iframe>

## API

#### ItemFilter

| Property       | Description                                                                     | Type                                     | Default   |
| -------------- | ------------------------------------------------------------------------------- | ---------------------------------------- | --------- |
| visible        | Whether the ItemFilter is visible or not.                                       | boolean                                  | `false`   |
| hide           | Specify a callback that will be called when a user clicks mask or close button. | () => void                               | -         |
| removeItem     | Specify a callback that will be called when a user removes list item            | (`{ id: ReactText }`) => void                | -         |
| editItem       | Specify a callback that will be called when a user change name of list item     | (`{ id: ReactText, name: string }`) => void | -         |
| duplicateItem  | Specify a callback that will be called when a user duplicates list item         | (`{ id: ReactText }`) => void               | -         |
| selectItem     | Specify a callback that will be called when a user select list item             | (`{ id: ReactText }`) => void               | -         |
| categories     | Array of categories                                                             | Category[]                               | []        |
| selectedItemId | Id of selected item                                                             | `string \| undefined`                    | undefined |
| texts          | Object contains texts for buttons, title, confirms etc.                         | Texts                                    | -         |
| maxToShowItems | Accepted in type but not implemented — has no effect                            | `number`                                 | -         |
| search         | Optional search config; renders a SearchBar when provided                       | `{ onChange: (value: string) => void; onClear: () => void; value: string }` | -    |
| fetchData      | Callback invoked by infinite-scroll when more items are needed                  | `(category: Category) => void`           | -         |
| loading        | Whether the list is in a loading state                                          | `boolean`                                | -         |

#### Search

| Property | Description                                           | Type                    | Default |
| -------- | ----------------------------------------------------- | ----------------------- | ------- |
| onChange | Callback called, when value of search input changes   | (value: string) => void | -       |
| onClear  | Callback called, when user click on clear search icon | () => void              | -       |
| value    | Current value of search input                         | string                  | -       |

#### Category

| Property | Description                              | Type    | Default |
| -------- | ---------------------------------------- | ------- | ------- |
| label    | Name of category                         | string  | ''      |
| hasMore  | Whether the category contains more items | boolean | -       |
| items    | Array of list items                      | Item[]  | []      |

#### Item

| Property      | Description                             | Type    | Default |
| ------------- | --------------------------------------- | ------- | ------- |
| id            | Id of item                              | `string \| number` (`ReactText`) | -       |
| canUpdate?    | Whether the item can be edited          | `boolean`                        | -       |
| canDelete?    | Whether the item can be deleted         | `boolean`                        | -       |
| canDuplicate? | Whether the item can be duplicated      | `boolean`                        | -       |
| name          | Name of item                            | `string`                         | -       |
| description?  | Description of item                     | `string`                         | -       |
| user?         | Object contains information about user  | `User`                           | -       |
| created?      | Item creation timestamp                 | `string`                         | -       |
| categories    | Category labels the item belongs to     | `string[]`                       | -       |

#### User

| Property   | Description | Type   | Default |
| ---------- | ----------- | ------ | ------- |
| avatar_url? | Link to avatar image | `string` | -       |
| firstname?  | First name           | `string` | -       |
| lastname?   | Last name            | `string` | -       |
| email?      | Email address        | `string` | -       |

#### Texts

| Property                      | Description                         | Type                     | Default                                                                                                                |
| ----------------------------- | ----------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| activateItemTitle             | Popconfirm title                    | string / React.ReactNode | 'By activating this filter, you will cancel your unsaved filter settings',                                             |
| activate                      | Activate button label               | string / React.ReactNode | 'Activate',                                                                                                            |
| cancel                        | Cancel button label                 | string / React.ReactNode | 'Cancel',                                                                                                              |
| deleteConfirmationTitle       | Delete confirmation title           | string / React.ReactNode | 'Delete filter',                                                                                                       |
| deleteConfirmationDescription | Delete confirmation description     | string / React.ReactNode | 'Deleting this filter will permanently remove it from templates library. All tables using this filter will be reset.', |
| deleteConfirmationYes         | Label of delete confirmation button | string / React.ReactNode | 'Delete'                                                                                                               |
| deleteConfirmationNo          | Label of delete cancellation button | string / React.ReactNode | 'Cancel'                                                                                                               |
| itemActionRename              | Label of rename item action         | string / React.ReactNode | 'Rename'                                                                                                               |
| itemActionDuplicate           | Label of duplicate item action      | string / React.ReactNode | 'Duplicate'                                                                                                            |
| itemActionDelete              | Label of delete item action         | string / React.ReactNode | 'Delete'                                                                                                               |
| noResults                     | No results information              | string / React.ReactNode | 'No results',                                                                                                          |
| searchPlaceholder             | Placeholder of search input         | string                   | 'Search',                                                                                                              |
| title                         | Title of ItemFilter drawer          | string / React.ReactNode | 'Filter',                                                                                                              |
| searchClearTooltip            | Tooltip copy on clear search button | string / React.ReactNode | 'Clear',                                                                                                               |
