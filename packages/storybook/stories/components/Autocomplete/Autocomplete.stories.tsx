import React from 'react';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import { within, userEvent, fn } from '@storybook/test';
import Autocomplete from '@synerise/ds-autocomplete';
import type { AutocompleteProps } from '@synerise/ds-autocomplete';
import Loader from '@synerise/ds-loader';


import { BOOLEAN_CONTROL, CLASSNAME_ARG_CONTROL, fixedWrapper400, NUMBER_CONTROL, PREFIXCLS_ARG_CONTROL, REACT_NODE_AS_STRING, STRING_CONTROL } from '../../utils';
import { AutocompleteWithState } from "./Autocomplete.data";

const meta: Meta<AutocompleteProps> = {
  title: "Components/InputElements/Autocomplete",
  component: Autocomplete,
  decorators: [fixedWrapper400],
  tags: ['autodocs'],
  argTypes: {
    allowClear: {
      control: 'boolean'
    },
    autoClearSearchValue: {
      control: 'boolean'
    },
    dataSource: { control: false },
    defaultValue: { control: false },
    dropdownAlign: { control: false },
    inputValue: { control: false },
    dropdownRender: { control: false },
    dropdownMatchSelectWidth: BOOLEAN_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
    dropdownStyle: { control: false },
    dropdownClassName: { control: false },
    autoResize: {
      control: 'select',
      options: ['false', 'min & max width', 'stretch to fit'],
      mapping: {
        'false': false,
        'min & max width': { minWidth: '150px', maxWidth: '300px' },
        'stretch to fit': { minWidth: '150px', stretchToFit: true }
      }
    },

    listHeight: NUMBER_CONTROL,
    notFoundContent: REACT_NODE_AS_STRING,
    removeIcon: REACT_NODE_AS_STRING,
    maxLength: NUMBER_CONTROL,
    id: STRING_CONTROL,
    label: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    errorText: REACT_NODE_AS_STRING,
    disabled: BOOLEAN_CONTROL,
    error: BOOLEAN_CONTROL,
    defaultActiveFirstOption: BOOLEAN_CONTROL,
    defaultOpen: BOOLEAN_CONTROL,
    readOnly: BOOLEAN_CONTROL,
    autoFocus: BOOLEAN_CONTROL,

    tooltip: REACT_NODE_AS_STRING,
    prefixCls: PREFIXCLS_ARG_CONTROL,
    popupClassName: { control: false },

    options: { control: false },
    showAction: { control: false },
    onChange: { control: false },
    onClick: { control: false },
    onInputKeyDown: { control: false },
    onSearch: { control: false },
    onSelect: { control: false },
    onMouseEnter: { control: false },
    onMouseLeave: { control: false },
    onMouseDown: { control: false },
    onKeyDown: { control: false },
    onKeyUp: { control: false },
    onDropdownVisibleChange: { control: false },
    onFocus: { control: false },
    onPopupScroll: { control: false },
  },
  args: {
    label: "Select option",
    description: 'Description',
    placeholder: 'Placeholder',
    autoResize: false,
    onChange: fn(),
    onClick: fn(),
    onInputKeyDown: fn(),
    onSearch: fn(),
    onSelect: fn(),
    onMouseEnter: fn(),
    onMouseDown: fn(),
    onKeyDown: fn(),
    onKeyUp: fn(),
    onDropdownVisibleChange: fn(),
    onFocus: fn(),
  },
  render: (args) => <AutocompleteWithState {...args} />
}

export default meta;

export const Primary: StoryObj<AutocompleteProps> = {};

export const Suggestions: StoryObj<AutocompleteProps> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('combobox'));
    await userEvent.type(canvas.getByRole('combobox'), 'pos');
  }
};

export const Loading: StoryObj<AutocompleteProps> = {
  render: (args) => (<Autocomplete {...args}>
    <Autocomplete.Option value="">
      <Loader label="Loading..." />
    </Autocomplete.Option>
  </Autocomplete>),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('combobox'));
  }
}

export const Disabled: StoryObj<AutocompleteProps> = {
  args: {
    label: "Select option",
    description: "Description",
    placeholder: "Placeholder",
    autoResize: false,
    disabled: true
  }
};

export const WithError: StoryObj<AutocompleteProps> = {
  args: {
    label: "Select option",
    description: "Description",
    placeholder: "Placeholder",
    autoResize: false,
    errorText: "Error message"
  }
};