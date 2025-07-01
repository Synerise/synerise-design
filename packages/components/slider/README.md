---
id: slider
title: Slider
---

Slider UI Component

Based on [Ant Design Slider](https://ant.design/components/slider/)

## Installation

```
npm i @synerise/ds-slider
or
yarn add @synerise/ds-slider
```

## Usage

```jsx
import Slider from '@synerise/ds-slider';

<Slider
  label="Label"
  max={100}
  min={0}
  range
  step={5}
  onAfterChange={props.onAfterChange}
  OnChange={props.onChange}
  tooltipPlacement="topLeft"
/>;
```

## Slider Default

<iframe src="/storybook-static/iframe.html?id=components-slider--default"></iframe>

## Slider Multiple Mode

<iframe src="/storybook-static/iframe.html?id=components-slider--multiple-range"></iframe>

## API

| Property                 | Description                                                                                                                                    | Type                                        | Default                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------- |
| autoFocus                | get focus when component mounted                                                                                                               | boolean                                     | `false`                                                                                |
| defaultValue             | The default value of slider. When range is false, use number, otherwise, use `[number, number]`                                                | number / number[]                           | `0 / [0, 0]`                                                                           |
| disabled                 | If true, the slider will not be interactable.                                                                                                  | boolean                                     | `false`                                                                                |
| dots                     | Whether the thumb can drag over tick only.                                                                                                     | boolean                                     | `false`                                                                                |
| included                 | Make effect when marks not null, `true` means containment and`false`means coordinative                                                         | boolean                                     | `true`                                                                                 |
| marks                    | Tick mark of Slider, type of key must be number, and must in closed interval [min, max], each mark can declare its own style.                  | object                                      | `{number: string / ReactNode} / {number: {style: object, label: string or ReactNode}}` |
| max                      | The maximum value the slider can slide to                                                                                                      | number                                      | 100                                                                                    |
| min                      | The minimum value the slider can slide to.                                                                                                     | number                                      | 0                                                                                      |
| range                    | dual thumb mode                                                                                                                                | boolean                                     | `false`                                                                                |
| step                     | The granularity the slider can step through values. Must greater than 0, and be divided by (max - min) . When marks no null, step can be null. | number / null                               | 1                                                                                      |
| tipFormatter             | Slider will pass its value to tipFormatter, and display its value in Tooltip, and hide Tooltip when return value is null.                      | ((value: number) => React.ReactNode) / null | IDENTITY                                                                               |
| value                    | The value of slider. When range is false, use number, otherwise, use [number, number]                                                          | number / number[]                           |                                                                                        |
| vertical                 | If true, the slider will be vertical.                                                                                                          | Boolean                                     | `false`                                                                                |
| onAfterChange            | Fire when onmouseup is fired.                                                                                                                  | (value)                                     | -                                                                                      |
| onChange                 | Callback function that is fired when the user changes the slider's value.                                                                      | (value)                                     | -                                                                                      |
| thick                    | Set thickness of the slider                                                                                                                    | Boolean                                     | `false`                                                                                |
| type                     | Defines a way of handling slider ranges                                                                                                        | `default` / `allocation`                    | `default`                                                                              |
| tooltipPlacement         | Set Tooltip display position. Ref Tooltip.                                                                                                     | string                                      |                                                                                        |
| tooltipVisible           | If true, Tooltip will show always, or it will not show anyway, even if dragging or hovering.                                                   | Boolean                                     |                                                                                        |
| getTooltipPopupContainer | The DOM container of the Tooltip, the default behavior is to create a div element in body.                                                     | () => React.HTMLElement                     | `() => document.body`                                                                  |
| inverted                 | Allow to use slider in inverted mode. Applies only when value is `number or [number, number]`                                                  | Boolean                                     | `false`                                                                                |
| useColorPalette          | Allow the usage of predefined palette for slider tracks                                                                                        | Boolean                                     | `false`                                                                                |
| tracksColorMap           | Allow to import your 10 colors color map.                                                                                                      | Object                                      |                                                                                        |
| handlers                 | Handlers config object for allocation slider. Allow to manipulate handlers e.g. enable to block handler. First handler index is 1.             | HandlerConfig                               | -                                                                                      |

### AllocationConfig

| Property            | Description                                               | Type                                     | Default         |
| ------------------- | --------------------------------------------------------- | ---------------------------------------- | --------------- |
| controlGroupEnabled | Enables treating the rest of the range as control group.  | boolean                                  | `false`         |
| controlGroupLabel   | Label displayed over control group range                  | string / React.ReactNode                 | `Control group` |
| controlGroupTooltip | Tooltip displayed when hovering over control group label. | string / React.ReactNode                 | `CG`            |
| variants            | Whether the thumb can drag over tick only.                | AllocationVariant[]                      | `false`         |
| onAllocationChange  | Callback executed when user changes slider value.         | (variants?: AllocationVariant[]) => void | `false`         |

### AllocationConfig

| Property            | Description                                               | Type                                     | Default         |
| ------------------- | --------------------------------------------------------- | ---------------------------------------- | --------------- |
| controlGroupEnabled | Enables treating the rest of the range as control group.  | boolean                                  | `false`         |
| controlGroupLabel   | Label displayed over control group range                  | string / React.ReactNode                 | `Control group` |
| controlGroupTooltip | Tooltip displayed when hovering over control group label. | string / React.ReactNode                 | `CG`            |
| variants            | Whether the thumb can drag over tick only.                | AllocationVariant[]                      | `false`         |
| onAllocationChange  | Callback executed when user changes slider value.         | (variants?: AllocationVariant[]) => void | `false`         |
