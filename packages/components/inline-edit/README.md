---
id: inline-edit
title: InlineEdit
---

InlineEdit UI Component

## Example

```
<InlineEdit
  input={{
    name: 'name-of-input',
    value: 'Value',
    maxLength: 120,
    placeholder: 'Placeholder',
    onBlur: () => {},
    onChange: event => {},
    onEnterPress: () => {},
  }}
  style={{ maxWidth: '128px' }}
  size={'normal'}
  error={false}
  disabled={false}
  hideIcon={false}
/>
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-inline-edit--default"></iframe>

## InlineEdit API

| Property     | Description                      | Type                          | Default  |
| ------------ | -------------------------------- | ----------------------------- | -------- |
| autoFocus    | Set focus on input after mount   | boolean                       | -        |
| className    | Optional className for component | string                        | -        |
| customIcon   | Replaces the default edit icon   | ReactNode                     | -        |
| disabled     | Disabled state of component      | boolean                       | -        |
| error        | Error state of component         | boolean                       | -        |
| hideIcon     | Hides input icon                 | boolean                       | -        |
| input        | Properties of the input          | InputProps                    | -        |
| size         | Component size                   | `large` / `normal` / `small`  | `normal` |
| style        | Styles object                    | React.CSSProperties           | -        |
| tooltipTitle | Text of the tooltip on the icon  | string                        | -        |

## InlineSelect API

| Property             | Description                                                                  | Type                | Default  |
| -------------------- | ---------------------------------------------------------------------------- | ------------------- | -------- |
| dataSource           | Items displayed in the dropdown                                              | ListItemProps[]     | -        |
| input                | Input value and event handlers (`onChange` is ignored — use `onValueChange`) | Partial\<InputProps\> | -        |
| autoFocus            | Set focus on input after mount                                               | boolean             | -        |
| className            | Optional className for component                                             | string              | -        |
| disabled             | Disabled state of component                                                  | boolean             | -        |
| dropdownOverlayStyle | Styles object applied to the dropdown overlay wrapper                        | React.CSSProperties | `{}`     |
| dropdownProps        | Props object applied to the dropdown component                               | DropdownProps       | `{}`     |
| error                | Error state of component                                                     | boolean             | -        |
| expanded             | Initial expansion state of dropdown menu                                     | boolean             | -        |
| hideIcon             | Hides the chevron icon                                                       | boolean             | -        |
| initialValue         | Initial displayed text (takes precedence over `placeholder`)                 | string              | -        |
| inputStyle           | Styles applied to the inner input element                                    | React.CSSProperties | -        |
| onValueChange        | Called when a dropdown item is selected                                      | (item: ItemType) => void | -   |
| placeholder          | Default text when no value is selected                                       | string              | -        |
| size                 | Component size                                                               | `normal` / `small`  | `normal` |
| style                | Styles object                                                                | React.CSSProperties | -        |

## InlineEdit input API

| Property     | Description                                                      | Type                                        | Default |
| ------------ | ---------------------------------------------------------------- | ------------------------------------------- | ------- |
| value        | Controlled value                                                 | string \| number                            | -       |
| onChange     | Called when input changes                                        | (event: ChangeEvent\<HTMLInputElement\>) => void | -  |
| name         | Native html name attribute; used to derive the input `id`        | string                                      | -       |
| disabled     | Disabled state                                                   | boolean                                     | -       |
| maxLength    | Maximum characters inside the input element                      | number                                      | -       |
| readOnly     | Readonly state                                                   | boolean                                     | -       |
| placeholder  | Placeholder text                                                 | string                                      | -       |
| autoComplete | Native html autocomplete attribute                               | string                                      | -       |
| onBlur       | Called when input loses focus                                    | FocusEventHandler\<HTMLInputElement\>        | -       |
| onEnterPress | Called when user presses `Enter`; also triggers `blur()`         | KeyboardEventHandler\<HTMLInputElement\>     | -       |
