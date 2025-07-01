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

### Input

| Property            | Description                                                                                                                                                        | Type                                                                    | Default     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ----------- |
| addonAfter          | The label text displayed after (on the right side of) the input field.                                                                                             | string\ReactNode                                                        |             |
| addonBefore         | The label text displayed before (on the left side of) the input field.                                                                                             | string\ReactNode                                                        |             |
| allowClear          | Allow to remove input content with clear icon                                                                                                                      | boolean                                                                 |             |
| counterLimit        | Maximum input length, if provided counter will be shown                                                                                                            | number                                                                  | -           |
| renderCustomCounter | render function to display custom char counter instead of counterLimit. counterLimit (max alowed chars) does not have to be defined.                               | `(count: number) => ReactNode`                                          | -           |
| defaultValue        | The initial input content                                                                                                                                          | string                                                                  |             |
| description         | input description                                                                                                                                                  | string                                                                  | -           |
| disabled            | Whether the input is disabled.                                                                                                                                     | boolean                                                                 | `false`     |
| errorText           | Error message, if provided input will be set in error state                                                                                                        | string                                                                  | -           |
| error               | If provided input will be set in error state, without error message                                                                                                | boolean                                                                 | -           |
| expandable          | If true then user can switch to a multiline field if text overflows the input                                                                                      | boolean                                                                 | -           |
| handleInputRef      | The callback function that is triggered when Component is mounted.                                                                                                 | function(ref)                                                           | -           |
| id                  | The ID for input                                                                                                                                                   | string                                                                  |             |
| label               | Input label                                                                                                                                                        | string                                                                  | -           |
| onChange            | Callback when user input                                                                                                                                           | function(e)                                                             |             |
| onPressEnter        | The callback function that is triggered when Enter key is pressed.                                                                                                 | function(e)                                                             |             |
| prefix              | The prefix icon for the Input.                                                                                                                                     | string\ReactNode                                                        |             |
| resetMargin         | Whether input should have margin reset                                                                                                                             | boolean                                                                 | -           |
| resize              | 'resize' CSS property passed to the input component                                                                                                                | `none` / `both` / `horizontal` / `vertical` / `initial` / `inherit`     | -           |
| size                | The size of the input box. Note: in the context of a form, the `large` size is used. Available: `large` `default` `small`                                          | string                                                                  | `default`   |
| suffix              | The suffix icon for the Input.                                                                                                                                     | string\ReactNode                                                        |             |
| tooltip             | Tooltip content                                                                                                                                                    | ReactNode                                                               | -           |
| tooltipConfig       | Config of tooltip                                                                                                                                                  | [TooltipProps](https://design.synerise.com/docs/components/tooltip#api) | -           |
| type                | The type of input, see: [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)(use `Input.TextArea` instead of `type="textarea"`) | string                                                                  | `text`      |
| value               | The input content value                                                                                                                                            | string                                                                  |             |
| autoResize          | 'resize' width of the input based on width of the text in input                                                                                                    | AutoResizeProp (see below)                                              | `undefined` |

#### AutoResizeProp

```
type AutoResizeProp = `boolean` | {
    minWidth: string;
    maxWidth?: string;
    stretchToFit?: boolean
};
```

Setting `stretchToFit: true` will make the field stretch to fit the containing element. The component observes the width of the wrapper and adjusts the maxWidth accordingly.  
**Important** if the Input is within a flex-item then there is necessary CSS that needs to be applied to the flex-item containers in order for the flex-item to grow to fill the allowed space, but at the same time not stretch the flex container (identical issue happens when text-overflow needs to happen inside a flex-item).

```css
$flexItemSurroundingTheInput {
  min-width: 0;
  flex-grow: 1;
}
```

See https://css-tricks.com/flexbox-truncated-text/ for more details.

### InputGroup

| Property | Description                                                                                             | Type    | Default |
| -------- | ------------------------------------------------------------------------------------------------------- | ------- | ------- |
| compact  | Whether use compact style                                                                               | boolean | `false` |
| size     | The size of Input.Group specifies the size of the included Input fields. Available: large default small | string  | default |

#### TextArea

| Property     | Description                                                            | Type                                                                | Default |
| ------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------- | ------- |
| autoSize     | Autosizing the height to fit the content                               | `{ minRows: number; maxRows: number; }`                             | -       |
| errorText    | Error message, if provided textarea will be set in error state         | string                                                              | -       |
| error        | If provided textarea will be set in error state, without error message | boolean                                                             | -       |
| resize       | 'resize' CSS property passed to the textarea component                 | `none` / `both` / `horizontal` / `vertical` / `initial` / `inherit` | -       |
| wrapperStyle | CSS properties passed to the textarea component wrapper                | `React.CSSProperties`                                               | -       |
