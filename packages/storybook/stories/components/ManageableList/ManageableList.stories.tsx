import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';
import type { StoryObj, Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import ManageableList, { ManageableListProps } from '@synerise/ds-manageable-list';
import Icon, { ArrowDownCircleM, ArrowUpCircleM, Settings2S } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import Button from '@synerise/ds-button';

import {
  BOOLEAN_CONTROL,
  centeredPaddedWrapper,
  CLASSNAME_ARG_CONTROL,
  controlFromOptionsArray,
  fixedWrapper588,
  NUMBER_CONTROL,
  STRING_CONTROL,
  STYLE_ARG_CONTROL,
} from '../../utils';
import {
  ContentItemType,
  CONTENT_ITEMS,
  EMPTY_ITEM,
  FilterItemType,
  FILTER_ITEMS,
  ITEMS,
  ItemType,
  TEXTS,
} from './ManageableList.data';

export default {
  title: 'Components/ManageableList',
  tags: ['autodocs'],
  component: ManageableList,
  decorators: [fixedWrapper588, centeredPaddedWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
    addButtonDisabled: BOOLEAN_CONTROL,
    changeOrderDisabled: BOOLEAN_CONTROL,
    changeOrderByButtons: BOOLEAN_CONTROL,
    expanderDisabled: BOOLEAN_CONTROL,
    greyBackground: BOOLEAN_CONTROL,
    maxToShowItems: NUMBER_CONTROL,
    visibleItemsLimit: NUMBER_CONTROL,
    placeholder: STRING_CONTROL,
    searchQuery: STRING_CONTROL,
    selectedItemId: STRING_CONTROL,
    type: controlFromOptionsArray('inline-radio', ['default', 'filter', 'content']),
  },
  render: args => {
    const [items, setItems] = useState(args.items);
    const [selectedId, setSelectedId] = useState<string | undefined>(args.selectedItemId);
    const handleItemAdd = (params: { name: string } | undefined) => {
      args.onItemAdd?.(params);
      params && setItems([...items, { ...EMPTY_ITEM(), name: params.name }]);
    };
    const handleItemSelect = (params: { id: string | number }) => {
      const { id } = params;
      args.onItemSelect?.(params);
      setSelectedId(id as string);
    };
    return (
      <ManageableList
        {...args}
        items={items}
        onItemAdd={handleItemAdd}
        onItemSelect={handleItemSelect}
        selectedItemId={selectedId}
      />
    );
  },
  args: {
    texts: TEXTS,
    visibleItemsLimit: 5,
    items: ITEMS,
    onChangeOrder: undefined,
    additionalActions: [
      {
        color: theme.palette['blue-600'],
        tooltip: 'Additional action',
        icon: <Settings2S />,
        onClick: action('additional action'),
      },
    ],
    placeholder: 'Folder name',
  },
} as Meta<ManageableListProps<ItemType>>;

type Story = StoryObj<ManageableListProps<ItemType>>;

export const Default: Story = {};

export const EmptyList: Story = {
  args: {
    items: [],
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const WithCustomToggleButton: Story = {
  args: {
    renderCustomToggleButton: ({ onClick, allItemsVisible, total, limit }) => {
      const icon = allItemsVisible ? <ArrowUpCircleM /> : <ArrowDownCircleM />;
      const label = allItemsVisible ? `Show ${total - limit} less` : `Show ${total - limit} more`;
      return (
        <Button onClick={onClick} type="ghost" mode="icon-label">
          <Icon component={icon} />
          {label}
        </Button>
      );
    },
  },
};

export const ContentItemsList: StoryObj<ManageableListProps<ContentItemType>> = {
  args: {
    visibleItemsLimit: CONTENT_ITEMS.length,
    items: CONTENT_ITEMS,
    type: 'content',
  },
};

export const ContentItemsListSortable: StoryObj<ManageableListProps<ContentItemType>> = {
  args: {
    ...ContentItemsList.args,
    onChangeOrder: fn(),
  },
};

export const FilterItemsList: StoryObj<ManageableListProps<FilterItemType>> = {
  args: {
    items: FILTER_ITEMS,
    type: 'filter',
    selectedItemId: FILTER_ITEMS[0].id,
  },
};
