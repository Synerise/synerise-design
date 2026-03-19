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
or
pnpm add @synerise/ds-panel
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

| Property          | Description                                                                                      | Type                        | Default     |
|-------------------|--------------------------------------------------------------------------------------------------|-----------------------------|-------------|
| `radius`          | Border radius of the panel in pixels                                                             | `number`                    | `8`         |
| `greyBackground`  | When `true`, renders with a drop shadow instead of a border                                      | `boolean`                   | -           |
| `label`           | Label text/node rendered above the panel via `FormFieldLabel`                                    | `React.ReactNode`           | -           |
| `tooltip`         | Tooltip content shown next to the label                                                          | `React.ReactNode`           | -           |
| `tooltipConfig`   | Extra configuration for the label tooltip                                                        | `TooltipProps`              | -           |
| `children`        | Panel content                                                                                    | `React.ReactNode`           | -           |
| `className`       | CSS class applied to the outer wrapper div                                                       | `string`                    | -           |
| `style`           | Inline styles applied to the outer wrapper div                                                   | `React.CSSProperties`       | -           |

The component uses `forwardRef` — pass a `ref` to access the outer `div` element.

**Note:** Panel also accepts all `BoxProps` from `@synerise/ds-flex-box` (via `@rebass/grid`), including:
