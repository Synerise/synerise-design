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

| Property    | Description           | Type       | Default |
| ----------- | --------------------- | ---------- | ------- |
| button      | Button Node           | React.Node | -       |
| onSelect    | Action on icon select | () => void | -       |
| data        | Icon list             | Array      | -       |
| trigger     | Trigger type          | Array      | -       |
| placeholder | Input placeholder     | string     | -       |
