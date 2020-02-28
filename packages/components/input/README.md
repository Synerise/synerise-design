---
id: input
title: Input
---

Input UI Component

## Input

<iframe src="/storybook-static/iframe.html?id=components-input--input"></iframe>

## Textarea

<iframe src="/storybook-static/iframe.html?id=components-input--textarea"></iframe>

## API

#### Input

| Property       | Description                                                                                                                                                        | Type             | Default   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | --------- |
| addonAfter     | The label text displayed after (on the right side of) the input field.                                                                                             | string\ReactNode |           |
| addonBefore    | The label text displayed before (on the left side of) the input field.                                                                                             | string\ReactNode |           |
| allowClear     | allow to remove input content with clear icon                                                                                                                      | boolean          |           |
| counterLimit   | maximum input length, if provided counter will be shown                                                                                                            | number           | -         |
| defaultValue   | The initial input content                                                                                                                                          | string           |           |
| description    | input description                                                                                                                                                  | string           | -         |
| disabled       | Whether the input is disabled.                                                                                                                                     | boolean          | false     |
| errorText      | error message, if provided input will be set in error state                                                                                                        | string           | -         |
| handleInputRef | The callback function that is triggered when Component is mounted.                                                                                                 | function(ref)    | -         |
| id             | The ID for input                                                                                                                                                   | string           |           |
| label          | input label                                                                                                                                                        | string           | -         |
| onChange       | callback when user input                                                                                                                                           | function(e)      |           |
| onPressEnter   | The callback function that is triggered when Enter key is pressed.                                                                                                 | function(e)      |           |
| prefix         | The prefix icon for the Input.                                                                                                                                     | string\ReactNode |           |
| resetMargin    | whether input should have margin reset                                                                                                                             | boolean          | -         |
| size           | The size of the input box. Note: in the context of a form, the `large` size is used. Available: `large` `default` `small`                                          | string           | `default` |
| suffix         | The suffix icon for the Input.                                                                                                                                     | string\ReactNode |           |
| tooltip        | Tooltip content                                                                                                                                                    | ReactNode        | -         |
| type           | The type of input, see: [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)(use `Input.TextArea` instead of `type="textarea"`) | string           | `text`    |
| value          | The input content value                                                                                                                                            | string           |           |

#### InputGroup

| Property | Description                                                                                             | Type    | Default |
| -------- | ------------------------------------------------------------------------------------------------------- | ------- | ------- |
| compact  | Whether use compact style                                                                               | boolean | false   |
| size     | The size of Input.Group specifies the size of the included Input fields. Available: large default small | string  | default |
