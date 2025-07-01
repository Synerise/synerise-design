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

| Property  | Description                  | Type                     | Default |
| --------- | ---------------------------- | ------------------------ | ------- |
| listStyle | style to pick unordered list | string                   | -       |
| index     | set number of ordered list   | number                   | -       |
| id        | name of the item             | string                   | -       |
| subMenu   | items list                   | OrderedListItem[]        | -       |
| label     | label contains text          | React.ReactNode / string | -       |
| suffixel  | place to set item            | React.ReactNode          | -       |
| prefixel  | place to set item            | React.ReactNode          | -       |
