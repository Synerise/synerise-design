---
id: editable-items-list
title: EditableItemsList
---

EditableItemsList UI Component

## Installation

```
npm i @synerise/ds-editable-items-list
or
yarn add @synerise/ds-editable-items-list
```

## Usage

```
import EditableItemsList from '@synerise/ds-editable-items-list'

<EditableItemsList />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-editable-items-list--default"></iframe>

## API

| Property         | Description                                                                                                        | Type                                     | Default |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- | ------- |
| renderRowElement | Function to render each row. Invoked with item index and item object.                                              | (index: number, item: T) => ReactElement | -       |
| items            | Array of items to be rendered, each should have a unique id.                                                       | T[]                                      | -       |
| addButtonLabel   | Text or custom component for the "Add" button.                                                                     | string \| ReactNode                      | -       |
| addButtonIcon    | Custom icon for the "Add" button.                                                                                  | ReactElement                             | -       |
| addButtonProps   | Additional props for the "Add" button. It can override default style.                                              | Partial&lt;ButtonProps&gt;               | -       |
| onAdd            | Callback function called when the "Add" button is clicked.                                                         | () => void                               | -       |
| minRowLength     | The minimum number of rows to display.                                                                             | number                                   | 1       |
| maxRowLength     | The maximum number of rows allowed.                                                                                | number                                   | -       |
| deleteTooltip    | Tooltip text for the delete button.                                                                                | string                                   | -       |
| onDelete         | Callback function called when a row's delete button is clicked. It receives the ID and index of the row to delete. | (id: string, index: number) => void      | -       |
