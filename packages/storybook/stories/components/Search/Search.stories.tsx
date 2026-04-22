import React, { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { theme } from '@synerise/ds-core';
import Divider from '@synerise/ds-divider';
import Icon from '@synerise/ds-icon';
import ListItem from '@synerise/ds-list-item';
import Search, { SearchProps } from '@synerise/ds-search';

import {
  BOOLEAN_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_NO_CONTROL,
  STRING_CONTROL,
  STYLE_ARG_CONTROL,
} from '../../utils';
import {
  ItemType,
  PARAMETERS_COUNT,
  PARAMETERS_TITLE,
  PARAMETERS_TOOLTIP,
  ParameterType,
  RECENT_COUNT,
  RECENT_TITLE,
  RECENT_TOOLTIP,
  SUGGESTIONS_TITLE,
  SUGGESTIONS_TOOLTIP,
  SearchDecorator,
  getItemsWithAvatar,
  getSuggestions,
  parameters,
  recent,
} from './Search.data';

type StorySearchProps = SearchProps<ItemType, ParameterType, ItemType>;
type Story = StoryObj<StorySearchProps>;

export default {
  component: Search,
  title: 'Components/Search/Search',
  tags: ['autodocs'],
  decorators: [SearchDecorator],
  render: (args) => {
    const [value, setValue] = useState('');
    const [parameterValue, setParameterValue] = useState('');
    const [suggestions, setSuggestions] = useState<any[] | null>(null);

    const handleClear = () => {
      setParameterValue('');
      setValue('');
    };
    const handleSearchChange = (newValue: string) => {
      setValue(newValue);
    };
    const handleParameterChange = (value, parameter) => {
      setParameterValue(value);
      const fakeApiResponse = getSuggestions(value);
      setSuggestions(fakeApiResponse);
    };
    return (
      <Search
        {...args}
        value={value}
        parameterValue={parameterValue}
        parametersDisplayProps={{
          ...args.parametersDisplayProps,
          itemRender: (item) => (
            <ListItem
              highlight={value}
              prefixel={
                item && (
                  <Icon
                    component={item && item.icon}
                    color={theme.palette['grey-600']}
                  />
                )
              }
            >
              {item && item.text}
            </ListItem>
          ),
        }}
        recentDisplayProps={{
          ...args.recentDisplayProps,
          itemRender: (item) => (
            <ListItem {...item}>{item && item.text}</ListItem>
          ),
        }}
        suggestionsDisplayProps={{
          rowHeight: 32,
          title: SUGGESTIONS_TITLE,
          ...args.suggestionsDisplayProps,
          itemRender: (item) => <ListItem>{item && item.text}</ListItem>,
        }}
        suggestions={suggestions}
        onClear={handleClear}
        onParameterValueChange={handleParameterChange}
        onValueChange={handleSearchChange}
      />
    );
  },
  argTypes: {
    value: {
      control: false,
      table: { type: { summary: 'string' }, category: 'Required' },
    },
    parameterValue: {
      control: false,
      table: { type: { summary: 'string' }, category: 'Required' },
    },
    clearTooltip: STRING_CONTROL,
    placeholder: STRING_CONTROL,
    filterLookupKey: STRING_CONTROL,

    searchWidth: NUMBER_CONTROL,
    dropdownWidth: NUMBER_CONTROL,
    dropdownMaxHeight: NUMBER_CONTROL,
    width: {
      ...NUMBER_CONTROL,
      table: {
        type: { summary: 'number', detail: 'Deprecated — use searchWidth' },
      },
    },

    alwaysExpanded: BOOLEAN_CONTROL,
    hideLabel: BOOLEAN_CONTROL,
    disableInput: BOOLEAN_CONTROL,

    recent: { control: 'object', table: { type: { summary: 'T[]' } } },
    parameters: { control: 'object', table: { type: { summary: 'U[]' } } },
    suggestions: {
      control: 'object',
      table: { type: { summary: 'S[] | null' } },
    },
    textLookupConfig: {
      control: 'object',
      table: { type: { summary: 'SearchLookupConfig<T, U, S>' } },
    },

    recentDisplayProps: {
      control: 'object',
      table: { type: { summary: 'DataSetProps' } },
    },
    parametersDisplayProps: {
      control: 'object',
      table: { type: { summary: 'DataSetProps' } },
    },
    suggestionsDisplayProps: {
      control: 'object',
      table: { type: { summary: 'DataSetProps | null' } },
    },

    divider: REACT_NODE_NO_CONTROL,
    inputProps: {
      control: false,
      table: { type: { summary: 'Partial<InputProps>' } },
    },
    searchTooltipProps: {
      control: false,
      table: { type: { summary: 'TooltipProps' } },
    },
    style: STYLE_ARG_CONTROL,

    onValueChange: {
      control: false,
      table: { type: { summary: '(value: string) => void' } },
    },
    onParameterValueChange: {
      control: false,
      table: {
        type: { summary: '(value: string, parameter: U | null) => void' },
      },
    },
    onClear: {
      control: false,
      table: { type: { summary: '() => void' } },
    },
  },
  args: {
    clearTooltip: 'Clear',
    searchTooltipProps: {
      title: 'Title',
      description: 'Description',
      type: 'default',
    },
    parametersDisplayProps: {
      tooltip: PARAMETERS_TOOLTIP,
      title: PARAMETERS_TITLE,
      rowHeight: 32,
      itemRender: () => <></>,
    },
    recentDisplayProps: {
      tooltip: RECENT_TOOLTIP,
      title: RECENT_TITLE,
      rowHeight: 32,
      itemRender: () => <></>,
    },
    suggestionsDisplayProps: {
      tooltip: SUGGESTIONS_TOOLTIP,
      title: SUGGESTIONS_TITLE,
      rowHeight: 32,
      itemRender: () => <></>,
    },
    divider: (
      <div
        style={{ padding: '12px', paddingBottom: '0px', paddingRight: '20px' }}
      >
        <Divider dashed />
      </div>
    ),

    dropdownMaxHeight: 400,
    filterLookupKey: 'filter',
    parameters: parameters.slice(0, PARAMETERS_COUNT),

    placeholder: 'Search',
    recent: recent.slice(0, RECENT_COUNT),

    textLookupConfig: {
      parameters: 'text',
      recent: 'text',
      suggestions: 'text',
    },
  },
} as Meta<StorySearchProps>;

export const WithDropdown: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('');
const [parameterValue, setParameterValue] = useState('');
const [suggestions, setSuggestions] = useState(null);

<Search
  clearTooltip="Clear"
  placeholder="Search"
  dropdownMaxHeight={400}
  filterLookupKey="filter"
  searchTooltipProps={{ title: 'Title', description: 'Description', type: 'default' }}
  value={value}
  parameterValue={parameterValue}
  recent={recent}
  parameters={parameters}
  suggestions={suggestions}
  textLookupConfig={{ parameters: 'text', recent: 'text', suggestions: 'text' }}
  recentDisplayProps={{
    title: 'Recent',
    tooltip: 'Recent tooltip',
    rowHeight: 32,
    itemRender: (item) => <ListItem>{item.text}</ListItem>,
  }}
  parametersDisplayProps={{
    title: 'Search in',
    tooltip: 'Search in tooltip',
    rowHeight: 32,
    itemRender: (item) => (
      <ListItem
        highlight={value}
        prefixel={<Icon component={item.icon} color={theme.palette['grey-600']} />}
      >
        {item.text}
      </ListItem>
    ),
  }}
  suggestionsDisplayProps={{
    title: 'Suggestions',
    rowHeight: 32,
    itemRender: (item) => <ListItem>{item.text}</ListItem>,
  }}
  divider={<div style={{ padding: '12px' }}><Divider dashed /></div>}
  onValueChange={setValue}
  onParameterValueChange={(value) => {
    setParameterValue(value);
    setSuggestions(getSuggestions(value));
  }}
  onClear={() => { setValue(''); setParameterValue(''); }}
/>`,
      },
    },
  },
};

export const WithItemsWithAvatars: Story = {
  args: {
    recent: getItemsWithAvatar(10),

    recentDisplayProps: {
      tooltip: RECENT_TOOLTIP,
      title: RECENT_TITLE,
      rowHeight: 50,
      itemRender: () => <></>,
    },
  },
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('');
const [parameterValue, setParameterValue] = useState('');
const [suggestions, setSuggestions] = useState(null);

<Search
  clearTooltip="Clear"
  placeholder="Search"
  dropdownMaxHeight={400}
  filterLookupKey="filter"
  value={value}
  parameterValue={parameterValue}
  recent={getItemsWithAvatar(10)}
  parameters={parameters}
  suggestions={suggestions}
  textLookupConfig={{ parameters: 'text', recent: 'text', suggestions: 'text' }}
  recentDisplayProps={{
    title: 'Recent',
    tooltip: 'Recent tooltip',
    rowHeight: 50,
    itemRender: (item) => <ListItem {...item}>{item.text}</ListItem>,
  }}
  parametersDisplayProps={{
    title: 'Search in',
    tooltip: 'Search in tooltip',
    rowHeight: 32,
    itemRender: (item) => (
      <ListItem prefixel={<Icon component={item.icon} />}>{item.text}</ListItem>
    ),
  }}
  suggestionsDisplayProps={{
    title: 'Suggestions',
    rowHeight: 32,
    itemRender: (item) => <ListItem>{item.text}</ListItem>,
  }}
  divider={<div style={{ padding: '12px' }}><Divider dashed /></div>}
  onValueChange={setValue}
  onParameterValueChange={(value) => {
    setParameterValue(value);
    setSuggestions(getSuggestions(value));
  }}
  onClear={() => { setValue(''); setParameterValue(''); }}
/>`,
      },
    },
  },
};
