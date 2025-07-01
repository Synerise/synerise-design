---
id: checkbox
title: Checkbox
---

Checkbox UI Component

Checkbox component

Based on [Ant Design Checkbox](https://ant.design/components/checkbox/)

## API

| Property       | Description                                                           | Type            | Default |
| -------------- | --------------------------------------------------------------------- | --------------- | ------- |
| autoFocus      | Get focus when component mounted                                      | boolean         | `false` |
| checked        | Specifies whether the checkbox is selected.                           | boolean         | `false` |
| defaultChecked | Specifies the initial state: whether or not the checkbox is selected. | boolean         | `false` |
| description    | Checkbox description                                                  | string          | -       |
| disabled       | Disable checkbox                                                      | boolean         | `false` |
| errorText      | Error message, if provided sets error state on checkbox               | string          | -       |
| hasError       | Determines if checkbox is in error state                              | boolean         | `false` |
| indeterminate  | Indeterminate checked state of checkbox                               | boolean         | `false` |
| onChange       | The callback function that is triggered when the state changes.       | (e:Event)=>void | -       |
| withoutPadding | Reset padding of CheckboxWrapper                                      | boolean         |`false`  |
| tristate       | Tristate mode                                                         | true            | -       |

## Checkbox Group

| Property     | Description                                                     | Type                                                       | Default |
| ------------ | --------------------------------------------------------------- | ---------------------------------------------------------- | ------- |
| defaultValue | Default selected value                                          | string / number / boolean /string[] / number[] / boolean[] | []      |
| disabled     | Disable all checkboxes                                          | boolean                                                    | `false` |
| name         | The `name` property of all `input[type="checkbox"]` children    | string                                                     | -       |
| options      | Specifies options                                               | string / number / boolean /string[] / number[] / boolean[] | []      |
| value        | Used for setting the currently selected value.                  | string / number / boolean /string[] / number[] / boolean[] | []      |
| onChange     | The callback function that is triggered when the state changes. | (value: string / number / boolean) => void                 | -       |

### Methods

#### Checkbox

| Name    | Description  |
| ------- | ------------ |
| blur()  | remove focus |
| focus() | get focus    |
