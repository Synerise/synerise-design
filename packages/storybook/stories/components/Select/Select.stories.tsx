import React from 'react';
import { fn } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/react-vite';
import Select from '@synerise/ds-select';
import type { SelectProps } from '@synerise/ds-select';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
  controlFromOptionsArray,
  fixedWrapper400,
} from '../../utils';
import { Label as AddonLabel } from '../Input/Input.styles';
import { OPTIONS, SelectWithState } from './data';

const { Option } = Select;

const meta: Meta<SelectProps> = {
  title: 'Components/Select',
  component: Select,
  // No `autodocs` tag: Select.mdx is the attached docs (Overview) page. Having
  // both a custom `<Meta of>` MDX and the autodocs tag makes Storybook fail to start.
  decorators: [fixedWrapper400],
  render: (args) => <SelectWithState {...args} />,
  argTypes: {
    mode: {
      ...controlFromOptionsArray('select', ['single', 'multiple', 'tags']),
      mapping: { single: undefined, multiple: 'multiple', tags: 'tags' },
    },
    size: controlFromOptionsArray('select', ['default', 'large']),
    showSearch: BOOLEAN_CONTROL,
    allowClear: BOOLEAN_CONTROL,
    loading: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    readOnly: BOOLEAN_CONTROL,
    error: BOOLEAN_CONTROL,
    grey: BOOLEAN_CONTROL,
    dropdownMatchSelectWidth: BOOLEAN_CONTROL,
    placeholder: REACT_NODE_AS_STRING,
    label: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    errorText: REACT_NODE_AS_STRING,
    tooltip: REACT_NODE_AS_STRING,
    clearTooltip: STRING_CONTROL,
    optionFilterProp: STRING_CONTROL,
    optionLabelProp: STRING_CONTROL,
    listHeight: NUMBER_CONTROL,
    notFoundContent: REACT_NODE_AS_STRING,
    className: CLASSNAME_ARG_CONTROL,
    // ── antd-parity props (reinstated for consumer back-compat) ──
    searchValue: STRING_CONTROL,
    maxLength: NUMBER_CONTROL,
    listItemHeight: NUMBER_CONTROL,
    tabIndex: NUMBER_CONTROL,
    maxTagCount: NUMBER_CONTROL,
    maxTagTextLength: NUMBER_CONTROL,
    showArrow: BOOLEAN_CONTROL,
    autoFocus: BOOLEAN_CONTROL,
    popupClassName: CLASSNAME_ARG_CONTROL,
    // Non-control props (objects / render fns / handlers)
    options: { control: false },
    children: { control: false },
    value: { control: false },
    defaultValue: { control: false },
    filterOption: { control: false },
    tokenSeparators: { control: false },
    dropdownRender: { control: false },
    dropdownStyle: { control: false },
    dropdownClassName: { control: false },
    getPopupContainer: { control: false },
    selectorStyle: { control: false },
    prefixel: { control: false },
    suffixel: { control: false },
    clearIcon: { control: false },
    rowKey: { control: false },
    style: { control: false },
    id: { control: false },
    onChange: { control: false },
    onSelect: { control: false },
    onDeselect: { control: false },
    onSearch: { control: false },
    onBlur: { control: false },
    onFocus: { control: false },
    onDropdownVisibleChange: { control: false },
    onPopupScroll: { control: false },
    // accepted for antd back-compat; no runtime effect
    defaultActiveFirstOption: { control: false },
    // antd-parity handlers / nodes / objects (no control widget)
    onClear: { control: false },
    onClick: { control: false },
    onInputKeyDown: { control: false },
    onKeyDown: { control: false },
    suffixIcon: { control: false },
    maxTagPlaceholder: { control: false },
    dropdownAlign: { control: false },
    open: { control: false },
    defaultOpen: { control: false },
    placement: { control: false },
  },
  args: {
    label: 'Select',
    description: 'Description',
    placeholder: 'Placeholder',
    options: OPTIONS,
    allowClear: true,
    onChange: fn(),
  },
};

export default meta;

type Story = StoryObj<SelectProps>;

// ── Baseline story names (kept so Chromatic diffs against the existing snapshots) ──

/** Single-select. */
export const Default: Story = {
  args: { defaultValue: 'a' },
};

/** Just the selector, without the FormField chrome (`raw`). */
export const RawSelectExample: Story = {
  args: { raw: true, defaultValue: 'a' },
};

/** Label, description, tooltip and an error message together. */
export const LabelDescriptionAndError: Story = {
  args: {
    defaultValue: 'a',
    tooltip: 'Label tooltip',
    errorText: 'Error message content',
    error: true,
  },
};

/** `mode="multiple"` — selected values render as removable chips. */
export const MultipleMode: Story = {
  args: {
    mode: 'multiple',
    defaultValue: ['a', 'b'],
    placeholder: 'Select options',
  },
};

/** Empty dropdown showing the not-found content. */
export const NoResults: Story = {
  args: { options: [], defaultOpen: true, notFoundContent: 'No results' },
};

/** Addon nodes rendered before / after the selector. */
export const WithPrefixAndSuffix: Story = {
  args: {
    prefixel: <AddonLabel>Prefix</AddonLabel>,
    suffixel: <AddonLabel>Suffix</AddonLabel>,
    placeholder: 'Select options',
  },
};

/** `loading` shows a spinner inside the dropdown while options load. */
export const Loading: Story = {
  args: { loading: true, defaultOpen: true },
};

// ── New stories (beyond the baseline set) ──────────────────────────────────────

/** Options provided declaratively via `<Select.Option>` children. */
export const WithOptionChildren: Story = {
  args: { options: undefined },
  render: (args) => (
    <SelectWithState {...args}>
      <Option value="a">Option A</Option>
      <Option value="b">Option B</Option>
      <Option value="c">Option C</Option>
    </SelectWithState>
  ),
};

/** `mode="tags"` — free-text entry via Enter / `tokenSeparators`. */
export const Tags: Story = {
  args: {
    mode: 'tags',
    tokenSeparators: [','],
    placeholder: 'Type and press Enter',
  },
};

/** `showSearch` — type in the selector to filter options. */
export const WithSearch: Story = {
  args: { showSearch: true, placeholder: 'Search…' },
};

/** `disabled` blocks interaction and prevents the dropdown from opening. */
export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'a' },
};
