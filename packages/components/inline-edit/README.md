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

| Property     | Description                      | Type                             | Default  |
| ------------ | -------------------------------- | -------------------------------- | -------- |
| className    | optional className for component | string                           | -        |
| disabled     | disabled state of component      | boolean                          | `false`  |
| error        | error state of component         | boolean                          | `false`  |
| input        | properties of the input          | Check InlineEdit input API below | `false`  |
| size         | component size                   | `normal` or `small`              | `normal` |
| style        | styles object                    | Object                           | `false`  |
| tooltipTitle | text of the tooltip              | string                           | -        |
| hideIcon     | hides input icon                 | boolean                          | `false`  |

## InlineEdit input API

| Property     | Description                                     | Type          | Default |     |
| ------------ | ----------------------------------------------- | ------------- | ------- | --- |
| defaultValue | default input value                             | string        | number  | -   |
| disabled     | disabled state of component                     | boolean       | `false` | -   |
| name         | native html name attribute                      | string        | -       | -   |
| onBlur       | Called when input blured                        | function      | -       | -   |
| onEnterPress | Called when user press `Enter` in focused input | function      | -       | -   |
| onChange     | Called when input chenged                       | function      | -       | -   |
| autocomplete | native html autocomplete attribute              | `on` or `off` | `off`   | -   |
| maxLength    | maximum characters inside the input element     | number        | `false` | -   |
| placeholder  | default text component                          | string        | -       | -   |
