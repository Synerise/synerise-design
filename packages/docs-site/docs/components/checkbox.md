---
id: checkbox
title: Checkbox
---

Checkbox UI Component

Checkbox component

Based on [Ant Design Checkbox](https://ant.design/components/checkbox/)


## Demo

<iframe src="/storybook-static/iframe.html?id=components-checkbox--default"></iframe>

## API

### Props

#### Checkbox

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| autoFocus | get focus when component mounted | boolean | false |
| checked | Specifies whether the checkbox is selected. | boolean | false |
| defaultChecked | Specifies the initial state: whether or not the checkbox is selected. | boolean | false |
| disabled | Disable checkbox | boolean | false |
| indeterminate | indeterminate checked state of checkbox | boolean | false |
| onChange | The callback function that is triggered when the state changes. | Function(e:Event) | - |

#### Checkbox Group

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| defaultValue | Default selected value | string\[] | \[] |
| disabled | Disable all checkboxes | boolean | false |
| name | The `name` property of all `input[type="checkbox"]` children | string | - |
| options | Specifies options | string\[] | \[] |
| value | Used for setting the currently selected value. | string\[] | \[] |
| onChange | The callback function that is triggered when the state changes. | Function(checkedValue) | - |

### Methods

#### Checkbox

| Name    | Description  |
| ------- | ------------ |
| blur()  | remove focus |
| focus() | get focus    |
