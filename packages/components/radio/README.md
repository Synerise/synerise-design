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

| Property       | Description                                                          | Type      | Default |
| -------------- | -------------------------------------------------------------------- | --------- | ------- |
| autoFocus      | get focus when component mounted                                     | boolean   | `false` |
| checked        | Specifies whether the radio is selected.                             | boolean   | -       |
| description    | radio input description                                              | ReactNode | -       |
| defaultChecked | Specifies the initial state: whether or not the radio is selected.   | boolean   | `false` |
| disabled       | Disable radio                                                        | boolean   | `false` |
| value          | According to value for comparison, to determine whether the selected | any       | -       |
| label          | radio input label                                                    | ReactNode | -       |
| children       | radio input children `deprecated, use label instead`                 | ReactNode | -       |

#### RadioGroup

| Property     | Description                                                     | Type                                                                   | Default   |
| ------------ | --------------------------------------------------------------- | ---------------------------------------------------------------------- | --------- |
| defaultValue | Default selected value                                          | any                                                                    | -         |
| disabled     | Disable all radio buttons                                       | boolean                                                                | `false`   |
| name         | The name property of all input[type="radio"] children           | string                                                                 | -         |
| options      | set children optional                                           | string[] / `Array<{ label: string value: string disabled?: boolean }>` | -         |
| size         | size for radio button style                                     | `large` / `default` / `small`                                          | `default` |
| value        | Used for setting the currently selected value.                  | any                                                                    | -         |
| onChange     | The callback function that is triggered when the state changes. | (e:Event) => void                                                      | -         |
| buttonStyle  | style type of radio button                                      | `outline` / `solid`                                                    | `outline` |

### Methods

#### Radio

| Name    | Description  |
| ------- | ------------ |
| blur()  | remove focus |
| focus() | get focus    |
