---
id: unordered-list
title: UnorderedList
---

UnorderedList UI Component

## Installation

```
npm i @synerise/ds-unordered-list
or
yarn add @synerise/ds-unordered-list
```

## Usage

```
import UnorderedList from '@synerise/ds-unordered-list'

<UnorderedList />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-unordered-list--default"></iframe>

## API

### UnorderedList

| Property       | Description                                        | Type                           | Default |
| -------------- | -------------------------------------------------- | ------------------------------ | ------- |
| data           | Items to render                                    | `UnorderedListItem[]`          | -       |
| indexFormatter | Custom prefix renderer called with the item index  | `(index: number) => ReactNode` | -       |
| text           | Optional section label rendered above the list     | `React.ReactNode`              | -       |
| className      | CSS class on the root element                      | `string`                       | -       |

### UnorderedListItem

| Property     | Description                                           | Type                                    | Default |
| ------------ | ----------------------------------------------------- | --------------------------------------- | ------- |
| id           | Unique item identifier                                | `string`                                | -       |
| label        | Item display content                                  | `React.ReactNode`                       | -       |
| index        | Numeric index passed to `indexFormatter`              | `number`                                | -       |
| prefixel     | Rendered before the label                             | `React.ReactNode`                       | -       |
| suffixel     | Rendered after the label                              | `React.ReactNode`                       | -       |
| subMenu      | Child items; renders a nested list when present       | `UnorderedListItem[]`                   | -       |
| subMenuProps | Props forwarded to the nested `UnorderedList`         | `Omit<UnorderedListProps, 'data'>`      | -       |
| text         | Section label for the nested list                     | `React.ReactNode`                       | -       |
