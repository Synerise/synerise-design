---
id: panel
title: Panel
---

Panel UI Component

## Installation
```
npm i @synerise/ds-panel
or
yarn add @synerise/ds-panel
```

## Usage
```
import Panel from '@synerise/ds-panel'

<Panel />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-panel--default"></iframe>

## API

### PanelProps

| Property   | Description                               | Type                        | Default |   |
|------------|-------------------------------------------|-----------------------------|---------|---|
| `radius`   | Border radius of the panel in pixels      | `number`                    | `8`     |   |
| `p`        | Padding applied to the panel              | `string \ number`           | `8`     |   |
| `children` | Panel content                             | `React.ReactNode`           | -       |   |
| `ref`      | Forward ref to the underlying DOM element | `React.Ref<HTMLDivElement>` | -       |   |


**Note:** Panel also accepts all standard `BoxProps` from `@rebass/grid`, including:
