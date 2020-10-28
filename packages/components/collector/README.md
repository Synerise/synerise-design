---
id: collector
title: Collector
---

Collector UI Component

## Installation

```
npm i @synerise/ds-collector
or
yarn add @synerise/ds-collector
```

## Usage

```
import Collector from '@synerise/ds-collector'

  <Collector
    selected={["Selected 1]}
    suggestions={["Suggestions 1]}
    onConfirm={console.log}
    texts={{ add: 'Add', cancel: 'Cancel', placeholder: "Please select values" }}
  />
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-collector--default"></iframe>

## API

| Property            | Description                                                          | Type                                          | Default |
| ------------------- | -------------------------------------------------------------------- | --------------------------------------------- | ------- |
| allowMultipleValues | Enables an option to select multiple values                          | boolean                                       | `false` |
| allowCustomValue    | Enables an option to add value not included in the suggestions array | boolean                                       | `false` |
| className           | Class added to the parent container                                  | string                                        | ---     |
| description         | Description rendered below the main component                        | string / React.ReactNode                      | ---     |
| disabled            | Whether the component is disabled.                                   | boolean                                       | `false` |
| disableSearch       | Disables an option to type value in the input.                       | boolean                                       | `false` |
| disableButtonPanel  | Hides the right-hand side panel with "cancel" and "add" buttons      | boolean                                       | `false` |
| dropdownContent     | Custom content of the dropdown displayed when component is focused   | React.ReactNode                               | `false` |
| errorText           | error message, if provided input will be set in error state          | string                                        | ---     |
| error               | If provided input will be set in error state, without error message  | boolean                                       | ---     |
| fixedHeight         | If provided, Input will preserve the constant height value           | boolean                                       | `false` |
| label               | Label rendered above the input                                       | string / React.ReactNode                      | ---     |
| lookupConfig        | Config for keys used to filter and display suggestions values        | {display: string, filter: string}             | ---     |
| onConfirm           | Callback executed when user clicks "add" button                      | (values: CollectorValue[]) => void            | ---     |
| onCancel            | Callback executed when user clicks "cancel" button                   | () => void                                    | ---     |
| onDeselect          | Callback executed when user removes already selected item            | (value: CollectorValue) => void               | ---     |
| onItemAdd           | Callback executed when user adds a custom item to the list.          | (itemName: React.ReactText) => CollectorValue | ---     |
| onSearchValueChange | Callback executed when user changes the value of the input           | (value: string) => void                       | ---     |
| showNavigationHints | Renders navigation hint panel at the bottom of the dropdown          | boolean                                       | `false` |
| searchValue         | Value of the input                                                   | string                                        | []      |
| selected            | Array of items which are already selected                            | CollectorValue[]                              | []      |
| suggestions         | Array of items which are displayed when showing suggestions dropdown | CollectorValue[]                              | []      |
| texts               | Texts object for the component                                       | CollectorTexts                                | {}      |

`CollectorValue = {[key:string]: any}`

## CollectorTexts

| Property    | Description                                | Type                     | Default |
| ----------- | ------------------------------------------ | ------------------------ | ------- |
| add         | Text inside primary 'Add' button           | string / React.ReactNode | ---     |
| cancel      | Text inside ghost 'Cancel' button          | string / React.ReactNode | ---     |
| placeholder | Placeholder for the input inside Collector | string                   | ---     |
| toNavigate  | Text inside navigation hint panel          | string / React.ReactNode | ---     |
| toSelect    | Text inside navigation hint panel          | string / React.ReactNode | ---     |
