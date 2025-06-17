import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { OrderedListSkeleton } from '@synerise/ds-skeleton';
import OrderedList, { OrderedListProps } from '@synerise/ds-ordered-list';
import { controlFromOptionsArray, fixedWrapper300 } from '../../utils';
import { FORMATTERS, LIST_ITEMS, LIST_ITEMS_SINGLE_LEVEL } from './OrderedList.data';

export default {
  component: OrderedList,
  title: 'Components/OrderedAndUnorderedList/OrderedList',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  argTypes: {
    data: {
      control: false,
    },
    indexFormatter: {
      ...controlFromOptionsArray('inline-radio', Object.keys(FORMATTERS)),
      mapping: FORMATTERS,
    },
  },
  args: {
    text: 'List Header',
    indexFormatter: FORMATTERS.decimal,
    data: LIST_ITEMS_SINGLE_LEVEL,
  },
} as Meta<OrderedListProps>;

type Story = StoryObj<OrderedListProps>;

export const Default: Story = {};

export const MultiLevelList: Story = {
  args: {
    data: LIST_ITEMS,
  },
};

export const Skeleton: Story = {
  args: {
    indexFormatter: FORMATTERS.empty,
    data: [
      {
        id: '0',
        index: 0,
        label: <OrderedListSkeleton size="M" />,
      },
    ],
  },
};
