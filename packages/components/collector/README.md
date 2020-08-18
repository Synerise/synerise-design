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

| Property            | Description                                                          | Type                      | Default |
| ------------------- | -------------------------------------------------------------------- | ------------------------- | ------- |
| allowMultipleValues | Enables an option to select multiple values                          | boolean                   | false   |
| allowCustomValue    | Enables an option to add value not included in the suggestions array | boolean                   | false   |
| className           | Class added to the parent container                                  | string                    | ---     |
| description         | Description rendered below the main component                        | string / React.ReactNode  | ---     |
| disabled            | Whether the input is disabled.                                       | boolean                   | false   |
| errorText           | error message, if provided input will be set in error state          | string                    | ---     |
| error               | If provided input will be set in error state, without error message  | boolean                   | ---     |
| fixedHeight         | If provided, Input will preserve the constant height value           | boolean                   | false   |
| label               | Label rendered above the input                                       | string / React.ReactNode  | ---     |
| onConfirm           | Callback executed when user clicks "add" button                      | (values: string[]) =>void | ---     |
| onCancel            | Callback executed when user clicks "cancel" button                   | () =>void                 | ---     |
| showNavigationHints | Renders navigation hint panel at the bottom of the dropdown          | boolean                   | false   |
| selected            | Array of items which are already selected                            | string[]                  | []      |
| suggestions         | Array of items which are displayed when showing suggestions dropdown | string[]                  | []      |
| texts               | Texts object for the component                                       | CollectorTexts            | {}      |

## CollectorTexts

| Property    | Description                                | Type                     | Default |
| ----------- | ------------------------------------------ | ------------------------ | ------- |
| add         | Text inside primary 'Add' button           | string / React.ReactNode | ---     |
| cancel      | Text inside ghost 'Cancel' button          | string / React.ReactNode | ---     |
| placeholder | Placeholder for the input inside Collector | string                   | ---     |
| toNavigate  | Text inside navigation hint panel          | string / React.ReactNode | ---     |
| toSelect    | Text inside navigation hint panel          | string / React.ReactNode | ---     |
