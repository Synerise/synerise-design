---
id: radio
title: Radio
---

Radio UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-radio--default"></iframe>

## API

### Props

#### Radio

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| description | radion input description | string | -
| autoFocus | get focus when component mounted | boolean | false	
| checked | Specifies whether the radio is selected. | boolean | -	
| defaultChecked | Specifies the initial state: whether or not the radio is selected. | boolean | false	
| disabled | Disable radio | boolean | false
| value | According to value for comparison, to determine whether the selected | any | -

#### RadioGroup

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| defaultValue | Default selected value | any | -
| disabled | Disable all radio buttons | boolean | false
| name | The name property of all input[type="radio"] children | string | -
| options | set children optional | string[] &#124; Array<{ label: string value: string disabled?: boolean }> | -
| size | size for radio button style | large &#124; default &#124; small | default	
| value | Used for setting the currently selected value. | any | -
| onChange | The callback function that is triggered when the state changes. | Function(e:Event) | -
| buttonStyle | style type of radio button | outline &#124; solid | outline

### Methods

#### Radio

| Name    | Description  |
| ------- | ------------ |
| blur()  | remove focus |
| focus() | get focus    |