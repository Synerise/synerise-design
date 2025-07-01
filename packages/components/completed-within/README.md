---
id: completed-within
title: CompletedWithin
---

CompletedWithin UI Component

## Installation

```
npm i @synerise/ds-completed-within
or
yarn add @synerise/ds-completed-within
```

## Usage

```
import CompletedWithin from '@synerise/ds-completed-within'

<CompletedWithin
    value={store.state.value}
    onSetValue={handleSetValue}
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-completed-within--default"></iframe>

## API

| Property    | Description                                                                  | Type                         | Default                              |
| ----------- | ---------------------------------------------------------------------------- | ---------------------------- | ------------------------------------ |
| text        | Custom labels and tooltips                                                   | CompletedWithinTexts         | -                                    |
| value       | Selected value                                                               | PeriodValue                  | { value: undefined, period: 'YEARS'} |
| maxValue    | Max value                                                                    | PeriodValue[value]           | Number.MAX_SAFE_INTEGER              |
| onSetValue  | Function called when user has closed the settings with set value, and period | (value: PeriodValue) => void | -                                    |
| periods     | Custom list of periods                                                       | CustomPeriod[]               | -                                    |
| placeholder | Trigger button label                                                         | string                       | -                                    |
| tooltip     | Content of tooltip                                                           | string                       | -                                    |
| readOnly    | Whether value is editable                                                    | boolean                      | -                                    |

### CompletedWithinTexts

| Property          | Description                         | Type                         | Default            |
| ----------------- | ----------------------------------- | ---------------------------- | ------------------ |
| header            | Header of settings                  | `string` \ `React.ReactNode` | `Completed within` |
| completedLabel    | Label of button with selected value | `string` \ `React.ReactNode` | `Completed within` |
| clear             | Clear button tooltip                | `string` \ `React.ReactNode` | `Clear`            |
| periodPlaceholder | Placeholder of period select        | `string` \ `React.ReactNode` | `Interval`         |

### PeriodValue

| Property | Description                                                                           | Type                   | Default     |
| -------- | ------------------------------------------------------------------------------------- | ---------------------- | ----------- |
| value    | Numerical value                                                                       | `number` \ `undefined` | `undefined` |
| period   | Period key, default options: `SECONDS`, `MINUTES`, `HOURS`, `DAYS`, `MONTHS`, `YEARS` | `string` \ `undefined` | `undefined` |

### CustomPeriod

| Property | Description            | Type     | Default |
| -------- | ---------------------- | -------- | ------- |
| value    | Key of custom period   | `string` | -       |
| label    | Label of custom period | `string` | -       |
