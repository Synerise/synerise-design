---
id: input-number
title: Input-Number
---

Input-Number UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-input-number--default"></iframe>

## API

### Props

| Property         | Description                                                                                                     | Type                                                                    | Default   |
| ---------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | --------- |
| autoFocus        | Get focus when component mounted                                                                                | boolean                                                                 | `false`   |
| decimalSeparator | Decimal separator                                                                                               | string                                                                  | -         |
| defaultValue     | Initial value                                                                                                   | number                                                                  |
| description      | Input description                                                                                               | string                                                                  | -         |
| disabled         | Disable the input                                                                                               | boolean                                                                 | `false`   |
| errorText        | Error message, if provided input will be set in error state                                                     | string                                                                  | -         |
| formatter        | Specifies the format of the value presented                                                                     | (value: number / string) => string                                      | -         |
| label            | Input label                                                                                                     | string                                                                  | -         |
| max              | Max value                                                                                                       | number                                                                  | Infinity  |
| min              | Min value                                                                                                       | number                                                                  | -Infinity |
| onChange         | The callback triggered when the value is changed. The return value is either a number or empty string '' if NaN | (value: number / string) => void                                        |
| onPressEnter     | The callback function that is triggered when Enter key is pressed.                                              | (e:Event) => void                                                       |
| parser           | Specifies the value extracted from formatter                                                                    | (val: number / string) => string                                        | -         |
| precision        | Precision of input value                                                                                        | number                                                                  | -         |
| size             | Height of input box                                                                                             | string                                                                  | -         |
| step             | The number to which the current value is increased or decreased. It can be an integer or decimal.               | number / string                                                         | 1         |
| value            | Current value                                                                                                   | number                                                                  | -         |
| prefixel         | String or ReactNode to set prefix                                                                               | string / ReactNode                                                      | -         |
| suffixel         | String or ReactNode to set suffix                                                                               | string / ReactNode                                                      | -         |
| tooltip          | Tooltip content                                                                                                 | ReactNode                                                               | -         |
| tooltipConfig    | Config of tooltip                                                                                               | [TooltipProps](https://design.synerise.com/docs/components/tooltip#api) | -         |

### Methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | remove focus |
| focus() | get focus    |
