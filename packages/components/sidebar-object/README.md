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

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| avatar        | Add icon of avatar      | React.ReactNode            | - |
| name          | Name of the inline edit | string                     | - |
| headerPreffix | Show the arrowLeftIcon  | React.ReactNode            | - |
| headerTabs    | Tabs to click and pick  | TabItem                    | - |
| inputObject   | Panel of content        | object                     | - |
| contentTags   | Panel of tags           | React.ReactNode            | - |
| folders       | Dropdown content        | FolderItem                 | - |
| onEdit        | Icon in dropdown        | (inputObject:object) => void | - |
| onDuplicate   | Icon in dropdown        | (inputObject:object) => void | - |
| onMove        | Icon in dropdown        | (inputObject:object) => void | - |
| onDelete      | Icon in dropdown        | (inputObject:object) => void | - |
| onId          | Icon in dropdown        | (inputObject:object) => void | - |
| parentFolder  | text picked in button   | FolderItem                 | - |
| texts         | Group of texts          | HeaderTexts                | - |