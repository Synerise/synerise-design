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
    items={ITEMS}
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-item-filter--default"></iframe>

## API

#### ItemFilter

| Property       | Description                                                                     | Type                                   | Default |
| -------------- | ------------------------------------------------------------------------------- | -------------------------------------- | ------- |
| visible        | Whether the ItemFilter is visible or not.                                       | boolean                                | false   |
| hide           | Specify a callback that will be called when a user clicks mask or close button. | Function                               | -       |
| removeItem     | Specify a callback that will be called when a user removes list item            | Function({ id: string })               | -       |
| editItem       | Specify a callback that will be called when a user change name of list item     | Function({ id: string, name: string }) | -       |
| duplicateItem  | Specify a callback that will be called when a user duplicates list item         | Function({ id: string })               | -       |
| selectItem     | Specify a callback that will be called when a user select list item             | Function({ id: string })               | -       |
| items          | Array of list items                                                             | Item[]                                 | []      |
| categories     | Array of categories                                                             | Category[]                             | []      |
| selectedItemId | Id of selected item                                                             | string                                 | null    |
| texts          | Object contains texts for buttons, title, confirms etc.                         | Texts                                  | -       |

#### Category

| Property | Description      | Type   | Default |
| -------- | ---------------- | ------ | ------- |
| label    | Name of category | string | ''      |

#### Item

| Property      | Description                             | Type    | Default |
| ------------- | --------------------------------------- | ------- | ------- |
| id            | Id of item                              | string  | -       |
| canUpdate?    | Whether the item can be edited          | boolean | false   |
| canDelete?    | Whether the item can be deleted         | boolean | false   |
| canDuplicate? | Whether the item can be duplicated      | boolean | false   |
| name          | Name of item                            | string  | -       |
| description?  | Description of item                     | string  | -       |
| user          | Object contains informations about user | User    | -       |
| created       | Date                                    | string  | -       |

#### User

| Property   | Description | Type   | Default |
| ---------- | ----------- | ------ | ------- |
| avatar_url | Link avatar | string | -       |
| firstname  | First name  | string | -       |
| lastname   | Last name   | string | -       |
