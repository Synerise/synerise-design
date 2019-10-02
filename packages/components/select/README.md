---

id: select
title: Select

---

Select UI Component

## Select default

<iframe src="/storybook-static/iframe.html?id=components-select-basic--default"></iframe>

## Select multiple mode

<iframe src="/storybook-static/iframe.html?id=components-select--multiple-mode"></iframe>

## Select with options group

<iframe src="/storybook-static/iframe.html?id=components-select--with-optgroup"></iframe>

## API

### Select props

| Property                 | Description                                                                                       | Type                                                                         | Default                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------- |
| errorText                | error message, if provided input will be set in error state                                       | string                                                                       | -                                            |
| label                    | input label                                                                                       | string                                                                       | -                                            |
| description              | input description                                                                                 | string                                                                       | -                                            |
| allowClear               | Show clear button.                                                                                | boolean                                                                      | false                                        |
| autoClearSearchValue     | Whether the current search will be cleared on selecting an item                                   | boolean                                                                      | true                                         |
| autoFocus                | Get focus by default                                                                              | boolean                                                                      | false                                        |
| defaultActiveFirstOption | Whether active first option by default                                                            | boolean                                                                      | true                                         |
| defaultValue             | Initial selected option.                                                                          | `string or string[] or number or number[] LabeledValue or LabeledValue[]`    | -                                            |
| disabled                 | Whether disabled select                                                                           | boolean                                                                      | false                                        |
| dropdownClassName        | className of dropdown menu                                                                        | string                                                                       | -                                            |
| dropdownMatchSelectWidth | Whether dropdown's width is same with select.                                                     | boolean                                                                      | true                                         |
| dropdownRender           | Customize dropdown content                                                                        | (menuNode: ReactNode, props) => ReactNode                                    | -                                            |
| dropdownStyle            | style of dropdown menu                                                                            | object                                                                       | -                                            |
| dropdownMenuStyle        | additional style applied to dropdown menu                                                         | object                                                                       | -                                            |
| filterOption             | If true, filter options by input, if function, filter options against it.                         | boolean or function(inputValue, option)                                      | true                                         |
| firstActiveValue         | Value of action option by default                                                                 | string or string[]                                                           | -                                            |
| getPopupContainer        | Parent Node which the selector should be rendered to. Default to body                             | function(triggerNode)                                                        | () => document.body                          |
| labelInValue             | whether to embed label in value                                                                   | boolean                                                                      | false                                        |
| maxTagCount              | Max tag count to show                                                                             | number                                                                       | -                                            |
| maxTagTextLength         | Max tag count to show                                                                             | number                                                                       | -                                            |
| maxTagPlaceholder        | Placeholder for not showing tags                                                                  | ReactNode/function(omittedValues)                                            | -                                            |
| mode                     | Set mode of Select                                                                                | 'default' or 'multiple' or 'tags'                                            | 'default'                                    |
| notFoundContent          | Specify content to show when no result matches.                                                   | string                                                                       | 'Not Found'                                  |
| optionFilterProp         | Which prop value of option will be used for filter if filterOption is true                        | string                                                                       | value                                        |
| optionLabelProp          | Which prop value of option will render as content of select.                                      | string                                                                       | value for combobox, children for other modes |
| placeholder              | Placeholder of select                                                                             | string or ReactNode                                                          | -                                            |
| showArrow                | Whether to show the drop-down arrow                                                               | boolean                                                                      | true                                         |
| showSearch               | Whether show search input in single mode.                                                         | boolean                                                                      | false                                        |
| size                     | Size of Select input. default large small                                                         | string                                                                       | default                                      |
| suffixIcon               | The custom suffix icon                                                                            | ReactNode                                                                    | -                                            |
| removeIcon               | The custom remove icon                                                                            | ReactNode                                                                    | -                                            |
| clearIcon                | The custom clear icon                                                                             | ReactNode                                                                    | -                                            |
| menuItemSelectedIcon     | The custom menuItemSelected icon with multiple options                                            | ReactNode                                                                    | -                                            |
| tokenSeparators          | Separator used to tokenize on tag/multiple mode                                                   | string[]                                                                     |                                              |
| value                    | Current selected option.                                                                          | `string or string[] or number or number[] or LabeledValue or LabeledValue[]` | -                                            |
| onBlur                   | Called when blur                                                                                  | function                                                                     | -                                            |
| onChange                 | Called when select an option or input value change, or value of input is changed in combobox mode | function(value, option:Option/Array<Option>)                                 | -                                            |
| onDeselect               | Called when a option is deselected, param is the selected option's value.                         | function(string or number or LabeledValue)                                   | -                                            |
| onFocus                  | Called when focus                                                                                 | function                                                                     | -                                            |
| onInputKeyDown           | Called when key pressed                                                                           | function                                                                     | -                                            |
| onMouseEnter             | Called when mouse enter                                                                           | function                                                                     | -                                            |
| onMouseLeave             | Called when mouse leave                                                                           | function                                                                     | -                                            |
| onPopupScroll            | Called when dropdown scrolls                                                                      | function                                                                     | -                                            |
| onSearch                 | Callback function that is fired when input changed.                                               | function(value: string)                                                      |                                              |
| onSelect                 | Called when a option is selected, the params are option's value (or key) and option instance.     | `function(string or number or LabeledValue, option:Option)`                  | -                                            |
| defaultOpen              | Initial open state of dropdown                                                                    | boolean                                                                      | -                                            |
| open                     | Controlled open state of dropdown                                                                 | boolean                                                                      | -                                            |
| onDropdownVisibleChange  | Call when dropdown open                                                                           | function(open)                                                               | -                                            |
| loading                  | indicate loading state                                                                            | Boolean                                                                      | false                                        |

### Option props

| Property  | Description                                                                                                                      | Type   | Default |
| --------- | -------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- |
| disabled  | Disable this option boolean false                                                                                                |        |         |
| key       | Same usage as value. If React request you to set this property, you can set it to value of option, and then omit value property. | string |         |
| title     | title of Select after select this Option                                                                                         | string | -       |
| value     | default to filter with this property string                                                                                      | number | -       |
| className | additional class to option string                                                                                                | -      |         |

### Option group props

| Property | Description | Type                     | Default |     |
| -------- | ----------- | ------------------------ | ------- | --- |
| key      |             | string                   | -       |     |
| label    | Group label | `string | React.Element` | -       |
