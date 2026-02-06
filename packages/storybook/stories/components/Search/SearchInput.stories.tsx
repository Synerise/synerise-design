import debounce from 'lodash.debounce';
import React, { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import { SearchInput, SearchInputProps } from '@synerise/ds-search';

import { fixedWrapper300 } from '../../utils';
import DebouncedInput from './DebouncedInput';

type Story = StoryObj<SearchInputProps>;

export default {
  component: SearchInput,
  title: 'Components/Search/SearchInput',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  render: (args) => {
    const [value, setValue] = useState('');
    const handleClear = () => {
      setValue('');
    };
    const handleChange = (newValue: string) => {
      setValue(newValue);
    };
    return (
      <SearchInput
        {...args}
        clearTooltip="Clear"
        searchTooltipProps={{
          title: 'Title',
          description: 'Description',
          type: 'default',
        }}
        placeholder="Search"
        onChange={handleChange}
        value={value}
        onClear={handleClear}
      />
    );
  },
  argTypes: {},
  args: {},
} as Meta<SearchInputProps>;

export const Default: Story = {
  args: {
    closeOnClickOutside: true,
  },
};
export const Expanded: Story = {
  args: {
    alwaysExpanded: true,
  },
};
export const WithDebounce: Story = {
  render: (args) => {
    const [debouncedValue, setDebouncedValue] = useState('');

    return (
      <div style={{ width: '300px' }}>
        <DebouncedInput
          debouncedOnChange={debounce(setDebouncedValue, 500)}
          {...args}
        />
        <div style={{ margin: '10px 0' }}>
          {' '}
          <div style={{ marginRight: '4px', fontWeight: 500 }}>Debounced:</div>
          <p style={{ wordBreak: 'break-all' }}>{debouncedValue}</p>
        </div>
      </div>
    );
  },
  args: {
    alwaysExpanded: true,
  },
};
