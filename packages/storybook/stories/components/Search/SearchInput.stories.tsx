import debounce from 'lodash.debounce';
import React, { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput, SearchInputProps } from '@synerise/ds-search';

import {
  BOOLEAN_CONTROL,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
  fixedWrapper300,
} from '../../utils';
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
  argTypes: {
    value: {
      control: false,
      table: { type: { summary: 'string' }, category: 'Required' },
    },
    onChange: {
      control: false,
      table: {
        type: { summary: '(value: string) => void' },
        category: 'Required',
      },
    },
    onClear: {
      control: false,
      table: { type: { summary: '() => void' }, category: 'Required' },
    },

    placeholder: STRING_CONTROL,
    clearTooltip: REACT_NODE_AS_STRING,
    textLookupKey: STRING_CONTROL,
    filterLookupKey: STRING_CONTROL,

    closeOnClickOutside: BOOLEAN_CONTROL,
    alwaysExpanded: BOOLEAN_CONTROL,
    alwaysHighlight: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    disableInput: BOOLEAN_CONTROL,
    focusTrigger: BOOLEAN_CONTROL,
    toggleTrigger: BOOLEAN_CONTROL,
    moveCursorToEnd: BOOLEAN_CONTROL,

    filterLabel: {
      control: 'object',
      table: {
        type: {
          summary: '{ icon?: ReactNode; [key: string]: any } | null',
        },
      },
    },
    inputProps: {
      control: false,
      table: { type: { summary: 'Partial<InputProps>' } },
    },
    searchTooltipProps: {
      control: false,
      table: { type: { summary: 'Partial<TooltipProps>' } },
    },

    onButtonClick: {
      control: false,
      table: { type: { summary: '() => void' } },
    },
    onClick: {
      control: false,
      table: { type: { summary: '() => void' } },
    },
    onKeyDown: {
      control: false,
      table: {
        type: { summary: '(e: KeyboardEvent<HTMLInputElement>) => void' },
      },
    },
    onToggle: {
      control: false,
      table: { type: { summary: '(isOpen: boolean) => void' } },
    },
  },
  args: {},
} as Meta<SearchInputProps>;

export const Default: Story = {
  args: {
    closeOnClickOutside: true,
  },
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('');

<SearchInput
  closeOnClickOutside
  clearTooltip="Clear"
  placeholder="Search"
  searchTooltipProps={{ title: 'Title', description: 'Description', type: 'default' }}
  value={value}
  onChange={setValue}
  onClear={() => setValue('')}
/>`,
      },
    },
  },
};
export const Expanded: Story = {
  args: {
    alwaysExpanded: true,
  },
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('');

<SearchInput
  alwaysExpanded
  clearTooltip="Clear"
  placeholder="Search"
  searchTooltipProps={{ title: 'Title', description: 'Description', type: 'default' }}
  value={value}
  onChange={setValue}
  onClear={() => setValue('')}
/>`,
      },
    },
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
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('');
const [debouncedValue, setDebouncedValue] = useState('');
const debouncedSetter = debounce(setDebouncedValue, 500);

<SearchInput
  alwaysExpanded
  clearTooltip="Clear"
  placeholder="Search"
  value={value}
  onChange={(next) => {
    setValue(next);
    debouncedSetter(next);
  }}
  onClear={() => {
    setValue('');
    debouncedSetter('');
  }}
/>`,
      },
    },
  },
};
