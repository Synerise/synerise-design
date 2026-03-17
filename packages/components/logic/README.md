---
id: logic
title: Logic
---

Logic UI Component

## Installation

```
npm i @synerise/ds-logic
or
yarn add @synerise/ds-logic
```

## Usage of Logic

```
import Logic from '@synerise/ds-logic'

<Logic value={'AND'} onChange={handleChange} />

```

## Usage of Matching

```
import Logic from '@synerise/ds-logic'

<Logic.Matching matching={true} onChange={handleChange} sentence="Find all items #MATCHING_TOGGLE# this condition." />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-logic--default"></iframe>

## API

| Property | Description                                | Type                    | Default                                                      |
| -------- | ------------------------------------------ | ----------------------- | ------------------------------------------------------------ |
| value    | Value of logic component                   | `LogicOperatorValue` (`'AND' \| 'OR' \| string`) | -                                               |
| onChange | Function called when user change the value | `(value: LogicOperatorValue) => void` | -                                                   |
| options  | Custom list of options                     | `LogicOperator[]`       | i18n-resolved `AND` / `OR` labels (`DS.LOGIC.AND`, `DS.LOGIC.OR`) |
| readOnly | Disables click interaction and hover styles | `boolean`              | `false`                                                      |

### LogicOperator

| Property | Description           | Type                     | Default |
| -------- | --------------------- | ------------------------ | ------- |
| value    | Value of logic option | string                   | -       |
| label    | Label of logic option | string \ React.ReactNode | -       |

### Logic.Matching

| Property | Description                                                                             | Type                        | Default |
| -------- | --------------------------------------------------------------------------------------- | --------------------------- | ------- |
| matching | Value of Matching component                                                             | boolean                     | `true`  |
| sentence | Custom sentence require `#MATCHING_TOGGLE#`, which will be replaced by Toggle component | string                      | -       |
| onChange | Function called when user click on Toggle component                                     | (matching: boolean) => void | -       |
| texts    | Custom labels of Matching, Not matching                                                 | `Partial<MatchingTexts>`    | -       |
| readOnly | Disables click interaction and hover styles                                             | `boolean`                   | `false` |

### MatchingTexts

| Property    | Description                                               | Type   | Default        |
| ----------- | --------------------------------------------------------- | ------ | -------------- |
| matching    | Label of Toggle component, visible when matching is true  | string | `matching`     |
| notMatching | Label of Toggle component, visible when matching is false | string | `not matching` |
