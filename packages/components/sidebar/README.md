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

| Property          | Description                                 | Type                                  | Default |
| ----------------- | ------------------------------------------- | ------------------------------------- | ------- |
| children          | Place for Panel element                     | React.ReactNode                       | -       |
| order             | Place for optional Array with render order  | string[]                              | -       |
| onChangeOrder     | Called on drag and drop fired               | (order: string / string[])=>void      | -       |
| defaultActiveKey  | Place for optional default active panel     | string[]                              | -       |
| getPopupContainer | Determines where to render the drag overlay | (elem: HTMLDivElement) => HTMLElement | -       |

#### Panel

| Property | Description       | Type                     | Default |
| -------- | ----------------- | ------------------------ | ------- |
| header   | Panel header name | React.ReactNode / string | -       |
| children | Panel content     | React.ReactNode / string | -       |
| id       | Panel unique id   | string                   | -       |

#### SidebarButton

| Property    | Description                   | Type                   | Default |
| ----------- | ----------------------------- | ---------------------- | ------- |
| buttonLabel | prop to show text of button   | string                 | -       |
| title       | prop to show title            | string                 | -       |
| dataSource  | data of all items in dropdown | string / MenuItemProps | -       |
