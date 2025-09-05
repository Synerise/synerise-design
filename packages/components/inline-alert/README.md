---
id: inline-alert
title: InlineAlert
---

InlineAlert UI Component

## Installation
```
npm i @synerise/ds-inline-alert
or
yarn add @synerise/ds-inline-alert
```

## Usage
```
import InlineAlert from '@synerise/ds-inline-alert'

<InlineAlert />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-inline-alert--default"></iframe>

## API

| Property     | Description                                                          | Type              | Default   |
| ------------ | -------------------------------------------------------------------- | ----------------- | --------- |
| type         | Type of Alert styles, options: `success`, `info`, `warning`, `error` | `string`          | `warning` |
| message      | Message of Inline Alert                                              | `React.ReactNode` | -         |
| disabled     | prop to set disabled icon                                            | `boolean`         | -         |
| withEmphasis | prop to show bolder text                                             | `React.ReactNode` | -         |
| withLink     | prop to show highlited text                                          | `React.ReactNode` | -         |
| hoverButton  | prop to set hover state button                                       | `boolean`         | -         |
| customIcon   | prop to set custom icon                                              | `React.ReactNode` | -         |
