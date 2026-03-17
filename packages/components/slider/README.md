---
id: slider
title: Slider
---

Slider UI Component

Built on `@tanstack/react-ranger`. Supports single-value, range (dual-thumb), and allocation modes.

## Installation

```
npm i @synerise/ds-slider
or
yarn add @synerise/ds-slider
```

## Usage

```jsx
import Slider from '@synerise/ds-slider';

// Single value
<Slider label="Label" max={100} min={0} step={5} value={50} onChange={v => setValue(v)} />;

// Range
<Slider range min={0} max={100} value={[20, 80]} onChange={v => setRange(v)} />;
```

## Slider Default

<iframe src="/storybook-static/iframe.html?id=components-slider--default"></iframe>

## Slider Multiple Mode

<iframe src="/storybook-static/iframe.html?id=components-slider--multiple-range"></iframe>

## API

| Property       | Description                                                                                    | Type                                             | Default |
| -------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------- |
| label          | Label rendered above the slider                                                                | React.ReactNode                                  | -       |
| description    | Description text rendered above the slider                                                     | React.ReactNode                                  | -       |
| autoFocus      | get focus when component mounted                                                               | boolean                                          | `false` |
| disabled       | If true, the slider will not be interactable.                                                  | boolean                                          | `false` |
| dots           | Show dots at step positions                                                                    | boolean                                          | `false` |
| marks          | Tick mark of Slider. Key must be a number in [min, max]. Each mark can have its own style.     | `Record<string \| number, ReactNode \| MarkObj>` | -       |
| max            | The maximum value the slider can slide to                                                      | number                                           | -       |
| min            | The minimum value the slider can slide to.                                                     | number                                           | -       |
| range          | Dual thumb mode (activates RangeSlider)                                                        | boolean                                          | -       |
| step           | The granularity the slider can step through values.                                            | number                                           | -       |
| tipFormatter   | Custom tooltip formatter; pass `false` to hide tooltip.                                        | `((value?: number) => React.ReactNode) \| false` | -       |
| value          | The value of slider. When `range` is false, use number; otherwise, use `[number, number]`      | `number \| number[]`                             | -       |
| onAfterChange  | Fire when mouse/touch up is fired.                                                             | `(value: number \| number[]) => void`            | -       |
| onChange       | Callback function that is fired when the user changes the slider's value.                      | `(value: number \| number[]) => void`            | -       |
| thick          | Set thickness of the slider                                                                    | boolean                                          | `false` |
| type           | Defines a way of handling slider ranges                                                        | `'default'` / `'allocation'`                     | -       |
| inverted       | Allow to use slider in inverted mode. Applies only when `value` is `number` or `[number, number]` | boolean                                       | `false` |
| tracksColorMap | Custom colour map for track sections (keys are numeric values)                                 | `Record<number, string>`                         | -       |
| handlers       | Handlers config for allocation slider. Allows blocking handlers. First handler index is 1.     | HandlerConfig                                    | -       |

### AllocationConfig

| Property            | Description                                               | Type                                     | Default         |
| ------------------- | --------------------------------------------------------- | ---------------------------------------- | --------------- |
| variants            | Allocation variants with name, percentage and tab info    | AllocationVariant[]                      | -               |
| onAllocationChange  | Callback executed when user changes slider value.         | (variants?: AllocationVariant[]) => void | -               |
| controlGroupEnabled | Enables treating the rest of the range as control group.  | boolean                                  | `false`         |
| controlGroupLabel   | Label displayed over control group range                  | string / React.ReactNode                 | `Control group` |
| controlGroupTooltip | Tooltip displayed when hovering over control group label. | string / React.ReactNode                 | `CG`            |
