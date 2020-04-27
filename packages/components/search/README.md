---
id: search
title: Search
---

Search UI Component

## Installation

```
npm i @synerise/ds-search
or
yarn add @synerise/ds-search
```

## Usage

```
import Search from '@synerise/ds-search'

<Search />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-search--default"></iframe>

## API

| Property                | Description                                                                           | Type         | Default |
| ----------------------- | ------------------------------------------------------------------------------------- | ------------ | ------- |
| placeholder             | Input placeholder                                                                     | string       | -       |
| clearTooltip            | Clear button tooltip text                                                             | string       | -       |
| parameters              | Parameters items data diplayed in search dropdown                                     | object[]     | -       |
| recent                  | Recent items data diplayed in search dropdown                                         | object[]     | -       |
| suggestions             | Suggestions items data diplayed after picking particular parameter in search dropdown | object[]     | -       |
| onValueChange           | Callback when input changes                                                           | function     | -       |
| value                   | The input content value                                                               | string       | -       |
| parameterValue          | Chosen parameter type                                                                 | string       | -       |
| onParameterValueChange  | Callback when set parameter type                                                      | function     | -       |
| width                   | Width of the search input when expanded                                               | number       | -       |
| parametersDisplayProps  | An object containing the details of how parameters list should render                 | DataSetProps | -       |
| recentDisplayProps      | An object containing the details of how recent items list should render               | DataSetProps | -       |
| suggestionsDisplayProps | An object containing the details of how suggestions list should render                | DataSetProps | -       |

### DataSetProps

| Property    | Description                                                                     | Type         | Default |
| ----------- | ------------------------------------------------------------------------------- | ------------ | ------- |
| title       | Title of the item list                                                          | string       | -       |
| tooltip     | Tooltip of the item list, displayed when hovering on the icon next to the title | string       | -       |
| rowHeight   | Height of item in the list                                                      | number       | -       |
| visibleRows | Number of rows visible in the list                                              | string       | -       |
| itemRender  | Function rendering single item of the list                                      | function     | -       |
| divider     | ReactElement displayed at the bottom of the list                                | ReactElement | -       |

### SearchInput

| Property            | Description                                                               | Type     | Default |
| ------------------- | ------------------------------------------------------------------------- | -------- | ------- |
| placeholder         | Input placeholder                                                         | string   | -       |
| clearTooltip        | Clear button tooltip text                                                 | string   | -       |
| onValueChange       | Callback when input changes                                               | function | -       |
| value               | The input content value                                                   | string   | -       |
| onClear             | Callback after clicking clear button                                      | function | -       |
| onKeyDown           | Callback executed when pressing a keyboard key.                           | function | -       |
| onClick             | Callback executed when clicking inside an input                           | function | -       |
| onButtonClick       | Callback executed when clicking search button                             | function | -       |
| filterLabel         | Label displayed on the left-hand side of the input caret                  | object   | -       |
| focusTrigger        | Boolean value for triggering focus on the input                           | boolean  | -       |
| toggleTrigger       | Boolean value for triggering expanding / narrowing the input              | boolean  | -       |
| onToggle            | Callback executed when expanding / narrowing the input wrapper            | function | -       |
| alwaysHighlight     | When set, the input always has blue border when expanded                  | boolean  | false   |
| alwaysExpanded      | Boolean value to force expanded state of the input                        | boolean  | false   |
| closeOnClickOutside | Boolean value to prevent / force toggling the input when clicking outside | boolean  | false   |
