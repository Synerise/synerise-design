---
id: select
title: Select
---

Select UI Component.

A fully DS-native select (no Ant Design): a selector trigger plus a floating options
dropdown built on [`@synerise/ds-dropdown`](https://design.synerise.com/docs/components/dropdown)
(floating-ui) and `@synerise/ds-list-item`, wrapped in a `FormField` label/description/error
layer. Supports single-select, `multiple` (chip selector), `tags` (free-text) and in-selector
search, with full keyboard navigation and combobox/listbox ARIA.

## Installation

```
npm i @synerise/ds-select
or
yarn add @synerise/ds-select
or
pnpm add @synerise/ds-select
```

## Usage

```jsx
import Select from '@synerise/ds-select';

// Options as data
<Select
  label="Platform"
  description="Choose your platform"
  defaultValue="insta"
  options={[
    { value: 'insta', label: 'Instagram' },
    { value: 'fb', label: 'Facebook' },
  ]}
/>;

// Or declarative <Select.Option> children (read only when `options` is absent)
const { Option } = Select;

<Select defaultValue="insta">
  <Option value="insta">Instagram</Option>
  <Option value="fb">Facebook</Option>
</Select>;
```

> There is **no `OptGroup`** — the antd `Select.OptGroup` is intentionally not reimplemented.

## Examples

<iframe src="/storybook-static/iframe.html?id=components-select--default"></iframe>
<iframe src="/storybook-static/iframe.html?id=components-select--multiple-mode"></iframe>
<iframe src="/storybook-static/iframe.html?id=components-select--with-search"></iframe>
<iframe src="/storybook-static/iframe.html?id=components-select--tags"></iframe>

## API

`Select` also extends `FormFieldCommonProps` (`label`, `description`, `errorText`, `tooltip`,
`tooltipConfig`) and `AriaAttributes`, and forwards native `data-*` / `aria-*` attributes to the
select root.

### Value & selection

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| value / defaultValue | Controlled / uncontrolled value. Array for `multiple` / `tags`. | `SelectValue` (`string \| number \| (string \| number)[]`) | - |
| mode | Omit for single-select; `multiple` = chips; `tags` = free-text create. | `'multiple' \| 'tags'` | - |
| onChange | Fired when the selection changes. | `(value, option?) => void` | - |
| onSelect / onDeselect | Fired when an option is added / removed. | `(value, option?) => void` | - |
| onClear | Fired when the clear affordance is used. | `() => void` | - |
| allowClear | Show a clear control (replaces the chevron on hover) when a value is set. | `boolean` | `false` |
| clearIcon | Custom clear icon. | `ReactNode` | - |
| clearTooltip | Tooltip on hover of the clear button. | `string` | - |

### Options & search

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| options | Options as data; when absent, `<Select.Option>` children are read. | `SelectOption[]` | - |
| showSearch | Render an in-selector search input. | `boolean` | `false` |
| searchValue | Controlled search-input value (pairs with `onSearch`). | `string` | - |
| onSearch | Fired on each keystroke in the search input (remote search). | `(value: string) => void` | - |
| filterOption | Client filtering. `false` = remote (feed `options` from `onSearch`); a function = custom predicate. | `boolean \| ((input, option) => boolean)` | `true` |
| optionFilterProp | Option field the built-in filter matches against. | `string` | label |
| optionLabelProp | Option field rendered in the selector. | `string` | label |
| notFoundContent | Shown when there are no (filtered) options. | `ReactNode` | `'No data'` |
| tokenSeparators | Characters that create a tag in `tags` mode. | `string[]` | - |
| loading | Show a spinner inside the dropdown. | `boolean` | `false` |
| rowKey | Item key extractor for options / children. | `(option) => Key` | - |

### Dropdown

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| open / defaultOpen | Controlled / initial dropdown visibility. | `boolean` | - |
| onDropdownVisibleChange | Fired when dropdown visibility changes. | `(open: boolean) => void` | - |
| getPopupContainer | Container the floating dropdown mounts into. | `(node: HTMLElement) => HTMLElement \| ParentNode \| null` | ds-utils default |
| placement | Dropdown placement. | `DropdownPlacement` | - |
| dropdownClassName / popupClassName | Class on the dropdown overlay (`popupClassName` is the antd v4 alias). | `string` | - |
| dropdownAlign | Dropdown alignment config (accepted for compatibility). | `object` | - |
| dropdownStyle | Inline style on the dropdown overlay. | `CSSProperties` | - |
| dropdownMatchSelectWidth | Match dropdown width to the selector; a number fixes the width (px). | `boolean \| number` | `true` |
| dropdownRender | Wrap the rendered option menu (custom footer / scroll container). | `(menu: ReactElement) => ReactNode` | - |
| listHeight | Max dropdown list height (px). | `number \| string` | `256` |
| listItemHeight | Fixed height per option row (accepted; list is non-virtualised). | `number` | - |

### Display & tags

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| placeholder | Placeholder of the select. | `ReactNode` | - |
| showArrow | Show the dropdown chevron. | `boolean` | `true` |
| suffixIcon | Custom icon replacing the dropdown arrow. | `ReactNode` | - |
| maxTagCount | Max tags shown before collapsing (multiple / tags). | `number` | - |
| maxTagTextLength | Max characters per tag. | `number` | - |
| maxTagPlaceholder | Node shown for the collapsed overflow count. | `ReactNode` | - |
| size | Selector height. | `'default' \| 'middle' \| 'large'` | `'default'` |
| grey | `grey-050` selector background (when not in error state). | `boolean` | `false` |

### State & focus

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| disabled | Disabled state; blocks interaction and opening. | `boolean` | `false` |
| readOnly | Non-interactive with readable styling (white bg, `default` cursor, `grey-600` text) instead of the disabled look. | `boolean` | - |
| error | Error visual state without a message. | `boolean` | - |
| errorText | Error message below the field; also activates the error state. | `ReactNode` | - |
| autoFocus | Focus the selector / search input on mount. | `boolean` | `false` |
| defaultActiveFirstOption | Highlight the first option when the dropdown opens. | `boolean` | - |
| tabIndex | Tab index forwarded to the selector / search input. | `number` | - |
| onFocus / onBlur | Fired when focus enters / leaves the whole select. | `(event) => void` | - |
| onClick | Click handler on the selector box. | `(event) => void` | - |
| onKeyDown / onInputKeyDown | Keydown on the selector / on the inner search input. | `(event) => void` | - |

### Layout & DS-specific

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| label / description / tooltip / tooltipConfig | `FormField` chrome (label, helper text, info tooltip). | `ReactNode` / `TooltipProps` | - |
| prefixel / suffixel | Addon nodes attached to the left / right of the selector (shared border). | `ReactNode` | - |
| raw | Skip the `FormField` wrapper; render only the selector. `ref` attaches to the selector wrapper. | `boolean` | - |
| asFormElement | Force a 16 px bottom margin even when `errorText` / `description` are absent. | `boolean` | - |
| selectorStyle | Inline style object applied to the selector box. | `CSSObject` | - |
| style | Applied to the selector wrapper (flex row: selector + addons). | `CSSProperties` | - |
| className | Added to the outer container. | `string` | - |
| id | Forwarded to the search input. | `string` | - |

### `Select.Option` props

Marker component — renders nothing; `Select` reads its props to build the option list when the
`options` prop is absent.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| value | Option value. Optional — falls back to the element's React `key` when omitted. | `string \| number` | - |
| children | Rendered content / label of the option. | `ReactNode` | - |
| label | Rendered in the selector instead of `children` (antd `optionLabelProp`). | `ReactNode` | - |
| disabled | Disable this option. | `boolean` | `false` |
| title | Native hover title (any node; coerced to a string at render). | `ReactNode` | - |
| style | Forwarded to the rendered option row. | `CSSProperties` | - |
| className | Added to the option row. | `string` | - |

## Exports

```ts
import Select, {
  Option,
  SelectStyles, // styled-components namespace (Selector, SelectWrapper, …)
  getOptionsFromChildren,
  findOption,
} from '@synerise/ds-select';

import type {
  SelectProps,
  SelectValue,
  SelectOption,
  SelectMode,
  SelectHandler,
  RawValueType,
  FilterOptionFn,
  OptionProps,
} from '@synerise/ds-select';
```

## Notes

- **Class hooks are `ds-select-*`** — the antd `.ant-select-*` classes are gone; target
  `.ds-select`, `.ds-select-wrapper`, `.ds-select-selection-item`, `.ds-select-dropdown`, etc.
- **Remote search** — set `filterOption={false}` and update `options` from your `onSearch`
  handler; the component won't filter locally in that mode.
- **Keyboard & ARIA** — Arrow / Home / End / Enter / Escape / Space (and Backspace to drop the
  last chip in multiple mode), with combobox / listbox `aria-activedescendant`.
- **Not reimplemented from antd** — `OptGroup`, `labelInValue` / `LabeledValue`,
  `autoClearSearchValue`, `firstActiveValue`, `menuItemSelectedIcon`, `onPopupScroll`.
