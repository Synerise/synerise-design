---
id: tabs
title: Tabs
---

Responsive Tabs UI Component

## Installation
```
npm i @synerise/ds-tabs
or
yarn add @synerise/ds-tabs
```

## Usage
```
import Tabs from '@synerise/ds-tabs'

<Tabs tabs={[{label: 'Tab 1'}, {label: 'Tab 2}]]} activeTab={0} handleTabClick={() => {}} />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-tabs--default"></iframe>

## API

### Tabs

| Property          | Description                                   | Type              | Default   |
| ----------------- | --------------------------------------------- | ----------------- | --------- |
| activeTab         | Active tab index                              | number            | -         |
| tabs              | Array of tabs                                 | Tab[]             | []        |
| handleTabClick    | Callback fired when user clicks on the tab    | (index) => {}     | -         |
| configuration     | Shows additional position in tabs dropdown    | Configuration     | -         |

### Tab

| Property          | Description               | Type      | Default   |
| ----------------- | ------------------------- | --------- | --------- |
| label             | Label of tab              | string    | -         |
| icon              | tab icon                  | Icon      | -         |
| disabled          | Flag of disabled tabs     | boolean   | false     |

#### Configuration

| Property  | Description                                                   | Type      | Default   |
| --------- | ------------------------------------------------------------- | --------- | --------- |
| label     | Label of configuration button                                 | string    | -         |
| action    | Callback fired when user clicks on the configuration button   | Icon      | -         |
