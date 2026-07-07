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
    size: controlFromOptionsArray('select', ['small', 'default', 'large']),
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

/** Single-select fed by the `options` prop. */
export const Primary: Story = {};

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

/** `mode="multiple"` — selected values render as removable chips. */
export const Multiple: Story = {
  args: {
    mode: 'multiple',
    defaultValue: ['a', 'b'],
    placeholder: 'Select multiple',
  },
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

/** `errorText` renders a message and applies error styling. */
export const WithError: Story = {
  args: { errorText: 'This field is required', error: true },
};

/** `disabled` blocks interaction and prevents the dropdown from opening. */
export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'a' },
};

/** `loading` shows a spinner inside the dropdown while options load. */
export const Loading: Story = {
  args: { loading: true, defaultOpen: true },
};
