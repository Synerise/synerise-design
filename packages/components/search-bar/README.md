---
id: search-bar
title: SearchBar
---

SearchBar UI Component

## Installation

```
npm i @synerise/ds-search-bar
or
yarn add @synerise/ds-search-bar
```

## Usage

```
import SearchBar from '@synerise/ds-search-bar'

<SearchBar />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-search-bar--default"></iframe>

## API

| Property       | Description                              | Type                     | Default |
| -------------- | ---------------------------------------- | ------------------------ | ------- |
| autofocus      | Whether the input is focused             | boolean                  | `false` |
| className      | Optional class for the component         | string                   | -       |
| clearTooltip   | Tooltip description above clear button   | string / React.ReactNode | -       |
| disabled       | Whether the input is disabled.           | boolean                  | -       |
| iconLeft       | Place for optional icon on the left side | React.ReactNode          | -       |
| onSearchChange | Callback when user input                 | () => void               | -       |
| onClearInput   | Callback when user press clear button    | () => void               | -       |
| placeholder    | Placeholder                              | React.ReactNode          | -       |
| value          | The input content value                  | string                   | -       |
| autofocusDelay | Delay (ms) of the focus on search input  | number                   | 0       |
