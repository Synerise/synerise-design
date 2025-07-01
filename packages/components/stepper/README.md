---
id: stepper
title: Stepper
---

Stepper UI Component

## Installation

```
npm i @synerise/ds-stepper
or
yarn add @synerise/ds-stepper
```

## Usage

```
import Stepper from '@synerise/ds-stepper'

<Stepper orientation="vertical">
    <Stepper.Step stepNumber="1" label="Define">
        <Radio.Group>
            <Radio name="radio" value="radio" description="Description">
              Radio
            </Radio>
            <Radio name="radio" value="tv" description="Description">
              TV
            </Radio>
        </Radio.Group>
    </Stepper.Step>
</Stepper>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-stepper--default"></iframe>

## API

### Stepper

| Property    | Description                        | Type                      | Default      |
| ----------- | ---------------------------------- | ------------------------- | ------------ |
| orientation | Defines direction of Stepper steps | `horizontal` \ `vertical` | `horizontal` |

### Stepper.Step

| Property   | Description                               | Type                         | Default |
| ---------- | ----------------------------------------- | ---------------------------- | ------- |
| active     | Whether current step is active            | `boolean`                    | `false` |
| done       | Whether step was completed                | `boolean`                    | `false` |
| label      | Label of step                             | `string` \ `React.ReactNode` | -       |
| onClick    | Function called when user clicks on step  | `() => void`                 | -       |
| stepNumber | Step number                               | `number`                     | -       |
| tooltip    | Shows icon with tooltip if step is active | `string` \ `React.ReactNode` | -       |
| validated  | Whether step has some errors              | `boolean`                    | `false` |
| warning    | Whether step has warning status           | `boolean`                    | -       |

'Acive', 'done', 'validated', 'warning' are properties that determinate what color will have internal wrappers. Please note that it might overwrite some css properties. Properties hierarchy: 'validated' < 'warning' < 'done' < 'active'
