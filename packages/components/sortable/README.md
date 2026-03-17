---
id: sortable
title: Sortable
---

Sortable UI Component

## Installation

```
npm i @synerise/ds-sortable
or
yarn add @synerise/ds-sortable
```

## Usage

```
import Sortable from '@synerise/ds-sortable'

<Sortable />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-sortable--default"></iframe>

## API

### Sortable

| Property        | Description                                                                             | Type                              | Default |
| --------------- | --------------------------------------------------------------------------------------- | --------------------------------- | ------- |
| items           | Array of items to render (must have `id: string \| number`)                             | ItemType[]                        | -       |
| ItemComponent   | Component to render each item; receives item props + `index` and `dragHandleProps`      | ComponentType<WithIndex<ItemType>> | -       |
| onOrderChange   | Called after a drag completes with the new order                                        | (newOrder: ItemType[]) => void    | -       |
| axis            | Constrain drag direction; omit for free 2D movement                                    | 'x' / 'y'                        | -       |
| placeholderCss  | Custom styled-components CSS for the blue dashed drag placeholder                       | Interpolation<ThemeProps>         | -       |

### SortableContainer

Lower-level DnD context for custom layouts.

| Property      | Description                                              | Type                           | Default |
| ------------- | -------------------------------------------------------- | ------------------------------ | ------- |
| items         | Items with `id: string \| number`                        | ItemType[]                     | -       |
| axis          | Movement axis constraint                                 | 'x' / 'y'                     | -       |
| onOrderChange | Called after reorder with new order                      | (newOrder: ItemType[]) => void | -       |
