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
    selected={["Selected 1"]}
    suggestions={["Suggestions 1"]}
    onConfirm={console.log}
    onItemAdd={value => ({
      text: value,
    })}
    texts={{ add: 'Add', cancel: 'Cancel', placeholder: "Please select values" }}
  />
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-collector--default"></iframe>

## API

| Property                         | Description                                                            | Type                                          | Default |
| -------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------- | ------- |
| allowMultipleValues              | Enables an option to select multiple values                            | boolean                                       | `false` |
| addButtonProps                   | Props object applied to primary button                                 | ButtonProps                                   | -       |
| cancelButtonProps                | Props object applied to secondary button                               | ButtonProps                                   | -       |
| allowCustomValue                 | Enables an option to add value not included in the suggestions array   | boolean                                       | `false` |
| buttonPanelPrefix                | content to render to the left of the add / cancel buttons              | ReactNode                                     | ---     |
| className                        | Class added to the parent container                                    | string                                        | ---     |
| description                      | Description rendered below the main component                          | string / React.ReactNode                      | ---     |
| disabled                         | Whether the component is disabled.                                     | boolean                                       | `false` |
| disableSearch                    | Disables an option to type value in the input.                         | boolean                                       | `false` |
| disableButtonPanel               | Hides the right-hand side panel with "cancel" and "add" buttons        | boolean                                       | `false` |
| dropdownContent                  | Custom content of the dropdown displayed when component is focused     | React.ReactNode                               | `false` |
| dropdownItemHeight               | Enable setting size in dropdown items                                  | 'large'                                       | ---     |
| enableCustomFilteringSuggestions | Disable filtering suggestions inside component                         | boolean                                       | false   |
| errorText                        | error message, if provided input will be set in error state            | string                                        | ---     |
| error                            | If provided an input will be set in error state, without error message | boolean                                       | ---     |
| fixedHeight                      | If provided, an input will preserve the constant height value          | boolean                                       | `false` |
| label                            | Label rendered above the input                                         | string / React.ReactNode                      | ---     |
| lookupConfig                     | Config for keys used to filter and display suggestions values          | {display: string, filter: string}             | ---     |
| keepSearchQueryOnSelect          | If provided, an input will preserve its value after selecting an item  | boolean                                       | `false` |
| onConfirm                        | Callback executed when user clicks "add" button                        | (values: CollectorValue[]) => void            | ---     |
| onCancel                         | Callback executed when user clicks "cancel" button                     | () => void                                    | ---     |
| onItemSelect                     | Callback executed when user selects an item                            | (value: CollectorValue) => void               | ---     |
| onItemDeselect                   | Callback executed when user removes already selected item              | (value: CollectorValue) => void               | ---     |
| onMultipleItemsSelect            | Callback executed when user pastes multiple items                      | (values: CollectorValue[]) => void            | ---     |
| onItemAdd                        | Callback executed when user adds a custom item to the list.            | (itemName: React.ReactText) => CollectorValue | ---     |
| onSearchValueChange              | Callback executed when user changes the value of the input             | (value: string) => void                       | ---     |
| renderItem                       | Custom function for rendering a custom item inside dropdown            | (value: CollectorValue) => JSX.Element        | ---     |
| showNavigationHints              | Renders navigation hint panel at the bottom of the dropdown            | boolean                                       | `false` |
| searchValue                      | Value of the input                                                     | string                                        | []      |
| selected                         | Array of items which are already selected                              | CollectorValue[]                              | []      |
| suggestions                      | Array of items which are displayed when showing suggestions dropdown   | CollectorValue[]                              | []      |
| texts                            | Texts object for the component                                         | CollectorTexts                                | {}      |
| scrollbarProps                   | Object with scrollbar configturaion                                    | ScrollbarAdditionalProps                      | -       |
| allowPaste                       | Object with scrollbar configturaion                                    | boolean                                       | -       |
| showCount                        | Display item counter above collector                                   | boolean                                       | -       |
| valuesSeparator                  | Multi-value paste delimiter (separator)                                | CollectorValuesSeparator `;`, `/` or `,`      | `;`     |
| listHeader                       | Custom header displayed at the top of the dropdown list                | React.ReactNode                               | -       |
| hideDropdownOnClickOutside       | Specify whether dropdown should be closed on click outside             | boolean                                       | `true`  |

`CollectorValue = {[key:string]: any}`

## CollectorTexts

| Property    | Description                                | Type                     | Default |
| ----------- | ------------------------------------------ | ------------------------ | ------- |
| add         | Text inside primary 'Add' button           | string / React.ReactNode | ---     |
| cancel      | Text inside ghost 'Cancel' button          | string / React.ReactNode | ---     |
| placeholder | Placeholder for the input inside Collector | string                   | ---     |
| toNavigate  | Text inside navigation hint panel          | string / React.ReactNode | ---     |
| toSelect    | Text inside navigation hint panel          | string / React.ReactNode | ---     |
