---
id: sidebar-object
title: SidebarObject
---

SidebarObject UI Component

## Installation
```
npm i @synerise/ds-sidebar-object
or
yarn add @synerise/ds-sidebar-object
```

## Usage
```
import SidebarObject from '@synerise/ds-sidebar-object'

<SidebarObject />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-sidebar-object--default"></iframe>

## API

| Property       | Description                                         | Type                         | Default |
| -------------- | --------------------------------------------------- | ---------------------------- | ------- |
| avatar         | Add icon of avatar                                  | React.ReactNode              | -       |
| headerPreffix  | Element rendered on the left side of the header     | React.ReactNode              | -       |
| headerTabs     | Tabs component to switch between content            | TabItem                      | -       |
| inputObject    | Panel of content                                    | object                       | -       |
| onArrowUp      | Callback executed to show arrowUp icon              | void                         | -       |
| onArrowDown    | Callback executed to show arrowUp icon              | void                         | -       |
| onEdit         | Callback executed when clicked on edit icon         | (inputObject:object) => void | -       |
| onDuplicate    | Callback executed when clicked on duplicate icon    | (inputObject:object) => void | -       |
| onMove         | Callback executed when clicked on move icon         | (inputObject:object) => void | -       |
| onDelete       | Callback executed when clicked on delete icon       | (inputObject:object) => void | -       |
| onId           | Callback executed after clicking on the object's ID | (inputObject:object) => void | -       |
| onScrollbar    | Callback executed when scroll                       | boolean                      | -       |
| texts          | Group of texts                                      | HeaderTexts                  | -       |
| onCloseClick   | Prop to close Drawer                                | void                         | -       |
| inputObjectId  | Id of an object's                                   | string                       | -       |
| handleTabClick | Callback executed when you click on Tab             | (index: number) => void      |