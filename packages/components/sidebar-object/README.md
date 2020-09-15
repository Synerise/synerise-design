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

| Property      | Description                                         | Type                         | Default |
| ------------- | --------------------------------------------------- | ---------------------------- | ------- |
| avatar        | Add icon of avatar                                  | React.ReactNode              | -       |
| headerPreffix | Element rendered on the left side of the header     | React.ReactNode              | -       |
| headerTabs    | Tabs component to switch between content            | TabItem                      | -       |
| inputObject   | Panel of content                                    | object                       | -       |
| contentTags   | Panel of tags                                       | React.ReactNode              | -       |
| folders       | List of folders an object can be moved to           | FolderItem                   | -       |
| onEdit        | Icon in dropdown                                    | (inputObject:object) => void | -       |
| onDuplicate   | Icon in dropdown                                    | (inputObject:object) => void | -       |
| onMove        | Icon in dropdown                                    | (inputObject:object) => void | -       |
| onDelete      | Icon in dropdown                                    | (inputObject:object) => void | -       |
| onId          | Callback executed after clicking on the object's ID | (inputObject:object) => void | -       |
| parentFolder  | Parent folder an object belongs to                  | FolderItem                   | -       |
| texts         | Group of texts                                      | HeaderTexts                  | -       |
| onCloseClick  | Prop to close Drawer                                | void                         | -       |
| inputObjectId | Id of an object's                                   | string                       | -       |