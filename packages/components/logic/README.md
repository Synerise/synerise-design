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

## Usage of Login

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
| value    | Value of logic component                   | string                  | -                                                            |
| onChange | Function called when user change the value | (value: string) => void | -                                                            |
| options  | Custom list of options                     | LogicOperator[]         | `[{value: 'AND', label: 'And'}, {value: 'OR', label: 'Or'}]` |

### LogicOperator

| Property | Description           | Type                     | Default |
| -------- | --------------------- | ------------------------ | ------- |
| value    | Value of logic option | string                   | -       |
| label    | Label of logic option | string \ React.ReactNode | -       |

### Logic.Matching

| Property | Description                                                                             | Type                        | Default |
| -------- | --------------------------------------------------------------------------------------- | --------------------------- | ------- |
| matching | Value of Matching component                                                             | boolean                     | false   |
| sentence | Custom sentence require `#MATCHING_TOGGLE#`, which will be replaced by Toggle component | string                      | -       |
| onChange | Function called when user click on Toggle component                                     | (matching: boolean) => void | -       |
| texts    | Custom labels of Matching, Not matching                                                 | MatchingTexts               | -       |

### MatchingTexts

| Property    | Description                                               | Type   | Default        |
| ----------- | --------------------------------------------------------- | ------ | -------------- |
| matching    | Label of Toggle component, visible when matching is true  | string | `matching`     |
| notMatching | Label of Toggle component, visible when matching is false | string | `not matching` |
