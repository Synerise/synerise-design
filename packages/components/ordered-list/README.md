---
id: ordered-list
title: OrderedList
---

OrderedList UI Component

## Installation

```
npm i @synerise/ds-ordered-list
or
yarn add @synerise/ds-ordered-list
or
pnpm add @synerise/ds-ordered-list
```

## Usage

```
import OrderedList from '@synerise/ds-ordered-list'

<OrderedList />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-ordered-list--default"></iframe>

## API

### OrderedList

| Property       | Description                                                      | Type                            | Default |
| -------------- | ---------------------------------------------------------------- | ------------------------------- | ------- |
| data           | Array of items to render                                         | OrderedListItem[]               | -       |
| indexFormatter | Custom renderer for the item index; falls back to the raw index  | (index: number) => ReactNode    | -       |
| listStyle      | CSS list-style-type value; defaults to `none` when not provided  | string                          | -       |
| text           | Optional label rendered above the list                           | React.ReactNode                 | -       |

### OrderedListItem

| Property     | Description                                              | Type                                | Default |
| ------------ | -------------------------------------------------------- | ----------------------------------- | ------- |
| id           | Unique item identifier (used as React key)               | string                              | -       |
| index        | Index value passed to indexFormatter                     | number                              | -       |
| label        | Item content                                             | React.ReactNode                     | -       |
| prefixel     | Content rendered before the label                        | React.ReactNode                     | -       |
| suffixel     | Content rendered after the label                         | React.ReactNode                     | -       |
| subMenu      | Nested child items                                       | OrderedListItem[]                   | -       |
| subMenuProps | Props forwarded to the nested OrderedList (except data)  | Omit\<OrderedListProps, 'data'\>    | -       |
| listStyle    | CSS list-style-type for the nested list                  | string                              | -       |
| text         | Header label for the nested list                         | React.ReactNode                     | -       |
