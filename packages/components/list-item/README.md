---
id: list-item
title: ListItem
---

ListItem UI Component

## Installation
```
npm i @synerise/ds-list-item
or
yarn add @synerise/ds-list-item
```

## Usage
```
import ListItem from '@synerise/ds-list-item'

<ListItem />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-list-item--default"></iframe>

## API


| Property                    | Description               | Type               | Default    |
|-----------------------------|---------------------------|--------------------|------------|
| className                   | Extra styles              | string             | -          |
| children                    | ListItem content          | React.ReactNode    | -          |
| icon                        | Icon for ListItem         | React.ReactNode    | -          |
| switch                      | Switch for ListItem       | boolean            | false      |
| title                       | Text for tooltip          | string             | -          |
| danger                      | Danger color for ListItem | boolean            | false      |
| prefixCls                   | Adjust base className     | string             | 'ant-menu' |
| direction                   | Text direction            | 'ltr' &#124; 'rtl' | 'ltr'      | -       |
| disableListItemTitleTooltip | Disable tooltip           | boolean            | true       |
| noHover                     | Disable hover             | boolean &#124; undefined | false      | -       |
| size                        | ListItem size             | 'default' &#124; 'large' | default    | -       |