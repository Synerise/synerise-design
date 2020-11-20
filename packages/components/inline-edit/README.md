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

| Property     | Description                      | Type                | Default  |
| ------------ | -------------------------------- | ------------------- | -------- |
| autoFocus    | Set focus on input after mount   | boolean             | `false`  |
| className    | Optional className for component | string              | -        |
| disabled     | Disabled state of component      | boolean             | `false`  |
| error        | Error state of component         | boolean             | `false`  |
| hideIcon     | Hides input icon                 | boolean             | `false`  |
| input        | Properties of the input          | InlineEditInput     | `false`  |
| size         | Component size                   | `normal` / `small`  | `normal` |
| style        | Styles object                    | React.CSSProperties | -        |
| tooltipTitle | Text of the tooltip              | string              | -        |

## InlineSelect API

| Property             | Description                                           | Type                                                                              | Default  |
| -------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------- | -------- |
| autoFocus            | Set focus on input after mount                        | boolean                                                                           | `false`  |
| className            | Optional className for component                      | string                                                                            | -        |
| dataSource           | Menu items displayed in the dropdown                  | [MenuItemProps[]](https://design.synerise.com/docs/components/menu#menuitemprops) | []       |
| disabled             | Disabled state of component                           | boolean                                                                           | `false`  |
| dropdownOverlayStyle | Styles object applied to the dropdown overlay wrapper | React.CSSProperties                                                               | {}       |
| dropdownProps        | Props object applied to the dropdown component        | DropdownProps                                                                     | {}       |
| error                | Error state of component                              | boolean                                                                           | `false`  |
| expanded             | Initial expansion state of dropdown menu              | boolean                                                                           | `false`  |
| hideIcon             | Hides input icon                                      | boolean                                                                           | `false`  |
| input                | Properties of the input                               | InlineEditInput                                                                   | `false`  |
| placeholder          | Default text of the select                            | string                                                                            | -        |
| size                 | Component size                                        | `normal` / `small`                                                                | `normal` |
| style                | Styles object                                         | React.CSSProperties                                                               | -        |
| tooltipTitle         | Text of the tooltip                                   | string                                                                            | -        |

## InlineEdit input API

| Property     | Description                                     | Type         | Default |     |
| ------------ | ----------------------------------------------- | ------------ | ------- | --- |
| autocomplete | Native html autocomplete attribute              | `on` / `off` | `off`   | -   |
| defaultValue | Default input value                             | string       | number  | -   |
| disabled     | Disabled state of component                     | boolean      | `false` | -   |
| maxLength    | Maximum characters inside the input element     | number       | `false` | -   |
| name         | Native html name attribute                      | string       | -       | -   |
| placeholder  | Default text component                          | string       | -       | -   |
| onBlur       | Called when input blured                        | function     | -       | -   |
| onEnterPress | Called when user press `Enter` in focused input | function     | -       | -   |
| onChange     | Called when input chenged                       | function     | -       | -   |
