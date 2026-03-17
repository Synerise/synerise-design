---
id: form
title: Form
---

Form UI Component

## Installation

```
npm i @synerise/ds-form
or
yarn add @synerise/ds-form
```

## Usage

```
import Form from '@synerise/ds-form'

<Form />

```

## Deprecated Features

The Form and EditableList components have been deprecated and replaced by EditableItemsList component. Please refer to the [EditableItemsList](../editable-items-list) documentation for more information on how to transition to the new component.

## Demo

<iframe src="/storybook-static/iframe.html?id=components-form--default"></iframe>

## API

### Form.FieldSet

| Property    | Description                         | Type        | Default |
| ----------- | ----------------------------------- | ----------- | ------- |
| heading     | Heading text                        | `ReactNode` | -       |
| className   | Class name applied to the element   | `string`    | -       |
| description | Description text                    | `ReactNode` | -       |
| withLine    | Whether divider should be displayed | `boolean`   | -       |

### EditableList

| Property               | Description                                               | Type                                                          | Default                     |
| ---------------------- | --------------------------------------------------------- | ------------------------------------------------------------- | --------------------------- |
| value                  | Controlled rows array                                     | `EditableParam[]`                                             | -                           |
| onChange               | Called after any name/value change                        | `(params: EditableParam[]) => void`                           | -                           |
| leftColumnName         | Label above the first column (row 0 only)                 | `ReactNode`                                                   | -                           |
| rightColumnName        | Label above the second column (row 0 only)                | `ReactNode`                                                   | -                           |
| autocompleteOptions    | Option children for the Autocomplete in each row          | `ReactNode`                                                   | -                           |
| onSearch               | Forwarded to Autocomplete.onSearch                        | `(query: string) => void`                                     | -                           |
| onClickDelete          | Custom delete handler; omit to remove from internal state | `(param?, index?, params?) => void`                           | -                           |
| addButtonConfig        | Define props for the add-row button                       | `{ textAddButton?, disableAddButton?, onClickAddRow? }`       | -                           |
| validation             | Per-field validation; return error node or falsy          | `{ validateLeftColumn?, validateRightColumn? }`               | -                           |
| firstInputProps\*      | Overwrite first column (Autocomplete) props               | `AutocompleteProps`                                           | `{ style: { width: 350 } }` |
| secondInputProps\*     | Overwrite second column (Input) props                     | `InputProps`                                                  | `{ style: { width: 300 } }` |
| renderAddButton        | Replace the default add-row button                        | `(params?) => JSX.Element`                                    | -                           |
| renderLeftColumn       | Replace the Autocomplete for each row                     | `(param, index) => JSX.Element`                               | -                           |
| renderRightColumn      | Replace the Input for each row                            | `(param, index) => JSX.Element`                               | -                           |
| renderAdditionalColumn | Append a column after the two defaults in each row        | `(rows) => JSX.Element`                                       | -                           |
| renderActions          | `true` = Cruds delete; function = custom actions          | `boolean \| ((param, idx, params, callbacks) => JSX.Element)` | -                           |

- in order to overwrite f.e. styles in first two columns, it is possible to use spread operator used in component implementation, to overwrite style of third column it is required to import styled component wrapper and overwrite it
