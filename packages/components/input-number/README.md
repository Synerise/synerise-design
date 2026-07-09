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
| onBlur              | Native input blur handler (consumers read `event.target.value`)                                                    | (e: FocusEvent<HTMLInputElement>) => void                               | -         |
| onChange            | Called with the parsed numeric value on change. Returns `null` when input is cleared.                              | (value: number \| null) => void                                         | -         |
| precision           | Precision of input value                                                                                           | number                                                                  | -         |
| prefixel            | ReactNode to render in the left addon slot                                                                         | ReactNode                                                               | -         |
| raw                 | Render bare input without FormField wrapper (no label / tooltip / description / errorText)                         | boolean                                                                 | -         |
| readOnly            | Read-only input (steppers are not rendered)                                                                        | boolean                                                                 | `false`   |
| size                | Height of input box (`'large'` → 48px)                                                                              | 'small' \| 'middle' \| 'large'                                          | -         |
| step                | The number by which the current value is increased or decreased                                                    | number \| string                                                        | 1         |
| suffixel            | ReactNode to render in the right addon slot                                                                        | ReactNode                                                               | -         |
| tooltip             | Tooltip content shown next to the label                                                                            | ReactNode                                                               | -         |
| tooltipConfig       | Config of tooltip                                                                                                  | [TooltipProps](https://design.synerise.com/docs/components/tooltip#api) | -         |
| value               | Controlled value                                                                                                   | number \| null                                                          | -         |
| valueFormatOptions  | Override number format options (e.g. `{ maximumFractionDigits: 2 }`). Locale-aware formatting is always applied.  | NumberToFormatOptions                                                   | -         |
| autoResize          | Enable autosize: `true` or `{ minWidth, maxWidth?, stretchToFit? }`                                               | boolean \| object                                                       | -         |
| autoResizeProps     | Extra props for the autosize wrapper (`placeholderIsMinWidth`, `wrapperClassName`, `wrapperStyle`, `extraWidth`)   | object                                                                  | -         |

> **Note**: this component is DS-native (no Ant Design). The former antd-only props were removed —
> `formatter`/`parser`/`decimalSeparator` (formatting is always locale-driven via `valueFormatOptions`),
> `controls`, `keyboard`, `stringMode`, `bordered`, `status`, `prefix`, `onPressEnter`, and
> `addonBefore`/`addonAfter` (use `prefixel`/`suffixel`).
