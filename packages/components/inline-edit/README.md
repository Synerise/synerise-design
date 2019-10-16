---
id: inline-edit
title: InlineEdit
---

InlineEdit UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-inline-edit--default"></iframe>

## InlineEdit API

| Property            | Description                                             | Type                             | Default  |
| ------------------- | ------------------------------------------------------- | -------------------------------- | -------- |
| onChange            | Called when input chenged                               | function                         | -        |
| autocomplete        | native html autocomplete attribute                      | `on` or `off`                    | `off`    |
| className           | optional className for component                        | string                           | -        |
| disabled            | disabled state of component                             | boolean                          | `false`  |
| error               | error state of component                                | boolean                          | `false`  |
| input               | properties of the input                                 | Check InlineEdit input API below | `false`  |
| maxLength           | maximum characters inside the input element             | number                           | `false`  |
| placeholder         | default text component                                  | string                           | -        |
| size                | component size                                          | `normal` or `small`              | `normal` |
| style               | styles object                                           | Object                           | `false`  |
| tooltipTitle        | text of the tooltip                                     | string                           | -        |
| useFontStyleWatcher | is important to watch input size while content changing | boolean                          | `false`  |
| hideIcon            | hides input icon                                        | boolean                          | `false`  |

## InlineEdit input API

| Property     | Description                 | Type     | Default |     |
| ------------ | --------------------------- | -------- | ------- | --- |
| defaultValue | default input value         | string   | number  | -   |
| disabled     | disabled state of component | boolean  | `false` |     |
| name         | native html name attribute  | string   | -       |     |
| onBlur       | Called when input blured    | function | -       |     |
