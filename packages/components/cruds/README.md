---
id: cruds
title: Cruds
---

Cruds UI Component

## Installation

```
npm i @synerise/ds-cruds
or
yarn add @synerise/ds-cruds
```

## Usage

```
import Cruds from '@synerise/ds-cruds'

<Cruds
    onAdd={handleAdd}
    onDelete={handleDelete}
    onRemove={handleRemove}
    onMove={handleMove}
    onEdit={handleEdit}
    onDuplicate={handleDuplicate}
    addTooltip={'Add'}
    deleteTooltip={'Delete'}
    duplicateTooltip={'Duplicate'}
    editTooltip={'Edit'}
    moveTooltip={'Move'}
    removeTooltip={'Remove'}
/>

```

## Usage SingleAction

```
import SingleAction from '@synerise/ds-cruds/dist/SingleAction'
<SingleAction
  className="settings"
  title={'Settings'}
  icon={<Settings2S />}
  onClick={handleClick}
/>
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-cruds--default"></iframe>

## API

| Property         | Description                                                                  | Type                              | Default |
| ---------------- | ---------------------------------------------------------------------------- | --------------------------------- | ------- |
| addTooltip       | Tooltip of the add button                                                    | React.ReactNode / string          | -       |
| duplicateTooltip | Tooltip of the duplicate button                                              | React.ReactNode / string          | -       |
| deleteTooltip    | Tooltip of the delete button (which has a different icon than remove button) | React.ReactNode / string          | -       |
| editTooltip      | Tooltip of the edit button                                                   | React.ReactNode / string          | -       |
| moveTooltip      | Tooltip of the move button                                                   | React.ReactNode / string          | -       |
| removeTooltip    | Tooltip of the remove button                                                 | React.ReactNode / string          | -       |
| previewTooltip   | Tooltip of the preview button                                                | React.ReactNode / string          | -       |
| onAdd            | Callback executed after clicking the add button.                             | (event: React.MouseEvent) => void | -       |
| onDuplicate      | Callback executed after clicking the duplicate button.                       | (event: React.MouseEvent) => void | -       |
| onDelete         | Callback executed after clicking the delete button.                          | (event: React.MouseEvent) => void | -       |
| onEdit           | Callback executed after clicking the edit button.                            | (event: React.MouseEvent) => void | -       |
| onMove           | Callback executed after clicking the move button.                            | (event: React.MouseEvent) => void | -       |
| onRemove         | Callback executed after clicking the remove button.                          | (event: React.MouseEvent) => void | -       |
| onPreview        | Callback executed after clicking the preview button.                         | (event: React.MouseEvent) => void | -       |
