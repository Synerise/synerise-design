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

| Property    | Description                         | Type    | Default |
| ----------- | ----------------------------------- | ------- | ------- |
| heading     | Heading text                        | string  | -       |
| className   | Class name applied to the element   | string  | -       |
| description | Description text                    | string  | -       |
| withLine    | Whether divider should be displayed | boolean | `false` |

### EditableList

| Property           | Description                                  | Type                                                                                           | Default |
| ------------------ | -------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------- |
| firstInputProps\*  | Enable overwriting first input props         | AutocompleteProps / undefined                                                                  | -       |
| secondInputProps\* | Enable overwriting second input props        | InputProps / undefined                                                                         | -       |
| validation         | Enable validation on first and second column | Record<'validateLeftColumn' / 'validateLeftColumn', (val: string) => string / ReactNode / null | -       |
| addButtonConfig    | Define props for button                      | AddButtonConfigProps / undefined                                                               | -       |

- in order to overwrite f.e. styles in first two columns, it is possible to use spread operator used in component implementation, to overwrite style of third column it is required to import styled component wrapper and overwrite it
