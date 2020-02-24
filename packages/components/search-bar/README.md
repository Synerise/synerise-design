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

| Property       | Description                              | Type                        | Default |
| -------------- | ---------------------------------------- | --------------------------- | ------- |
| onSearchChange | Callback when user input                 | function                    | -       |
| onClearInput   | Callback when user press x               | function                    | -       |
| placeholder    | Placeholder                              | string `or` React.ReactNode | -       |
| className      | Optional class                           | string                      | -       |
| clearTooltip   | Tooltip description above x btn          | string `or` React.ReactNode | -       |
| value          | The input content value                  | string                      | -       |
| iconLeft       | Place for optional icon on the left side | React.ReactNode             | -       |
| autofocus      | Whether the input is focused             | boolean                     | false   |
| disabled       | Whether the input is disabled.           | boolean                     | -       |
