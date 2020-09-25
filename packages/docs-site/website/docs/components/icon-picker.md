---
id: icon-picker
title: IconPicker
---

IconPicker UI Component

## Installation

```
npm i @synerise/ds-icon-picker
or
yarn add @synerise/ds-icon-picker
```

## Usage

```
import IconPicker from '@synerise/ds-icon-picker'

<IconPicker />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-icon-picker--default"></iframe>

## API

| Property    | Description                                         | Type                                | Default |
| ----------- | --------------------------------------------------- | ----------------------------------- | ------- |
| button      | Button Node                                         | React.ReactElement                  | -       |
| data        | Icon list                                           | FilterElement[]                     | -       |
| noResultMsg | Node displayed when no items matches searched query | React.ReactNode                     | -       |
| onSelect    | Action on icon select                               | (val: React.ReactNode) => void      | -       |
| placeholder | Input placeholder                                   | string                              | -       |
| trigger     | Trigger type                                        | `['click', 'hover', 'contextMenu']` | []      |
