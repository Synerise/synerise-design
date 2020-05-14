---
id: sidebar
title: Sidebar
---

Sidebar UI Component

## Installation

```
npm i @synerise/ds-sidebar
or
yarn add @synerise/ds-sidebar
```

## Usage

```
import Sidebar from '@synerise/ds-sidebar'

<Sidebar />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-sidebar--default"></iframe>

## API

#### Sidebar

| Property         | Description                                | Type            | Default |
| ---------------- | ------------------------------------------ | --------------- | ------- |
| children         | Place for Panel element                    | React.ReactNode | -       |
| order            | Place for optional Array with render order | string[]        | -       |
| onChangeOrder    | Called on drag and drop fired              | function        | -       |
| defaultActiveKey | Place for optional default active panel    | `Array<string>`   | -       |

#### Panel

| Property | Description       | Type                        | Default |
| -------- | ----------------- | --------------------------- | ------- |
| header   | Panel header name | React.ReactNode `or` string | -       |
| children | Panel content     | React.ReactNode `or` string | -       |
| id       | Panel unique id   | string                      | -       |
