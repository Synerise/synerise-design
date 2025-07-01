---
id: select
title: Select
---

Select UI Component

Based on [Ant Design Select](https://ant.design/components/select/)

## Installation

```
npm i @synerise/ds-select
or
yarn add @synerise/ds-select
```

## Usage

```jsx
import Select from '@synerise/ds-select';

const { Option, OptGroup } = Select;

<Select defaultValue="insta">
  <OptGroup label="Platform">
    <Option value="insta">Instagram</Option>
    <Option value="fb">Facebook</Option>
  </OptGroup>
  <OptGroup label="Followers">
    <Option value="1M">1 Million</Option>
    <Option value="1B">1 Billion</Option>
  </OptGroup>
</Select>;
```

## Select default

<iframe src="/storybook-static/iframe.html?id=components-select-basic--default"></iframe>

## Select multiple mode

<iframe src="/storybook-static/iframe.html?id=components-select--multiple-mode"></iframe>

## Select with options group

<iframe src="/storybook-static/iframe.html?id=components-select--with-optgroup"></iframe>

## API

### Select props

| Property                 | Description                                                                                       | Type                                                                              | Default                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------- |
| allowClear               | Show clear button.                                                                                | boolean                                                                           | `false`                                      |
| autoClearSearchValue     | Whether the current search will be cleared on selecting an item                                   | boolean                                                                           | `true`                                       |
| autoFocus                | Get focus by default                                                                              | boolean                                                                           | `false`                                      |
| clearIcon                | The custom clear icon                                                                             | React.ReactNode                                                                   | -                                            |
| defaultActiveFirstOption | Whether active first option by default                                                            | boolean                                                                           | `true`                                       |
| defaultOpen              | Initial open state of dropdown                                                                    | boolean                                                                           | -                                            |
| defaultValue             | Initial selected option.                                                                          | `string` / `string[]` / `number` / `number[]` / `LabeledValue` / `LabeledValue[]` | -                                            |
| description              | input description                                                                                 | string                                                                            | -                                            |
| disabled                 | Whether disabled select                                                                           | boolean                                                                           | `false`                                      |
| dropdownClassName        | className of dropdown menu                                                                        | string                                                                            | -                                            |
| dropdownMatchSelectWidth | Whether dropdown's width is same with select.                                                     | boolean                                                                           | `true`                                       |
| dropdownMenuStyle        | additional style applied to dropdown menu                                                         | React.CSSProperties                                                               | -                                            |
| dropdownRender           | Customize dropdown content                                                                        | (menuNode: React.ReactNode, props) => React.ReactNode                             | -                                            |
| dropdownStyle            | style of dropdown menu                                                                            | React.CSSProperties                                                               | -                                            |
| errorText                | error message, if provided input will be set in error state                                       | string                                                                            | -                                            |
| error                    | if provided input will be set in error state, without error message                               | boolean                                                                           | -                                            |
| filterOption             | If true, filter options by input, if function, filter options against it.                         | boolean / (inputValue: string / number / LabeledValue, option: Option) => void    | `true`                                       |
| firstActiveValue         | Value of action option by default                                                                 | string or string[]                                                                | -                                            |
| grey                     | Turn on grey background of the component                                                          | boolean                                                                           | false                                        |
| getPopupContainer        | Parent Node which the selector should be rendered to. Default to body                             | (triggerNode: React.ReactNode) => void                                            | () => document.body                          |
| label                    | input label                                                                                       | string                                                                            | -                                            |
| labelInValue             | whether to embed label in value                                                                   | boolean                                                                           | `false`                                      |
| loading                  | indicate loading state                                                                            | Boolean                                                                           | `false`                                      |
| maxTagCount              | Max tag count to show                                                                             | number                                                                            | -                                            |
| maxTagPlaceholder        | Placeholder for not showing tags                                                                  | React.ReactNode/function(omittedValues)                                           | -                                            |
| maxTagTextLength         | Max tag count to show                                                                             | number                                                                            | -                                            |
| menuItemSelectedIcon     | The custom menuItemSelected icon with multiple options                                            | React.ReactNode                                                                   | -                                            |
| mode                     | Set mode of Select                                                                                | `default` / `multiple` / `tags`                                                   | `default`                                    |
| notFoundContent          | Specify content to show when no result matches.                                                   | string                                                                            | `Not Found`                                  |
| onBlur                   | Called when blur                                                                                  | (e: Event) => void                                                                | -                                            |
| onChange                 | Called when select an option or input value change, or value of input is changed in combobox mode | (value: string / number / LabeledValue, option: Option / Option[]) => void        | -                                            |
| onDeselect               | Called when a option is deselected, param is the selected option's value.                         | (value: string / number / LabeledValue) => void                                   | -                                            |
| onDropdownVisibleChange  | Call when dropdown open                                                                           | (open: boolean) => void                                                           | -                                            |
| onFocus                  | Called when focus                                                                                 | (e: Event) => void                                                                | -                                            |
| onInputKeyDown           | Called when key pressed                                                                           | (e: Event) => void                                                                | -                                            |
| onMouseEnter             | Called when mouse enter                                                                           | (e: Event) => void                                                                | -                                            |
| onMouseLeave             | Called when mouse leave                                                                           | (e: Event) => void                                                                | -                                            |
| onPopupScroll            | Called when dropdown scrolls                                                                      | (e: Event) => void                                                                | -                                            |
| onSearch                 | Callback function that is fired when input changed.                                               | (value: string) => void                                                           |                                              |
| onSelect                 | Called when a option is selected, the params are option's value (or key) and option instance.     | (value: string / number / LabeledValue, option:Option) => void                    | -                                            |
| open                     | Controlled open state of dropdown                                                                 | boolean                                                                           | -                                            |
| optionFilterProp         | Which prop value of option will be used for filter if filterOption is `true`                      | string                                                                            | value                                        |
| optionLabelProp          | Which prop value of option will render as content of select.                                      | string                                                                            | value for combobox, children for other modes |
| placeholder              | Placeholder of select                                                                             | string / React.ReactNode                                                          | -                                            |
| removeIcon               | The custom remove icon                                                                            | React.ReactNode                                                                   | -                                            |
| showArrow                | Whether to show the drop-down arrow                                                               | boolean                                                                           | `true`                                       |
| showSearch               | Whether show search input in single mode.                                                         | boolean                                                                           | `false`                                      |
| size                     | Size of Select input. `default` or `large`. `small` is deprecated                                 | string                                                                            | `default`                                    |
| suffixIcon               | The custom suffix icon                                                                            | React.ReactNode                                                                   | -                                            |
| tokenSeparators          | Separator used to tokenize on tag/multiple mode                                                   | string[]                                                                          |                                              |
| tooltip                  | Tooltip content                                                                                   | React.ReactNode                                                                   | -                                            |
| tooltipConfig            | Config of tooltip                                                                                 | [TooltipProps](https://design.synerise.com/docs/components/tooltip#api)           | -                                            |
| value                    | Current selected option.                                                                          | `string` / `string[]` / `number` / `number[]` / `LabeledValue` / `LabeledValue[]` | -                                            |

### Option props

| Property  | Description                                                                                                                      | Type   | Default |
| --------- | -------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- |
| disabled  | Disable this option boolean`false`                                                                                               |        |         |
| key       | Same usage as value. If React request you to set this property, you can set it to value of option, and then omit value property. | string |         |
| title     | title of Select after select this Option                                                                                         | string | -       |
| value     | default to filter with this property string                                                                                      | number | -       |
| className | additional class to option string                                                                                                | -      |         |

### Option group props

| Property | Description      | Type    | Default        |     |
| -------- | ---------------- | ------- | -------------- | --- |
| key      | Key of an option | string  | -              |     |
| label    | Group label      | `string | React.Element` | -   |
