---
id: autocomplete
title: Autocomplete
---

Autocomplete UI Component

## Installation

```
npm i @synerise/ds-autocomplete
or
yarn add @synerise/ds-autocomplete
```

## Usage

```
import Autocomplete from '@synerise/ds-autocomplete'

<Autocomplete />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-autocomplete--default"></iframe>

## API

| Property                               | Description                                                                                                                                                                                                                                              | Type                                                                                                                    | Default                                             |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| allowClear                             | Show clear button, effective in multiple mode only.                                                                                                                                                                                                      | boolean                                                                                                                 | `false`                                             |
| autoFocus                              | get focus when component mounted                                                                                                                                                                                                                         | boolean                                                                                                                 | `false`                                             |
| backfill                               | backfill selected item the input when using keyboard                                                                                                                                                                                                     | boolean                                                                                                                 | `false`                                             |
| children (for customize input element) | customize input element                                                                                                                                                                                                                                  | `HTMLInputElement HTMLTextAreaElement React.ReactElement<InputProps>`                                                   | <Input />                                           |
| children (for dataSource)              | Data source to auto complete                                                                                                                                                                                                                             | `React.ReactElement<OptionProps> Array<React.ReactElement<OptionProps>>`                                                | -                                                   |
| dataSource                             | Data source for autocomplete                                                                                                                                                                                                                             | DataSourceItemType[]                                                                                                    | -                                                   |
| dropdownMenuStyle                      | additional style applied to dropdown menu                                                                                                                                                                                                                | object                                                                                                                  |                                                     |
| defaultActiveFirstOption               | Whether active first option by default                                                                                                                                                                                                                   | boolean                                                                                                                 | `true`                                              |
| defaultValue                           | Initial selected option.                                                                                                                                                                                                                                 | string or string[]                                                                                                      | -                                                   |
| disabled                               | Whether disabled select                                                                                                                                                                                                                                  | boolean                                                                                                                 | -                                                   |
| readonly                               | Whether disabled select with readonly styles applied                                                                                                                                                                                                     | boolean                                                                                                                 | -                                                   |
| filterOption                           | If true, filter options by input, if function, filter options against it. The function will receive two arguments, inputValue and option, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded. | boolean or function(inputValue, option)                                                                                 | `true`                                              |
| optionLabelProp                        | Which prop value of option will render as content of select.                                                                                                                                                                                             | string                                                                                                                  | children                                            |
| placeholder                            | placeholder of input                                                                                                                                                                                                                                     | string                                                                                                                  | -                                                   |
| value                                  | selected option                                                                                                                                                                                                                                          | string or string[] or { key: string, label: string or ReactNode } or Array<{ key: string, label: string or ReactNode }> | -                                                   |
| onBlur                                 | Called when leaving the component.                                                                                                                                                                                                                       | function()                                                                                                              | -                                                   |
| onChange                               | Called when select an option or input value change, or value of input is changed                                                                                                                                                                         | function(value)                                                                                                         | -                                                   |
| onFocus                                | Called when entering the component                                                                                                                                                                                                                       | function()                                                                                                              | -                                                   |
| onSearch                               | Called when searching items.                                                                                                                                                                                                                             | function(value)                                                                                                         | -                                                   |
| onSelect                               | Called when a option is selected. param is option's value and option instance.                                                                                                                                                                           | function(value, option)                                                                                                 | -                                                   |
| defaultOpen                            | Initial open state of dropdown                                                                                                                                                                                                                           | boolean                                                                                                                 | -                                                   |
| open                                   | Controlled open state of dropdown                                                                                                                                                                                                                        | boolean                                                                                                                 | -                                                   |
| onDropdownVisibleChange                | Call when dropdown open                                                                                                                                                                                                                                  | function(open)                                                                                                          | -                                                   |
| getPopupContainer                      | Parent Node which the selector should be rendered to. Default to body. When position issues happen, try to modify it into scrollable content and position it relative.                                                                                   | function(triggerNode)                                                                                                   | document.querySelector(`.ant-select-auto-complete`) |
| errorText                              | error message, if provided input will be set in error state                                                                                                                                                                                              | ReactNode                                                                                                               | -                                                   |
| label                                  | input label                                                                                                                                                                                                                                              | ReactNode                                                                                                               | -                                                   |
| tooltip                                | label tooltip text                                                                                                                                                                                                                                       | ReactNode                                                                                                               | -                                                   |
| tooltipConfig                          | label tooltip additional config                                                                                                                                                                                                                          | TooltipProps see ds-tooltip                                                                                             | -                                                   |
| description                            | input description                                                                                                                                                                                                                                        | ReactNode                                                                                                               | -                                                   |
| autoResize                             | 'resize' width of the input based on width of the text in input                                                                                                                                                                                          | AutoResizeProp                                                                                                          | undefined                                           |

#### AutoResizeProp

```
type AutoResizeProp = `boolean` | {
    minWidth: string;
    maxWidth?: string;
    stretchToFit?: boolean
};
```

Setting `stretchToFit: true` will make the field stretch to fit the containing element. The component observes the width of the wrapper and adjusts the maxWidth accordingly.  
**Important** if the Input is within a flex-item then there is necessary CSS that needs to be applied to the flex-item containers in order for the flex-item to grow to fill the allowed space, but at the same time not stretch the flex container (identical issue happens when text-overflow needs to happen inside a flex-item).

```css
$flexItemSurroundingTheInput {
  min-width: 0;
  flex-grow: 1;
}
```

See https://css-tricks.com/flexbox-truncated-text/ for more details.
