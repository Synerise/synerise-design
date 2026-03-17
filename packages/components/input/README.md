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
| addonAfter          | The label text displayed after (on the right side of) the input field.                                                                                             | string\|ReactNode                                                       |             |
| addonBefore         | The label text displayed before (on the left side of) the input field.                                                                                             | string\|ReactNode                                                       |             |
| allowClear          | Allow to remove input content with clear icon                                                                                                                      | boolean                                                                 |             |
| counterLimit        | Maximum input length, if provided counter will be shown; input is blocked at the limit                                                                             | number                                                                  | -           |
| renderCustomCounter | render function to display custom char counter instead of counterLimit. counterLimit (max allowed chars) does not have to be defined.                              | `(count?: number) => ReactNode`                                         | -           |
| defaultValue        | The initial input content                                                                                                                                          | string                                                                  |             |
| description         | input description                                                                                                                                                  | string                                                                  | -           |
| disabled            | Whether the input is disabled.                                                                                                                                     | boolean                                                                 | `false`     |
| errorText           | Error message, if provided input will be set in error state                                                                                                        | string                                                                  | -           |
| error               | If provided input will be set in error state, without error message                                                                                                | boolean                                                                 | -           |
| expandable          | If true then user can switch to a multiline field if text overflows the input                                                                                      | boolean                                                                 | -           |
| expandableTooltip   | Tooltip shown on the expand icon                                                                                                                                   | ReactNode                                                               | -           |
| handleInputRef      | Callback receiving a ref to the underlying `<input>` element after mount.                                                                                          | `(ref: MutableRefObject<HTMLInputElement \| null>) => void`             | -           |
| icon1               | Left action icon rendered inside the input (right side)                                                                                                            | ReactElement                                                            | -           |
| icon1Tooltip        | Tooltip for icon1                                                                                                                                                  | ReactElement                                                            | -           |
| icon2               | Second action icon (stacks with icon1)                                                                                                                             | ReactElement                                                            | -           |
| icon2Tooltip        | Tooltip for icon2                                                                                                                                                  | ReactElement                                                            | -           |
| id                  | The ID for input                                                                                                                                                   | string                                                                  |             |
| label               | Input label                                                                                                                                                        | string                                                                  | -           |
| onChange            | Callback when user input                                                                                                                                           | function(e)                                                             |             |
| onPressEnter        | The callback function that is triggered when Enter key is pressed.                                                                                                 | function(e)                                                             |             |
| prefix              | The prefix icon for the Input.                                                                                                                                     | string\|ReactNode                                                       |             |
| prefixel            | Attached left addon block (height matched to input height)                                                                                                         | ReactNode                                                               | -           |
| resetMargin         | Whether input should have margin reset                                                                                                                             | boolean                                                                 | -           |
| size                | The size of the input box. Note: in the context of a form, the `large` size is used. Available: `large` `default` `small`                                          | string                                                                  | `default`   |
| suffix              | The suffix icon for the Input.                                                                                                                                     | string\|ReactNode                                                       |             |
| suffixel            | Attached right addon block (height matched to input height)                                                                                                        | ReactNode                                                               | -           |
| tooltip             | Tooltip content                                                                                                                                                    | ReactNode                                                               | -           |
| tooltipConfig       | Config of tooltip                                                                                                                                                  | [TooltipProps](https://design.synerise.com/docs/components/tooltip#api) | -           |
| type                | The type of input, see: [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)(use `Input.TextArea` instead of `type="textarea"`) | string                                                                  | `text`      |
| value               | The input content value                                                                                                                                            | string                                                                  |             |
| autoResize          | 'resize' width of the input based on width of the text in input                                                                                                    | AutoResizeProp (see below)                                              | `undefined` |
| autoResizeProps     | Fine-tuning options for autoResize: `placeholderIsMinWidth`, `wrapperClassName`, `wrapperStyle`, `extraWidth`                                                      | `Partial<AutosizeInputProps>`                                           | -           |

#### AutoResizeProp

```
type AutoResizeProp = boolean | {
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

| Property      | Description                                                                                             | Type         | Default   |
| ------------- | ------------------------------------------------------------------------------------------------------- | ------------ | --------- |
| compact       | Whether use compact style                                                                               | boolean      | `false`   |
| size          | The size of Input.Group specifies the size of the included Input fields. Available: large default small | string       | `default` |
| errors        | Array of error messages displayed below the group                                                       | string[]     | -         |
| resetMargin   | Whether input group should have margin reset                                                            | boolean      | -         |
| label         | Group label                                                                                             | ReactNode    | -         |
| description   | Helper text below the group                                                                             | string       | -         |
| tooltip       | Tooltip content on the label                                                                            | ReactNode    | -         |
| tooltipConfig | Config of tooltip                                                                                       | TooltipProps | -         |

### TextArea

| Property            | Description                                                            | Type                                                                | Default |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------- | ------- |
| autoSize            | Autosizing the height to fit the content                               | `{ minRows: number; maxRows: number; }`                             | -       |
| counterLimit        | Maximum input length, if provided counter will be shown                | number                                                              | -       |
| renderCustomCounter | Render function to display custom char counter                         | `(count?: number) => ReactNode`                                     | -       |
| description         | Helper text below the textarea                                         | string                                                              | -       |
| errorText           | Error message, if provided textarea will be set in error state         | string\|ReactNode                                                   | -       |
| error               | If provided textarea will be set in error state, without error message | boolean                                                             | -       |
| handleInputRef      | Callback receiving a ref to the underlying `<textarea>` element        | `(ref: MutableRefObject<HTMLTextAreaElement \| null>) => void`      | -       |
| icon1               | Left action icon rendered inside the textarea (right side)             | ReactElement                                                        | -       |
| icon1Tooltip        | Tooltip for icon1                                                      | ReactElement                                                        | -       |
| icon2               | Second action icon                                                     | ReactElement                                                        | -       |
| icon2Tooltip        | Tooltip for icon2                                                      | ReactElement                                                        | -       |
| label               | Field label                                                            | ReactNode                                                           | -       |
| prefixel            | Attached left addon block                                              | ReactNode                                                           | -       |
| resize              | 'resize' CSS property passed to the textarea component                 | `none` / `both` / `horizontal` / `vertical` / `initial` / `inherit` | -       |
| resetMargin         | Whether textarea should have margin reset                              | boolean                                                             | -       |
| suffixel            | Attached right addon block                                             | ReactNode                                                           | -       |
| tooltip             | Tooltip content on the label                                           | ReactNode                                                           | -       |
| tooltipConfig       | Config of tooltip                                                      | TooltipProps                                                        | -       |
| wrapperStyle        | CSS properties passed to the textarea component wrapper                | `React.CSSProperties`                                               | -       |

### PasswordInput

Wraps `Input` with a show/hide password toggle. All `InputProps` are accepted except `icon1`, `icon1Tooltip`, `icon2`, `icon2Tooltip`, `suffixel`, `prefixel`, `type`, and `expandableTooltip`.

| Property | Description                      | Type                          | Default |
| -------- | -------------------------------- | ----------------------------- | ------- |
| texts    | Override show/hide label strings | `Partial<PasswordInputTexts>` | -       |

`PasswordInputTexts`:

| Property | Description             | Type      |
| -------- | ----------------------- | --------- |
| showText | Label for "show" button | ReactNode |
| hideText | Label for "hide" button | ReactNode |

Default strings come from `react-intl` (`DS.INPUT.SHOW-PASSWORD` / `DS.INPUT.HIDE-PASSWORD`).

### InputMultivalue

Tag-style input that accumulates string values. Press **Enter** to add the current text as a new tag. Tags can be individually removed.

| Property    | Description                                                              | Type                         | Default |
| ----------- | ------------------------------------------------------------------------ | ---------------------------- | ------- |
| values      | **Required.** Array of current tag values                                | string[]                     | -       |
| onChange    | Called with the updated values array when a tag is added or removed      | `(values: string[]) => void` | -       |
| error       | Sets error styling                                                       | boolean                      | -       |
| errorText   | Error message                                                            | ReactNode\|string            | -       |
| label       | Field label                                                              | ReactNode\|string            | -       |
| description | Helper text                                                              | ReactNode\|string            | -       |
| disabled    | Disables interaction                                                     | boolean                      | -       |
| onBlur      | Called on blur                                                           | `() => void`                 | -       |
| onFocus     | Called on focus                                                          | `() => void`                 | -       |
| maxLength   | Max length of the current entry being typed (not the total values count) | number                       | -       |
| className   | Applied to the input wrapper                                             | string                       | -       |
