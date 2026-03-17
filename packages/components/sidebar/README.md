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

| Property          | Description                                                                              | Type                                  | Default |
| ----------------- | ---------------------------------------------------------------------------------------- | ------------------------------------- | ------- |
| children          | Place for Panel element                                                                  | React.ReactNode                       | -       |
| order             | Panel IDs in display order; enables sortable mode when combined with `onChangeOrder`     | string[]                              | -       |
| onChangeOrder     | Called on drag and drop fired; must be set alongside `order` to enable drag mode         | (order: string \| string[]) => void   | -       |
| defaultActiveKey  | Initially open panel IDs                                                                 | string[]                              | -       |
| activeKey         | Controlled open panels                                                                   | string \| string[]                    | -       |
| onChange          | Called when panels open/close                                                            | (keys: string \| string[]) => void    | -       |
| getPopupContainer | Determines where to render the drag overlay                                              | (elem: HTMLDivElement) => HTMLElement | -       |
| className         | Added to the Ant Collapse                                                                | string                                | -       |

#### Panel

| Property    | Description                                          | Type                     | Default |
| ----------- | ---------------------------------------------------- | ------------------------ | ------- |
| id          | Panel unique id (required)                           | string                   | -       |
| header      | Panel header name                                    | React.ReactNode / string | -       |
| children    | Panel content                                        | React.ReactNode / string | -       |
| forceRender | Render body even when collapsed                      | boolean                  | -       |

#### SidebarWithButton

| Property    | Description                   | Type           | Default |
| ----------- | ----------------------------- | -------------- | ------- |
| dataSource  | data of all items in dropdown | MenuItemProps[] | -       |
| buttonLabel | prop to show text of button   | string         | -       |
| title       | prop to show title            | string         | -       |
