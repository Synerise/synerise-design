---
id: input-number
title: Input-Number
---

Input-Number UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-input-number--default"></iframe>

## API

### Props

| Property            | Description                                                                                                        | Type                                                                    | Default   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | --------- |
| autoFocus           | Get focus when component mounted                                                                                   | boolean                                                                 | `false`   |
| defaultValue        | Initial value                                                                                                      | number \| null                                                          | -         |
| description         | Input description                                                                                                  | ReactNode                                                               | -         |
| disabled            | Disable the input                                                                                                  | boolean                                                                 | `false`   |
| error               | Triggers error state (red background) without showing an error message                                             | boolean                                                                 | -         |
| errorText           | Error message shown below input; also triggers error state                                                         | ReactNode                                                               | -         |
| label               | Input label                                                                                                        | ReactNode                                                               | -         |
| max                 | Max value                                                                                                          | number                                                                  | Infinity  |
| min                 | Min value                                                                                                          | number                                                                  | -Infinity |
| onChange            | Called with the parsed numeric value on change. Returns `null` when input is cleared.                              | (value: number \| null) => void                                         | -         |
| onPressEnter        | Callback triggered when Enter key is pressed                                                                       | (e: Event) => void                                                      | -         |
| precision           | Precision of input value                                                                                           | number                                                                  | -         |
| prefixel            | ReactNode to render in the left addon slot                                                                         | ReactNode                                                               | -         |
| raw                 | Render bare input without FormField wrapper (no label / tooltip / description / errorText)                         | boolean                                                                 | -         |
| size                | Height of input box                                                                                                | string                                                                  | -         |
| step                | The number by which the current value is increased or decreased                                                    | number \| string                                                        | 1         |
| suffixel            | ReactNode to render in the right addon slot                                                                        | ReactNode                                                               | -         |
| tooltip             | Tooltip content shown next to the label                                                                            | ReactNode                                                               | -         |
| tooltipConfig       | Config of tooltip                                                                                                  | [TooltipProps](https://design.synerise.com/docs/components/tooltip#api) | -         |
| value               | Controlled value                                                                                                   | number \| null                                                          | -         |
| valueFormatOptions  | Override number format options (e.g. `{ maximumFractionDigits: 2 }`). Locale-aware formatting is always applied.  | NumberToFormatOptions                                                   | -         |
| autoResize          | Enable autosize: `true` or `{ minWidth, maxWidth?, stretchToFit? }`                                               | boolean \| object                                                       | -         |
| autoResizeProps     | Extra props for the autosize wrapper (`placeholderIsMinWidth`, `wrapperClassName`, `wrapperStyle`, `extraWidth`)   | object                                                                  | -         |

> **Note**: `formatter` and `parser` props from Ant Design cannot be customised — they are always overridden internally by the locale-aware formatting logic.

### Methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | remove focus |
| focus() | get focus    |
