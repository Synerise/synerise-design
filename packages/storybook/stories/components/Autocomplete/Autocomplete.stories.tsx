import React, { useState } from 'react';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import { within, userEvent, fn } from '@storybook/test';
import Autocomplete from '@synerise/ds-autocomplete';
import type { AutocompleteProps } from '@synerise/ds-autocomplete';

import Loader from '@synerise/ds-loader';
import { LoaderWrapper } from '@synerise/ds-autocomplete/dist/Autocomplete.styles';


import { fixedWrapper400 } from '../../utils';
import { renderWithHighlightedText } from './utils';

const excludedProps = ['animation'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
const meta: Meta<AutocompleteProps> = {
  title: "Components/InputElements/Autocomplete",
  component: Autocomplete,
  decorators: [fixedWrapper400],
  parameters: {
    controls: {
      exclude: excludeRegexp
    }
  },
  tags: ['autodocs'],
  argTypes: {
    allowClear: {
      control: 'boolean'
    },
    autoClearSearchValue: {
      control: 'boolean'
    },
    autoResize: {
      control: 'select',
      options: ['false', 'min & max width', 'stretch to fit'],
      mapping: {
        'false': false,
        'min & max width': { minWidth: '150px', maxWidth: '300px' },
        'stretch to fit': { minWidth: '150px', stretchToFit: true }
      }
    }
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
    onMouseEnter: fn(),
    onMouseDown: fn(),
    onKeyDown: fn(),
    onKeyUp: fn(),
    onDropdownVisibleChange: fn(),
    onFocus: fn(),
  }
};

export default meta;


const dataSource = ['First position', 'Second position'];
const AutocompleteWithState = (props: AutocompleteProps) => {
  const [value, setValue] = useState(props.value);
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    let result: Array<string>;
    if (!value || value.indexOf('@') >= 0) {
      result = [];
    } else {
      result = dataSource.filter(item => item.toLowerCase().includes(value.toLowerCase()));
    }
    setResults(result);
  };

  return (
    <Autocomplete
      {...props}
      value={value}
      onSearch={handleSearch}
      onChange={setValue}
    >
      {results.map(result => (
        <Autocomplete.Option value={result} key={result}>
          <span style={{ fontWeight: 400 }}>{renderWithHighlightedText(value, result)}</span>
        </Autocomplete.Option>
      ))}
    </Autocomplete>
  )
}

const StoryTemplate: StoryObj<AutocompleteProps> = {
  render: (args) => <AutocompleteWithState {...args} />
};




export const Primary = {
  ...StoryTemplate,
};


export const Suggestions = {
  ...StoryTemplate,

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('combobox'));
    await userEvent.type(canvas.getByRole('combobox'), 'pos');
  }
};


export const Loading = {

  render: (args) => (<Autocomplete {...args}>
    <Autocomplete.Option value="">
      <LoaderWrapper>
        <Loader label="Loading..." />
      </LoaderWrapper>{' '}
    </Autocomplete.Option>
  </Autocomplete>),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('combobox'));
  }
}