import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Search, { SearchProps } from '@synerise/ds-search';
import Icon from '@synerise/ds-icon';
import ListItem from '@synerise/ds-list-item';
import Divider from '@synerise/ds-divider';
import { theme } from '@synerise/ds-core';

import { fixedWrapper300 } from '../../utils';
import {
  getItemsWithAvatar,
  getSuggestions,
  ItemType,
  parameters,
  PARAMETERS_COUNT,
  PARAMETERS_TITLE,
  PARAMETERS_TOOLTIP,
  ParameterType,
  recent,
  RECENT_COUNT,
  RECENT_TITLE,
  RECENT_TOOLTIP,
  SUGGESTIONS_TITLE,
  SUGGESTIONS_TOOLTIP,
} from './Search.data';

type StorySearchProps = SearchProps<ItemType, ParameterType>;
type Story = StoryObj<StorySearchProps>;

export default {
  component: Search,
  title: 'Components/Search/Search',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  render: args => {
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
          itemRender: item => (
            <ListItem
              highlight={value}
              prefixel={item && <Icon component={item && item.icon} color={theme.palette['grey-600']} />}
            >
              {item && item.text}
            </ListItem>
          ),
        }}
        recentDisplayProps={{
          ...args.recentDisplayProps,
          itemRender: item => <ListItem {...item}>{item && item.text}</ListItem>,
        }}
        suggestionsDisplayProps={{
          rowHeight: 32,
          title: SUGGESTIONS_TITLE,
          ...args.suggestionsDisplayProps,
          itemRender: item => <ListItem>{item && item.text}</ListItem>,
        }}
        suggestions={suggestions}
        onClear={handleClear}
        onParameterValueChange={handleParameterChange}
        onValueChange={handleSearchChange}
      />
    );
  },
  argTypes: {},
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
      <div style={{ padding: '12px', paddingBottom: '0px', paddingRight: '20px' }}>
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

export const WithDropdown: Story = {};

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
};