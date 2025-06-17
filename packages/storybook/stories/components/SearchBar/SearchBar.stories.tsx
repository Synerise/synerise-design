import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/preview-api';

import SearchBar, { SearchBarProps } from '@synerise/ds-search-bar';
import Icon, { SearchM } from '@synerise/ds-icon';

import { theme } from '@synerise/ds-core';

import { BOOLEAN_CONTROL, fixedWrapper300, REACT_NODE_AS_STRING, STRING_CONTROL } from '../../utils';

type Story = StoryObj<SearchBarProps>;

export default {
  component: SearchBar,
  title: 'Components/Search/SearchBar',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  render: args => {
    const [{ value }, updateArgs] = useArgs();
    const handleClearInput = () => {
      updateArgs({ value: '' });
    };
    const handleSearchChange = (newValue: string) => {
      updateArgs({ value: newValue });
    };
    return <SearchBar {...args} value={value} onClearInput={handleClearInput} onSearchChange={handleSearchChange} />;
  },
  argTypes: {
    disabled: BOOLEAN_CONTROL,
    borderRadius: BOOLEAN_CONTROL,
    autofocus: BOOLEAN_CONTROL,
    placeholder: STRING_CONTROL,
    valuePrefix: STRING_CONTROL,
    clearTooltip: REACT_NODE_AS_STRING,
  },
  args: {
    iconLeft: <Icon component={<SearchM />} color={theme.palette['grey-600']} />,
    placeholder: 'Placeholder',
    clearTooltip: 'Clear',
  },
} as Meta<SearchBarProps>;

export const Default: Story = {};
export const Autofocus: Story = {
  args: {
    autofocus: true
  }
};
export const Populated: Story = {
  args: {
    value: 'Search query'
  }
};
