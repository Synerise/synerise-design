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
```

## Usage

```
import OrderedList from '@synerise/ds-ordered-list'

<OrderedList />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-ordered-list--default"></iframe>

## API

| Property  | Description                  | Type              | Default |
| --------- | ---------------------------- | ----------------- | ------- |
| listStyle | style to pick unordered list | string            | -       |
| index     | set number of ordered list   | number            | -       |
| id        | name of the item             | string            | -       |
| subMenu   | items list                   | OrderedListItem[] | -       |
| label     | label contains text          | string            | -       |
| suffixel  | place to set item            | React.ReactNode   | -       |
| prefixel  | place to set item            | React.ReactNode   | -       |
