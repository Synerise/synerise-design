---
id: search
title: Search
---

Search UI Component

## Installation

```
npm i @synerise/ds-search
or
yarn add @synerise/ds-search
```

## Usage

```
import Search from '@synerise/ds-search'

<Search />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-search--default"></iframe>

## API

| Property            | Description                   | Type       | Default |
| ------------------- | ----------------------------- | ---------- | ------- |
| placeholder         | Placeholder                   | string     | -       |
| filterTitle         | Filter list title             | string     | -       |
| recentTitle         | Recent list title             | string     | -       |
| resultTitle         | Result list title             | string     | -       |
| clearTooltip        | Clear button tooltip text     | string     | -       |
| filterData          | Data of filters               | object[][] | -       |
| recent              | Data of recent chosen values  | object[][] | -       |
| results             | Data of filter values         | object[][] | -       |
| onValueChange       | Callback when user input      | function   | -       |
| value               | The input content value       | string     | -       |
| filterValue         | Chosen filter type            | string     | -       |
| onFilterValueChange | Callback when set filter type | function   | -       |
